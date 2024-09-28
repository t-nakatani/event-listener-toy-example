"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const monitorEvent = (eventData) => __awaiter(void 0, void 0, void 0, function* () {
    const { contractAddress, eventName, rpcUrl, abi } = eventData;
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(rpcUrl);
    const contract = new ethers_1.ethers.Contract(contractAddress, abi, provider);
    console.log(`Starting to monitor ${eventName} events on contract ${contractAddress}`);
    contract.on(eventName, (...args) => {
        const event = args[args.length - 1];
        console.log('Event detected:', event);
        // ここでログ収集プラットフォームにデータを送信する処理を追加
    });
});
const eventData = JSON.parse(process.argv[2]);
monitorEvent(eventData).catch((error) => {
    console.error('Error in monitor process:', error);
    process.exit(1);
});
