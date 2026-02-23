const axios = require('axios');

async function runBot() {
    console.log("🤖 XYRON AUTO-BOT STARTED...");
    
    // Simulasi 10 Transaksi Normal tiap 2 detik
    for (let i = 1; i <= 10; i++) {
        try {
            const val = Math.floor(Math.random() * 200) + 5;
            const res = await axios.get(`http://localhost:3000/api/transaction?amount=${val}`);
            console.log(`[BOT] Tx #${i} Sukses: ${val} XYR | Mode: ${res.data.details.data.mode}`);
        } catch (e) {
            console.log("[BOT] Gagal terhubung ke server.");
        }
        await new Promise(r => setTimeout(r, 2000));
    }
    
    console.log("\n⚠️ TEST SERANGAN DATA KORUP...");
    try {
        await axios.get(`http://localhost:3000/api/transaction?amount=-500`);
    } catch (e) {
        console.log("[SHIELD] Berhasil Menepis Serangan Data Negatif!");
    }
}

runBot();

