import Block from './block';

export default class Blockchain {

  private blockchain: Block[];

  constructor() {
    this.blockchain = [this.createGenesisBlock()];
  }

  private createGenesisBlock(): Block {
    return new Block({}, '');
  }

  get current(): Block {
    return this.blockchain[this.blockchain.length - 1];
  }

  add(data: unknown): Blockchain {
    const [ isValid ] = this.isValid();
    if (!isValid) throw new Error('Blockchain invalid; adding prevented');
    const block = new Block(data, this.current.hash);
    this.blockchain.push(block);
    return this;
  }

  isValid(): [boolean, number] {
    for (let i = 0; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i];
      const previousBlock = this.blockchain[i - 1];
      if (currentBlock.hash !== currentBlock.computeHash()) return [false, i];
      if (previousBlock && currentBlock.previousHash !== previousBlock.hash) return [false, i];
    }
    return [true, -1];
  }

}
