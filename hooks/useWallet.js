import { useEffect, useState, useCallback } from 'react';

function hexToNumber(hex) {
  return parseInt(hex, 16);
}

export default function useWallet() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const connect = useCallback(async () => {
    if (!window.ethereum) return alert('MetaMask not detected');
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const acct = accounts[0];
      setAccount(acct);
      const balHex = await window.ethereum.request({ method: 'eth_getBalance', params: [acct, 'latest'] });
      const bal = hexToNumber(balHex) / (10 ** 18);
      setBalance(bal.toFixed(4) + ' ETH');
    } catch (e) {
      console.error('wallet connect failed', e);
    }
  }, []);

  useEffect(() => {
    if (!window.ethereum) return;
    async function check() {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts && accounts.length) {
          setAccount(accounts[0]);
          const balHex = await window.ethereum.request({ method: 'eth_getBalance', params: [accounts[0], 'latest'] });
          const bal = hexToNumber(balHex) / (10 ** 18);
          setBalance(bal.toFixed(4) + ' ETH');
        }
      } catch (e) { console.warn(e); }
    }
    check();

    window.ethereum.on && window.ethereum.on('accountsChanged', async (accounts) => {
      if (!accounts || !accounts.length) {
        setAccount(null);
        setBalance(null);
        return;
      }
      setAccount(accounts[0]);
      const balHex = await window.ethereum.request({ method: 'eth_getBalance', params: [accounts[0], 'latest'] });
      const bal = hexToNumber(balHex) / (10 ** 18);
      setBalance(bal.toFixed(4) + ' ETH');
    });

    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  return { account, balance, connect };
}