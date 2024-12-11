import { db } from './db.js';

export async function getBalance(accountId) {
  const result = await db.query('SELECT * FROM balances WHERE account_id = $1', [accountId]);
  return result.rows[0];
}

export async function updateBalance(event) {
  const { account_id_from, balance_account_id_from, account_id_to, balance_account_id_to } = event?.Payload;

  console.log('Payload:', event?.Payload);

  if (!account_id_from || !account_id_to) {
    throw new Error('Invalid event: account_id_from or account_id_to is missing');
  }

  await db.query(
    `INSERT INTO balances (account_id, balance) 
     VALUES ($1, $2) 
     ON CONFLICT (account_id) 
     DO UPDATE SET balance = EXCLUDED.balance`,
    [account_id_from, balance_account_id_from]
  );

  await db.query(
    `INSERT INTO balances (account_id, balance) 
     VALUES ($1, $2) 
     ON CONFLICT (account_id) 
     DO UPDATE SET balance = EXCLUDED.balance`,
    [account_id_to, balance_account_id_to]
  );
}
