const express = require('express');
const XyronChain = require('./blockchain');
const P2PServer = require('./p2p'); // Panggil pilar P2P
const CONFIG = require('./config');
const app = express();

const xyron = new XyronChain();
const p2pServer = new P2PServer(xyron);

app.use(express.static('public'));

// Setiap kali ada transaksi, broadcast ke node lain
app.get('/api/transaction', (req, res) => {
    // ... logika transaksi kamu yang lama (Adaptive Burn, dll)
    
    // TAMBAHAN: Kirim ke seluruh jaringan
    p2pServer.syncChains(); 
    
    res.json({ status: "Broadcasted to XYRON Network" });
});

// Menjalankan HTTP Server & P2P Server secara bersamaan
const HTTP_PORT = process.env.PORT || 3000;
const P2P_PORT = process.env.P2P_PORT || 5000;

app.listen(HTTP_PORT, () => console.log(`HTTP Server: ${HTTP_PORT}`));
p2pServer.listen(P2P_PORT);
