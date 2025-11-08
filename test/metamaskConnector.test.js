// Vitest + jsdom test that mocks window.ethereum
import { beforeEach, afterEach, test, expect, vi } from 'vitest'

function createMockEthereum(initialAccounts = ['0xabc']) {
  const listeners = {}
  return {
    isMetaMask: true,
    request: vi.fn(({ method }) => {
      if (method === 'eth_requestAccounts') return Promise.resolve(initialAccounts)
      if (method === 'eth_chainId') return Promise.resolve('0x1')
      if (method === 'eth_accounts') return Promise.resolve(initialAccounts)
      return Promise.reject(new Error('Unknown method'))
    }),
    on: (evt, cb) => {
      listeners[evt] = listeners[evt] || []
      listeners[evt].push(cb)
    },
    removeListener: (evt, cb) => {
      if (!listeners[evt]) return
      listeners[evt] = listeners[evt].filter((f) => f !== cb)
    },
    _emit: (evt, payload) => {
      (listeners[evt] || []).forEach((cb) => cb(payload))
    },
  }
}

beforeEach(() => {
  global.window = global.window || {}
  window.ethereum = createMockEthereum(['0x1234567890123456789012345678901234567890'])
})

afterEach(() => {
  delete window.ethereum
})

test('connectMetaMask resolves to account and chainId', async () => {
  const { connectMetaMask, getAccount } = await import('../metamaskConnector.js')
  const r = await connectMetaMask()
  expect(r.account).toBe('0x1234567890123456789012345678901234567890')
  expect(r.chainId).toBe('0x1')
  expect(getAccount()).toBe('0x1234567890123456789012345678901234567890')
})

test('accountsChanged handler updates account', async () => {
  const { connectMetaMask, onAccountsChanged, getAccount } = await import('../metamaskConnector.js')
  await connectMetaMask()
  let seen = null
  const unsub = onAccountsChanged((acct) => {
    seen = acct
  })
  window.ethereum._emit('accountsChanged', ['0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'])
  expect(seen).toBe('0xabcdefabcdefabcdefabcdefabcdefabcdefabcd')
  expect(getAccount()).toBe('0xabcdefabcdefabcdefabcdefabcdefabcdefabcd')
  unsub()
})
