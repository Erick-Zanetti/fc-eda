import { Kafka } from 'kafkajs';
import { updateBalance } from './balanceController.js';

const kafka = new Kafka({ brokers: ['kafka:29092'] });
const consumer = kafka.consumer({ groupId: 'balances-service' });

export async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'balances', fromBeginning: true });

  console.log('Kafka consumer started');
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());
      console.log(`Received event:`, event);
      await updateBalance(event);
    },
  });
}
