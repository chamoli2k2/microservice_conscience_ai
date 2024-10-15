import pika
import pymongo
import json
import os
from dotenv import load_dotenv

load_dotenv()

rabbitmq_url = os.getenv("RABBITMQ_URL")
mongo_url = os.getenv("MONGO_URL")


# MongoDB connection
client = pymongo.MongoClient(mongo_url)
db = client['userdb']
collection = db['users']

# RabbitMQ connection
params = pika.URLParameters(rabbitmq_url)
connection = pika.BlockingConnection(params)
channel = connection.channel()

channel.queue_declare(queue='user_queue', durable=True)

def callback(ch, method, properties, body):
    user_data = json.loads(body)
    print(f"Received: {user_data}")

    # Insert into MongoDB
    collection.insert_one(user_data)
    print("User data saved to MongoDB")

channel.basic_consume(queue='user_queue', on_message_callback=callback, auto_ack=True)

print('Waiting for messages. To exit press CTRL+C')
channel.start_consuming()
