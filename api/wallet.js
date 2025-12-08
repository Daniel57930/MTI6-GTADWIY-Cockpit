// Simple serverless endpoint stub that would read balances from a Supabase table.
// This is a placeholder; configure SUPABASE_URL and SUPABASE_KEY in your deployment environment.

export default async function handler(req, res) {
  // For now return a mocked result. Replace with Supabase client logic when ready.
  try {
    const mock = { account: '0x...', balance: '1.2345 ETH' };
    res.status(200).json({ ok: true, data: mock });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'server error' });
  }
}