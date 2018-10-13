"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const Web3 = require('web3');
let AppService = class AppService {
    constructor() {
        this.ret = [];
        this.web3 = new Web3('http://localhost:8545');
    }
    root() {
        return __awaiter(this, void 0, void 0, function* () {
            const block = yield this.getLatest();
            return this.showBlock(block);
        });
    }
    getLatest() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.latest = this.latest || (yield this.web3.eth.getBlock('latest'));
        });
    }
    task1(n) {
        return __awaiter(this, void 0, void 0, function* () {
            const lt = yield this.getLatest();
            for (let i = 0; i < n; i++) {
                const block = yield this.web3.eth.getBlock(lt.number - i);
                this.ret.push(this.showBlock(block));
            }
            return this.ret.join('<br>');
        });
    }
    showBlock(block) {
        const { number, hash, transactions, timestamp } = block;
        return `Latest number: ${number} , hash: ${hash} transactions: ${transactions.length}`;
    }
    task2(n) {
        return __awaiter(this, void 0, void 0, function* () {
            const block = yield this.web3.eth.getBlock(n);
            const { transactions } = block;
            const ret = [];
            for (const hash of transactions) {
                const t = yield this.web3.eth.getTransaction(hash);
                const { blockHash, gas } = t;
                ret.push(`${blockHash} gas: ${gas}`);
            }
            return `Transactions: <br>` + ret.join('<br>');
        });
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map