import React, { useState } from 'react';
import { registerEvent } from '../api';

const EventForm: React.FC = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [eventName, setEventName] = useState('');
  const [rpcUrl, setRpcUrl] = useState('');
  const [abi, setAbi] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerEvent({ contractAddress, eventName, rpcUrl, abi });
      setContractAddress('');
      setEventName('');
      setRpcUrl('');
      setAbi('');
      alert('イベントが正常に登録されました');
    } catch (error) {
      console.error('イベント登録エラー:', error);
      alert('イベントの登録に失敗しました');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
        placeholder="Contract Address"
        required
      />
      <input
        type="text"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        placeholder="Event Name"
        required
      />
      <input
        type="text"
        value={rpcUrl}
        onChange={(e) => setRpcUrl(e.target.value)}
        placeholder="RPC URL"
        required
      />
      <textarea
        value={abi}
        onChange={(e) => setAbi(e.target.value)}
        placeholder="Contract ABI"
        required
      />
      <button type="submit">イベントを登録</button>
    </form>
  );
};

export default EventForm;
