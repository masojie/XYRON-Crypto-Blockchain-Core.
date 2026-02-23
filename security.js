const crypto = require('crypto');

class Security {
    // Inti Inovasi: X11-Nano Adaptive
    static x11SmartHash(data, isSuspicious = false) {
        if (!isSuspicious) {
            // MODE KOMBINASI (Efisien - RAM Ringan)
            let layers = [];
            for (let i = 1; i <= 11; i++) {
                layers.push(crypto.createHash('sha256').update(data + i).digest('hex'));
            }
            return crypto.createHash('sha256').update(layers.join('')).digest('hex');
        } else {
            // MODE BERUNTUN (Deep Security 11 Lapis - Alur Semula)
            let secureHash = data;
            for (let i = 1; i <= 11; i++) {
                secureHash = crypto.createHash('sha256')
                                   .update(secureHash + `_LAYER_${i}_XYRON_NIZAM_BLITAR`)
                                   .digest('hex');
            }
            return secureHash;
        }
    }

    static validateTransaction(tx) {
        // Deteksi otomatis: Jika jumlah aneh atau bukan angka, aktifkan mode Secure
        const isSuspicious = !tx.amount || tx.amount <= 0 || typeof tx.amount !== 'number';
        const proof = this.x11SmartHash(String(tx.amount), isSuspicious);
        return { isValid: (proof !== null), isSuspicious };
    }

    static nanoEncrypt(data) {
        // Enkripsi standar untuk pembuatan Hash Blok
        return crypto.createHash('sha256').update(data + Date.now()).digest('hex');
    }
}

module.exports = Security;
