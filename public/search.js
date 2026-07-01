const fs = require('fs');
const files = ['data.js', 'main.js', 'index.html'];
files.forEach(f => {
  try {
    const lines = fs.readFileSync(f, 'utf8').split('\n');
    lines.forEach((l, i) => {
      if(l.includes('침략') || l.includes('에너지') || l.includes('구역') || l.includes('점령')) {
        console.log(`${f}:${i+1}:${l}`);
      }
    });
  } catch(e){}
});
