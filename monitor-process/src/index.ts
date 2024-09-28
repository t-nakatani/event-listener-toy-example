import { ethers } from 'ethers';

const monitorEvent = async (eventData: any) => {
  const { contractAddress, eventName, rpcUrl, abi } = eventData;

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const contract = new ethers.Contract(contractAddress, abi, provider);

  console.log(`Starting to monitor ${eventName} events on contract ${contractAddress}`);

  contract.on(eventName, (...args) => {
    const event = args[args.length - 1];
    console.log('Event detected:', event);
    // ここでログ収集プラットフォームにデータを送信する処理を追加
  });
};

const eventData = JSON.parse(process.argv[2]);
monitorEvent(eventData).catch((error) => {
  console.error('Error in monitor process:', error);
  process.exit(1);
});
