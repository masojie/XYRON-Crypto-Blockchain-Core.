const express = require('express');
const XyronChain = require('./blockchain');
const Security = require('./security'); // Memanggil pilar keamanan
const fs = require('fs');
const app = express();
const xyron = new XyronChain();

app.use(express.static('public'));

// Endpoint melihat Blockchain
app.get('/api/chain', (req, res) => {
    res.json(xyron.chain);
});

// Transaksi dengan pengecekan Security & Adaptive Burn
app.get('/api/transaction', (req, res) => {
    const amount = parseFloat(req.query.amount) || 0;
    
    const rawTx = {
        amount: amount,
        architect: "M. Fauzi Nizam",
        timestamp: new Date().toISOString()
    };

    // CEK KEAMANAN
    if (!Security.validateTransaction(rawTx)) {
        return res.status(403).json({ error: "Invalid Transaction Security" });
    }

    // HITUNG ADAPTIVE BURN
    const burnRate = Math.random() > 0.9 ? 0.00771 : 0.002137;
    const burned = amount * burnRate;
    
    const finalData = {
        ...rawTx,
        burned: burned.toFixed(8),
        net: (amount - burned).toFixed(8),
        sec_hash: Security.nanoEncrypt(amount.toString())
    };

    xyron.addBlock(finalData);
    
    // SIMPAN KE LEDGER.JSON (Simulasi Database)
    fs.writeFileSync('./ledger.json', JSON.stringify(xyron.chain, null, 2));

    res.json({
        message: "Secure Transaction Recorded",
        tx: finalData
    });
});

app.listen(3000, () => console.log("XYRON SECURE NETWORK: ONLINE"));
