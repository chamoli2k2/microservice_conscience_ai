import express from 'express';
import bodyParser from 'body-parser';
import amqplib from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Replace this with your actual CloudAMQP connection string
const rabbitmqUrl = process.env.RABBITMQ_URL;

// Validate and publish user data
app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;

  // Simple validation
  if (!name || !email || !age || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).send('Invalid data');
  }

  
  try {
    const connection = await amqplib.connect(rabbitmqUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue('user_queue');
    
    const user = { name, email, age };
    channel.sendToQueue('user_queue', Buffer.from(JSON.stringify(user)));
    
    res.status(200).send('User data published');
  } catch (error) {
    console.error('Error publishing message:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Node.js server running on port 3000');
});
