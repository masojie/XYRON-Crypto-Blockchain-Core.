const express = require('express');
const XyronChain = require('./blockchain'); // Memanggil pilar blockchain buatan sendiri
const app = express();
const xyron = new XyronChain();

app.use(express.static('public'));

// Endpoint untuk melihat seluruh rantai blok XYRON
app.get('/api/chain', (req, res) => {
    res.json(xyron.chain);
});

// Implementasi Nexus-Parallel & Adaptive Burn
app.get('/api/transaction', (req, res) => {
    const amount = parseFloat(req.query.amount) || 100;
    const burnRate = Math.random() > 0.9 ? 0.00771 : 0.002137;
    const burned = amount * burnRate;
    
    const txData = {
        amount: amount,
        burned: burned.toFixed(8),
        net: (amount - burned).toFixed(8),
        architect: "M. Fauzi Nizam"
    };

    // MASUKKAN KE BLOCKCHAIN SENDIRI
    xyron.addBlock(txData);

    res.json({
        message: "Transaction Securely Added to XYRON Ledger",
        tx: txData
    });
});

app.listen(3000, () => console.log("XYRON INDEPENDENT NETWORK: ONLINE"));
