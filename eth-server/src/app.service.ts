import { Injectable } from '@nestjs/common';
// Importujemy klasę web3
import * as Web3 from 'web3';

@Injectable()
export class AppService {
  private web3;

  constructor() {
    this.web3 = new Web3('http://localhost:8545');
  }

  async root() {
    const block = await this.web3.eth.getBlock('latest');
    const { number, hash, transactions, timestamp } = block;
    return `Latest number: ${number} , hash: ${hash} transactions: ${transactions.length}`;
  }

}
