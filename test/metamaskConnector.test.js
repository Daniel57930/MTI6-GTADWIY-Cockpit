/**
 * MetaMask Connector Tests
 * Tests for MetaMask Web3 connector functionality
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { metamaskConnector } from '../src/connectors/metamaskConnector';

describe('MetaMaskConnector', () => {
  beforeEach(() => {
    // Reset connector state before each test
    metamaskConnector.provider = null;
    metamaskConnector.signer = null;
    metamaskConnector.address = null;
  });

  describe('isMetaMaskInstalled', () => {
    it('should return false when window.ethereum is not available', () => {
      // Save original window.ethereum
      const originalEthereum = global.window?.ethereum;
      
      // Mock window without ethereum
      global.window = { ethereum: undefined };
      
      const result = metamaskConnector.isMetaMaskInstalled();
      expect(result).toBe(false);
      
      // Restore
      if (originalEthereum !== undefined) {
        global.window.ethereum = originalEthereum;
      }
    });

    it('should return false when ethereum.isMetaMask is false', () => {
      global.window = { ethereum: { isMetaMask: false } };
      
      const result = metamaskConnector.isMetaMaskInstalled();
      expect(result).toBe(false);
    });

    it('should return true when MetaMask is installed', () => {
      global.window = { 
        ethereum: { 
          isMetaMask: true,
          request: vi.fn()
        } 
      };
      
      const result = metamaskConnector.isMetaMaskInstalled();
      expect(result).toBe(true);
    });
  });

  describe('getAddress', () => {
    it('should return null when not connected', () => {
      const address = metamaskConnector.getAddress();
      expect(address).toBeNull();
    });

    it('should return address when connected', () => {
      const testAddress = '0x1234567890123456789012345678901234567890';
      metamaskConnector.address = testAddress;
      
      const address = metamaskConnector.getAddress();
      expect(address).toBe(testAddress);
    });
  });

  describe('disconnect', () => {
    it('should clear connector state', () => {
      // Setup connected state
      metamaskConnector.provider = { fake: 'provider' };
      metamaskConnector.signer = { fake: 'signer' };
      metamaskConnector.address = '0x1234567890123456789012345678901234567890';
      
      // Mock window.ethereum with removeListener
      global.window = {
        ethereum: {
          removeListener: vi.fn()
        }
      };
      
      metamaskConnector.disconnect();
      
      expect(metamaskConnector.provider).toBeNull();
      expect(metamaskConnector.signer).toBeNull();
      expect(metamaskConnector.address).toBeNull();
    });
  });

  describe('handleAccountsChanged', () => {
    it('should disconnect when accounts array is empty', () => {
      const disconnectSpy = vi.spyOn(metamaskConnector, 'disconnect');
      
      metamaskConnector.handleAccountsChanged([]);
      
      expect(disconnectSpy).toHaveBeenCalled();
    });

    it('should update address when account changes', () => {
      const newAddress = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd';
      metamaskConnector.address = '0x1234567890123456789012345678901234567890';
      
      metamaskConnector.handleAccountsChanged([newAddress]);
      
      expect(metamaskConnector.address).toBe(newAddress);
    });

    it('should not update if account is the same', () => {
      const address = '0x1234567890123456789012345678901234567890';
      metamaskConnector.address = address;
      
      metamaskConnector.handleAccountsChanged([address]);
      
      expect(metamaskConnector.address).toBe(address);
    });
  });

  describe('connect', () => {
    it('should throw error when MetaMask is not installed', async () => {
      global.window = { ethereum: undefined };
      
      await expect(metamaskConnector.connect()).rejects.toThrow(
        'MetaMask is not installed'
      );
    });
  });
});
