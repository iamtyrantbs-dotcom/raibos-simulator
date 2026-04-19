const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const RANKINGS_FILE = path.join(__dirname, 'rankings.json');

app.use(cors());
app.use(express.json());

// Serve static files from the 'public' folder
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
    const { username, stats } = req.body;
    if (!username || !stats) return res.status(400).json({ error: 'Missing data' });

    const data = getRankings();
    Object.keys(stats).forEach(category => {
        const { value, extra } = stats[category];
        if (!data[category]) data[category] = [];
        let list = data[category];
        let index = list.findIndex(p => p.username === username);
        if (index !== -1) {
            if (value > list[index].value) {
                list[index].value = value;
                if (extra !== undefined) list[index].extra = extra;
            }
        } else {
            let entry = { username, value };
            if (extra !== undefined) entry.extra = extra;
            list.push(entry);
        }
        list.sort((a, b) => b.value - a.value);
        data[category] = list.slice(0, 100);
    });

    saveRankings(data);
    res.json({ success: true });
});

app.get('/api/rank/leaderboard', (req, res) => {
    res.json(getRankings());
});

// For any other route, serve the index.html (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is live at http://localhost:${PORT}`);
});
