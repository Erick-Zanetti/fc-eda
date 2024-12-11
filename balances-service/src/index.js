import express from 'express';
import { getBalance } from './balanceController.js';
import { startConsumer } from './kafkaConsumer.js';

const app = express();
const PORT = 3003;

app.get('/balances/:account_id', async (req, res) => {
  const { account_id } = req.params;
  try {
    const balance = await getBalance(account_id);
    if (!balance) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.json(balance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Balances service running on port ${PORT}`);
  startConsumer();
});
