import { Injectable } from '@nestjs/common';
// Importujemy klasę web3
// tslint:disable-next-line:no-var-requires
const Web3 = require('web3');

@Injectable()
export class AppService {
  private web3;
  private latest;
  ret = [];
  constructor() {
    this.web3 = new Web3('http://localhost:8545');
  }

  async root() {
    const block = await this.getLatest();
    return this.showBlock(block);
  }

  async getLatest() {
    return this.latest = this.latest || await this.web3.eth.getBlock('latest');
  }

  async task1(n) {
    const lt = await this.getLatest();
    for (let i = 0; i < n; i++) {
      const block = await this.web3.eth.getBlock(lt.number - i);
      this.ret.push(this.showBlock(block));
    }
    return this.ret.join('<br>');
  }

  showBlock(block) {
    const { number, hash, transactions, timestamp } = block;
    return `Latest number: ${number} , hash: ${hash} transactions: ${transactions.length}`;
  }

  async task2(n) {
    const block = await this.web3.eth.getBlock(n);
    const { transactions } = block;
    const ret = [];
    for (const hash of transactions) {
        const t = await this.web3.eth.getTransaction(hash);
        const { blockHash, gas } = t;
        ret.push(`${blockHash} gas: ${gas}`);
    }
    return `Transactions: <br>` + ret.join('<br>');
  }

}
