/**
 * XYRON CORE ENGINE - VERSION 1.0 (FINAL)
 * Architect: M. Fauzi Nizam
 * Origin: Blitar, East Java, Indonesia
 * Goal: Decentralized Mobile-Optimized Blockchain
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
 * Endpoint untuk melihat status rantai blok secara real-time
 */
app.get('/api/chain', (req, res) => {
    res.json(xyron.chain);
});

/**
 * [PILAR 2 & 3: ADAPTIVE BURN & X11-NANO GUARD]
 * Proses transaksi desentralisasi dengan validasi arsitek
 */
app.get('/api/transaction', (req, res) => {
    const amount = parseFloat(req.query.amount) || 0;
    
    // Validasi Keamanan X11-Nano (Hanya transaksi sah yang lolos)
    const rawTx = {
        amount: amount,
        architect: CONFIG.ARCHITECT,
        location: CONFIG.ORIGIN,
        timestamp: new Date().toISOString()
    };

    if (!Security.validateTransaction(rawTx)) {
        return res.status(403).json({ 
            error: "Security Breach: Unauthorized Transaction Attempt Rejected." 
        });
    }

    // Logika Adaptive Burn (Mengatur inflasi koin secara cerdas)
    const burnRate = Math.random() > 0.9 ? CONFIG.BURN_RATE_SHOCK : CONFIG.BURN_RATE_DEFAULT;
    const burned = amount * burnRate;
    
    const finalData = {
        ...rawTx,
        burned: burned.toFixed(8),
        net: (amount - burned).toFixed(8),
        security_hash: Security.nanoEncrypt(amount.toString())
    };

    // Eksekusi: Masukkan ke Blockchain Lokal
    xyron.addBlock(finalData);
    
    // [PILAR 4: DESENTRALISASI P2P]
    // Menyiarkan data ke seluruh node lain di jaringan global
    p2pServer.syncChains(); 
    
    // Simpan ke Ledger Fisik (ledger.json)
    try {
        fs.writeFileSync('./ledger.json', JSON.stringify(xyron.chain, null, 2));
    } catch (err) {
        console.error("Gagal menyimpan ke ROM:", err);
    }

    res.json({
        status: "BROADCASTED",
        message: "XYRON Transaction Securely Propagated to Network",
        details: finalData
    });
});

/**
 * KONFIGURASI PORT JARINGAN
 * Mendukung port dinamis untuk menjalankan banyak node (Desentralisasi)
 */
const HTTP_PORT = process.env.PORT || 3000;
const P2P_PORT = process.env.P2P_PORT || 5000;

// Jalankan HTTP Server (Untuk User Interface)
app.listen(HTTP_PORT, () => {
    console.log(`==========================================`);
    console.log(`XYRON NETWORK IS LIVE!`);
    console.log(`Architect : ${CONFIG.ARCHITECT}`);
    console.log(`Origin    : ${CONFIG.ORIGIN}`);
    console.log(`HTTP Port : ${HTTP_PORT}`);
    console.log(`==========================================`);
});

// Jalankan P2P Server (Untuk Komunikasi antar Komputer/HP)
p2pServer.listen(P2P_PORT);
