const CONFIG = require('./config');
const crypto = require('crypto');

/**
 * STRUKTUR BLOK XYRON
 * Diciptakan oleh: M. Fauzi Nizam
 * Lokasi: Blitar, Indonesia
 */
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0; // Digunakan untuk algoritma X11-Nano
    }

    // Menghasilkan sidik jari digital unik untuk tiap blok
    calculateHash() {
        return crypto.createHash('sha256').update(
            this.index + 
            this.previousHash + 
            this.timestamp + 
            JSON.stringify(this.data) + 
            this.nonce
        ).digest('hex');
    }
}

/**
 * RANTAI BLOK (LEDGER) DESENTRALISASI
 */
class XyronChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    // Blok 0: Fondasi abadi yang tidak bisa diubah
    createGenesisBlock() {
        return new Block(0, "24/02/2026", CONFIG.GENESIS_MSG, "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Menambahkan blok baru hasil transaksi lokal
    addBlock(newData) {
        const prevBlock = this.getLatestBlock();
        const newBlock = new Block(
            this.chain.length, 
            new Date().toISOString(), 
            newData, 
            prevBlock.hash
        );
        this.chain.push(newBlock);
        console.log(`Blok #${newBlock.index} berhasil ditambahkan ke Ledger.`);
        return newBlock;
    }

    // =========================================================
    // PILAR DESENTRALISASI: LOGIKA KONSENSUS (SINKRONISASI)
    // =========================================================
    replaceChain(newChain) {
        // Aturan 1: Hanya terima rantai yang lebih panjang (Longest Chain Rule)
        if (newChain.length <= this.chain.length) {
            console.log("Rantai masuk ditolak: Tidak lebih panjang dari rantai lokal.");
            return;
        }
        
        // Aturan 2: Validasi Genesis Block agar tidak bisa dibajak
        const incomingGenesis = JSON.stringify(newChain[0]);
        const localGenesis = JSON.stringify(this.createGenesisBlock());
        
        if (incomingGenesis !== localGenesis) {
            console.log("CRITICAL ERROR: Genesis Block tidak cocok! Node ditolak.");
            return;
        }

        // Jika lolos validasi, update seluruh data blockchain lokal
        this.chain = newChain;
        console.log("SINKRONISASI BERHASIL: Blockchain XYRON telah diperbarui ke versi global terbaru.");
    }
}

module.exports = XyronChain;
