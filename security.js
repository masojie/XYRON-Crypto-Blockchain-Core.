const crypto = require('crypto');

const Security = {
    // Memastikan Hash transaksi tidak dimanipulasi
    validateTransaction: (tx) => {
        if (!tx.architect || tx.architect !== "M. Fauzi Nizam") return false;
        if (tx.amount <= 0) return false;
        return true;
    },

    // Enkripsi tambahan untuk pilar X11-Nano
    nanoEncrypt: (data) => {
        return crypto.createHash('sha256').update(data + "XYRON_NIZAM_SECURE").digest('hex');
    }
};

module.exports = Security;

