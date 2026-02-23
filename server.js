/**
 * XYRON CORE ENGINE - VERSION 1.1 (FINAL SYNC)
 * Architect: M. Fauzi Nizam
 * Origin: Blitar, East Java, Indonesia
 * Goal: Decentralized Mobile-Optimized Blockchain with Adaptive X11-Nano
 */

const express = require('express');
const fs = require('fs');
const XyronChain = require('./blockchain');
const P2PServer = require('./p2p');
const Security = require('./security');
const CONFIG = require('./config');

const app = express();
const xyron = new XyronChain();
const p2pServer = new P2PServer(xyron);

// Menyediakan folder public untuk antarmuka Wallet/Explorer
app.use(express.static('public'));

/**
 * [PILAR 1: NEXUS-PARALLEL API]
 * Endpoint untuk melihat status rantai blok secara real-time di Explorer
 */
app.get('/api/chain', (req, res) => {
    res.json(xyron.chain);
});

/**
 * [PILAR 2 & 3: ADAPTIVE BURN & X11-NANO GUARD]
 * Proses transaksi desentralisasi dengan sistem deteksi "Bocor" otomatis
 */
app.get('/api/transaction', (req, res) => {
    const amount = parseFloat(req.query.amount) || 0;
    
    // --- SINKRONISASI SECURITY ADAPTIVE ---
    // Memanggil validasi cerdas yang mendeteksi indikasi bocor/manipulasi
    const validation = Security.validateTransaction({ amount });

    if (!validation.isValid) {
        console.log(`⚠️ SECURITY ALERT: Blocking Unauthorized Attempt!`);
        return res.status(403).json({ 
            error: "Security Breach: Unauthorized Transaction Attempt Rejected." 
        });
    }

    // Menentukan Mode Enkripsi (Kombinasi vs Beruntun) secara otomatis
    const currentMode = validation.isSuspicious ? "SECURE_CHAIN (11-LAYER)" : "EFFICIENT_HYBRID";

    const rawTx = {
        amount: amount,
        architect: CONFIG.ARCHITECT,
        location: CONFIG.ORIGIN,
        timestamp: new Date().toLocaleString(),
        mode: currentMode // Ditampilkan di Explorer
    };

    // Logika Adaptive Burn (Mengatur inflasi koin secara cerdas)
    const burnRate = Math.random() > 0.9 ? CONFIG.BURN_RATE_SHOCK : CONFIG.BURN_RATE_DEFAULT;
    const burned = amount * burnRate;
    
    const finalData = {
        ...rawTx,
        burned: burned.toFixed(8),
        net: (amount - burned).toFixed(8),
        // Menjalankan enkripsi X11-Nano sesuai mode yang terdeteksi
        security_hash: Security.x11SmartHash(amount.toString(), validation.isSuspicious)
    };

    // Eksekusi: Masukkan ke Blockchain Lokal
    xyron.addBlock(finalData);
    
    // [PILAR 4: DESENTRALISASI P2P]
    // Menyiarkan data ke seluruh node lain di jaringan
    p2pServer.syncChains(); 
    
    // Simpan ke Ledger Fisik (ledger.json) agar data permanen
    try {
        fs.writeFileSync('./ledger.json', JSON.stringify(xyron.chain, null, 2));
    } catch (err) {
        console.error("Gagal menyimpan ke ROM:", err);
    }

    res.json({
        status: "BROADCASTED",
        message: "XYRON Transaction Securely Propagated",
        details: finalData
    });
});

/**
 * KONFIGURASI PORT JARINGAN
 */
const HTTP_PORT = process.env.PORT || 3000;
const P2P_PORT = process.env.P2P_PORT || 5000;

app.listen(HTTP_PORT, () => {
    console.log(`==========================================`);
    console.log(`🚀 XYRON NETWORK IS LIVE!`);
    console.log(`Architect : ${CONFIG.ARCHITECT}`);
    console.log(`Origin    : ${CONFIG.ORIGIN}`);
    console.log(`HTTP Port : ${HTTP_PORT} (Explorer/API)`);
    console.log(`P2P Port  : ${P2P_PORT} (Node Sync)`);
    console.log(`==========================================`);
});

// Jalankan P2P Server untuk koneksi antar perangkat
p2pServer.listen(P2P_PORT);
