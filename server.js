const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// PILAR 1: GENESIS IDENTITY (IMMUTABLE)
const GENESIS = {
    block: 0,
    architect: "M. Fauzi Nizam",
    origin: "Blitar, Indonesia",
    message: "XYRON: THE ARCHITECT’S MANIFESTO. Evolusi logika mandiri dari Blitar untuk Dunia."
};

// SINKRONISASI FRONTEND
app.use(express.static(path.join(__dirname, 'public')));

// PILAR 2: ADAPTIVE BURN LOGIC (0.2137% - 0.771%)
app.get('/api/nexus/burn', (req, res) => {
    const amount = parseFloat(req.query.amount) || 100;
    const chance = Math.random();
    
    // Logika Shock Burn (0.771%) atau Default (0.2137%)
    const rate = chance > 0.9 ? 0.00771 : 0.002137;
    const burned = amount * rate;

    res.json({
        status: "Nexus-Parallel Processed",
        original_amount: amount,
        burn_rate: (rate * 100).toFixed(4) + "%",
        burned_value: burned.toFixed(8),
        final_amount: (amount - burned).toFixed(8),
        signature: "M.F.N-BLITAR"
    });
});

app.get('/api/genesis', (req, res) => res.json(GENESIS));

app.listen(PORT, () => {
    console.log(`XYRON CORE ENGINE ONLINE ON PORT ${PORT}`);
    console.log(`Architect: M. Fauzi Nizam`);
});
