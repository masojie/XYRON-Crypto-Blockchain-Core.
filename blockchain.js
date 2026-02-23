const crypto = require('crypto');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0; // Fitur untuk X11-Nano Mining
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
        return new Block(0, "24/02/2026", "XYRON GENESIS BLOCK - ARCHITECT: M. FAUZI NIZAM", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newData) {
        const prevBlock = this.getLatestBlock();
        const newBlock = new Block(this.chain.length, new Date().toISOString(), newData, prevBlock.hash);
        this.chain.push(newBlock);
    }
}

module.exports = XyronChain;

