const CONFIG = require('./config');
const crypto = require('crypto');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0; 
    }

    calculateHash() {
        return crypto.createHash('sha256').update(
            this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce
        ).digest('hex');
    }
}

class XyronChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "24/02/2026", CONFIG.GENESIS_MSG, "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newData) {
        const prevBlock = this.getLatestBlock();
        const newBlock = new Block(this.chain.length, new Date().toISOString(), newData, prevBlock.hash);
        this.chain.push(newBlock);
        
        // OTOMATIS BERSIHKAN RAM/ROM JIKA BLOK TERLALU BANYAK
        this.pruneChain(); 
        
        return newBlock;
    }

    // FITUR OPTIMASI HP: Menjaga rantai tetap ringan
    pruneChain() {
        const MAX_BLOCKS = 50; // Hanya simpan 50 transaksi terakhir di memori HP
        if (this.chain.length > MAX_BLOCKS) {
            const genesis = this.chain[0];
            const recent = this.chain.slice(-MAX_BLOCKS);
            this.chain = [genesis, ...recent];
            console.log("XYRON Optimization: Memory Pruned for Mobile Stability.");
        }
    }

    replaceChain(newChain) {
        if (newChain.length <= this.chain.length) return;
        if (JSON.stringify(newChain[0]) !== JSON.stringify(this.createGenesisBlock())) return;

        this.chain = newChain;
        this.pruneChain(); // Bersihkan juga rantai yang baru masuk jika kepanjangan
        console.log("XYRON Synced & Optimized.");
    }
}

module.exports = XyronChain;
