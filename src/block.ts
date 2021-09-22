import { createHash } from 'crypto';

export default class Block {

  readonly hash: string;
  private timestamp: number;

  constructor(
    private data: unknown,
    readonly previousHash: string
  ) {
    this.previousHash = previousHash;
    this.timestamp = Date.now();
    this.hash = this.computeHash();
  }

  computeHash(): string {
    const blockAsString = this.previousHash + this.timestamp + JSON.stringify(this.data);
    return createHash('sha256').update(blockAsString).digest('hex');
  }

}
