import { describe, it, expect, vi, beforeEach } from 'vitest';
import { connectMetaMask, getAccounts, isMetaMaskInstalled } from '../metamaskConnector.js';

describe('MetaMask Connector', () => {
  beforeEach(() => {
    // Reset window.ethereum mock before each test
    delete global.window;
    global.window = {};
  });

  describe('isMetaMaskInstalled', () => {
    it('should return true when MetaMask is installed', () => {
      global.window.ethereum = {};
      expect(isMetaMaskInstalled()).toBe(true);
    });

    it('should return false when MetaMask is not installed', () => {
      expect(isMetaMaskInstalled()).toBe(false);
    });
  });

  describe('connectMetaMask', () => {
    it('should throw error when MetaMask is not installed', async () => {
      await expect(connectMetaMask()).rejects.toThrow('MetaMask is not installed');
    });

    it('should connect successfully when MetaMask is available', async () => {
      const mockAccounts = ['0x1234567890123456789012345678901234567890'];
      global.window.ethereum = {
        request: vi.fn().mockResolvedValue(mockAccounts),
      };

      const result = await connectMetaMask();
      expect(result.address).toBe(mockAccounts[0]);
      expect(result.provider).toBe(global.window.ethereum);
    });

    it('should throw error when no accounts found', async () => {
      global.window.ethereum = {
        request: vi.fn().mockResolvedValue([]),
      };

      await expect(connectMetaMask()).rejects.toThrow('No accounts found');
    });

    it('should throw error when user rejects connection', async () => {
      const rejectionError = new Error('User rejected');
      rejectionError.code = 4001;
      
      global.window.ethereum = {
        request: vi.fn().mockRejectedValue(rejectionError),
      };

      await expect(connectMetaMask()).rejects.toThrow('User rejected the connection request');
    });
  });

  describe('getAccounts', () => {
    it('should return empty array when MetaMask is not installed', async () => {
      const accounts = await getAccounts();
      expect(accounts).toEqual([]);
    });

    it('should return accounts when MetaMask is available', async () => {
      const mockAccounts = ['0x1234567890123456789012345678901234567890'];
      global.window.ethereum = {
        request: vi.fn().mockResolvedValue(mockAccounts),
      };

      const accounts = await getAccounts();
      expect(accounts).toEqual(mockAccounts);
    });

    it('should return empty array on error', async () => {
      global.window.ethereum = {
        request: vi.fn().mockRejectedValue(new Error('Failed')),
      };

      const accounts = await getAccounts();
      expect(accounts).toEqual([]);
    });
  });
});
