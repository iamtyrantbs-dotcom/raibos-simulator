const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const RANKINGS_FILE = path.join(__dirname, 'rankings.json');
const SECRET_KEY = "rAiBoS_sEcReT_kEy_2026_!@#";

// Rate Limiting Map (IP -> { lastTime: timestamp, count: number })
const rateLimitMap = new Map();

app.use(cors()); // Allow all origins for now, but API is protected by HMAC
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize rankings file if it doesn't exist
if (!fs.existsSync(RANKINGS_FILE)) {
    fs.writeFileSync(RANKINGS_FILE, JSON.stringify({}));
}

function getRankings() {
    try {
        const data = fs.readFileSync(RANKINGS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return {};
    }
}

function saveRankings(data) {
    fs.writeFileSync(RANKINGS_FILE, JSON.stringify(data, null, 2));
}

// API Routes
app.post('/api/rank/update', (req, res) => {
    try {
        if (!req || !req.body) {
            return res.status(400).json({ error: 'Empty request' });
        }

        const { payload, signature, timestamp } = req.body;
        
        if (typeof payload !== 'string' || typeof signature !== 'string' || typeof timestamp !== 'number') {
            return res.status(400).json({ error: 'Invalid request format' });
        }

        // 1. Timestamp Check (Replay Attack Prevention)
        const now = Date.now();
        if (Math.abs(now - timestamp) > 60000) { // 60 seconds
            return res.status(400).json({ error: 'Request expired' });
        }

    // 2. Rate Limiting Check
    const ip = req.ip || req.connection.remoteAddress;
    const rateData = rateLimitMap.get(ip) || { lastTime: 0, count: 0 };
    if (now - rateData.lastTime < 10000) { // 10 seconds interval
        if (rateData.count > 2) {
            return res.status(429).json({ error: 'Too many requests' });
        }
        rateData.count++;
    } else {
        rateData.count = 1;
        rateData.lastTime = now;
    }
    rateLimitMap.set(ip, rateData);

    // 3. Signature Verification (HMAC SHA-256)
    const dataToSign = timestamp + payload;
    const expectedSignature = crypto.createHmac('sha256', SECRET_KEY).update(dataToSign).digest('hex');
    if (signature !== expectedSignature) {
        return res.status(401).json({ error: 'Invalid signature' });
    }

    // 4. Payload Decryption (Base64 + XOR with Buffer)
    let decryptedData;
    try {
        const payloadBuf = Buffer.from(payload, 'base64');
        const keyBuf = Buffer.from(SECRET_KEY, 'utf8');
        for(let i = 0; i < payloadBuf.length; i++) {
            payloadBuf[i] ^= keyBuf[i % keyBuf.length];
        }
        const decryptedJsonStr = payloadBuf.toString('utf8');
        decryptedData = JSON.parse(decryptedJsonStr);
    } catch (e) {
        return res.status(400).json({ error: 'Malformed payload' });
    }

    const { username, stats } = decryptedData;
    if (!username || !stats || typeof username !== 'string' || username.length > 20) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    // 5. Honeypot Check
    if (stats['raibos_admin_tokens'] !== undefined && stats['raibos_admin_tokens'].value > 0) {
        console.warn(`[ANTI-CHEAT] User ${username} triggered honeypot from IP ${ip}. Blocking.`);
        // Shadow ban: return success but don't save
        return res.json({ success: true, note: 'shadow-banned' });
    }

    const data = getRankings();
    let isUpdated = false;

    Object.keys(stats).forEach(category => {
        if (category === 'raibos_admin_tokens') return; // Ignore honeypot here

        const { value, extra } = stats[category];
        
        // 6. Value Validation
        if (typeof value !== 'number' || isNaN(value) || value < 0 || value > 1e300) {
            return; // Ignore invalid values
        }

        if (!data[category]) data[category] = [];
        let list = data[category];
        let index = list.findIndex(p => p.username === username);
        
        if (index !== -1) {
            if (value > list[index].value) {
                list[index].value = value;
                if (extra !== undefined) list[index].extra = extra;
                isUpdated = true;
            }
        } else {
            let entry = { username, value };
            if (extra !== undefined) entry.extra = extra;
            list.push(entry);
            isUpdated = true;
        }
        
        list.sort((a, b) => b.value - a.value);
        data[category] = list.slice(0, 100);
    });

        if (isUpdated) {
            saveRankings(data);
        }
        
        res.json({ success: true });
    } catch (err) {
        console.error("Crash prevented in /api/rank/update:", err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/rank/leaderboard', (req, res) => {
    try {
        res.json(getRankings());
    } catch (err) {
        console.error("Crash prevented in /api/rank/leaderboard:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// For any other route, serve the index.html (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is live at http://localhost:${PORT}`);
});
