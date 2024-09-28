import { ethers } from 'ethers';
import { config } from '../config';
import { lUSDCe } from '../constants';

async function queryPastEvents(
  contractAddress: string,
  contractABI: any[],
  eventName: string,
  fromBlock: number,
  toBlock: any
) {
  const provider = new ethers.providers.JsonRpcProvider(config.RPC_URL);

  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  const filter = contract.filters[eventName]();

  const events = await contract.queryFilter(filter, fromBlock, toBlock);

  events.forEach(event => {
    console.log(event);
  });
}

const abi = [{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "internalType": "address",
      "name": "liquidator",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "address",
      "name": "borrower",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "repayAmount",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "address",
      "name": "cTokenCollateral",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "seizeTokens",
      "type": "uint256"
    }
  ],
  "name": "LiquidateBorrow",
  "type": "event"
}];

// 使用例
const eventName = 'LiquidateBorrow';

const startBlock = 238561738;
const blockRange = 10000;
const totalBlocks = 1000000; // 例として10回ループする

async function main() {
  const parallelQueries = 5;
  const chunkSize = Math.floor(totalBlocks / parallelQueries);

  const queries = [];
  for (let j = 0; j < parallelQueries; j++) {
    const startBlockForChunk = startBlock + j * chunkSize;
    const endBlockForChunk = Math.min(startBlockForChunk + chunkSize, startBlock + totalBlocks);

    queries.push((async () => {
      for (let i = startBlockForChunk; i < endBlockForChunk; i += blockRange) {
        const fromBlock = i;
        const toBlock = Math.min(fromBlock + blockRange, endBlockForChunk);
        
        console.log(`ブロック範囲: ${fromBlock} から ${toBlock}`);
        await queryPastEvents(lUSDCe, abi, eventName, fromBlock, toBlock);
        
        // APIレート制限を避けるための短い遅延
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    })());
  }

  await Promise.all(queries);
}

main();
