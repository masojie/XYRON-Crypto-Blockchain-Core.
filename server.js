const express = require('express');
const app = express();

// ==========================================
// TEKNOLOGI 1: NEXUS-PARALLEL FLOW
// ==========================================
const TOTAL_SUPPLY = 1000000;
const LOCKED_SUPPLY = 113700; // 11.37% dikunci permanen
let currentSupply = TOTAL_SUPPLY - LOCKED_SUPPLY;

// ==========================================
// TEKNOLOGI 2: ADAPTIVE BURN ALGORITHM (INTI UTAMA)
// ==========================================
function executeAdaptiveBurn(amount) {
    const chance = Math.random();
    let rate;

    // Logika Shock Burn (0.771% - Sangat Jarang)
    if (chance > 0.97) {
        rate = 0.00771; 
    } 
    // Logika Angka Bulat (0.1% atau 0.2% - Sesekali)
    else if (chance > 0.85) {
        rate = (Math.random() > 0.5) ? 0.001 : 0.002;
    } 
    // Logika Pecahan Ganjil (0.213% - Sering/Default)
    else {
        rate = 0.002137; 
    }

    const burnedAmount = amount * rate;
    return { rate: (rate * 100).toFixed(4) + "%", burnedAmount };
}

// ==========================================
// TEKNOLOGI 3: X11-NANO GENESIS MESSAGE
// ==========================================
const genesisBlock = {
    block: 0,
    architect: "M. Fauzi Nizam",
    origin: "Blitar, Indonesia",
    message: "INITIATING XYRON: THE ARCHITECT’S MANIFESTO. Di saat dunia terjebak dalam rantai yang lambat, XYRON hadir sebagai pemutus batas...",
    tech_stack: "X11-Nano Encryption & Nexus-Parallel Flow"
};

// API Endpoint untuk Simulasi Transaksi & Burn
app.get('/api/transfer', (req, res) => {
    const amount = parseFloat(req.query.amount) || 100;
    const burn = executeAdaptiveBurn(amount);
    currentSupply -= burn.burnedAmount;

    res.json({
        status: "Transaction Confirmed via Nexus-Parallel",
        original_amount: amount,
        adaptive_burn_rate: burn.rate,
        burned_niz: burn.burnedAmount.toFixed(8),
        final_supply: currentSupply.toFixed(8)
    });
});

app.listen(3000, () => console.log("XYRON CORE ENGINE IS ACTIVE"));
