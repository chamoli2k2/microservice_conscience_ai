# Microservice-Based Application with Node.js, Python, RabbitMQ, and MongoDB

## Overview
This project demonstrates a microservice-based architecture using **Node.js** and **Python** services, **RabbitMQ** as a message queue, and **MongoDB** as a database. The system consists of two services:

- **Node.js API Service**: Accepts user data through a REST API, validates the input, and sends the data to RabbitMQ.
- **Python Consumer Service**: Listens to the RabbitMQ queue, retrieves messages, and stores the user data into a MongoDB database.

The project is containerized using Docker, and all services are orchestrated using Docker Compose.

## Project Structure
```
/microservice-app
│
├── /node-app              # Node.js service (publisher)
│   ├── Dockerfile         # Dockerfile for Node.js service
│   ├── package.json       # Contains Node.js dependencies
│   ├── index.js           # Main entry point for Node.js API
│   └── .env               # Environment variables (for local testing)
│
├── /python-consumer       # Python service (consumer)
│   ├── Dockerfile         # Dockerfile for Python service
│   ├── consumer.py        # Main entry point for Python consumer
│   ├── requirements.txt   # Contains Python dependencies
│   └── .env               # Environment variables (for local testing)
│
├── docker-compose.yml     # Docker Compose file to manage services
```

### Services

1. **Node.js API Service**:
   - The `/users` endpoint accepts a POST request with user data (name, email, and age).
   - The API validates the data and publishes a message to the RabbitMQ queue.

2. **Python Consumer Service**:
   - Listens to the RabbitMQ queue for messages.
   - Upon receiving a message, the service stores the user information in a MongoDB database.

## Setup Instructions

### Prerequisites

Make sure you have the following installed:
- **Docker**
- **Docker Compose**

### How to Run the Application

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/chamoli2k2/microservice_conscience_ai.git
   cd microservice-app
   ```

2. **Create `.env` Files**:
   You need to create `.env` files for both `node-app` and `python-consumer` with the required environment variables (e.g., RabbitMQ connection string, MongoDB URI, etc.). Here's an example of what the `.env` file might look like:

   For the **Node.js** service (`node-app/.env`):
   ```
   RABBITMQ_URL=amqp://rabbitmq:5672
   ```

   For the **Python** service (`python-consumer/.env`):
   ```
   RABBITMQ_URL=amqp://rabbitmq:5672
   MONGO_URI=mongodb://mongodb:27017/usersdb
   ```

3. **Build and Run the Application**:
   Use Docker Compose to build and start all services:
   ```bash
   docker-compose up --build
   ```

   This will start the following services:
   - **Node.js API** (available at `http://localhost:3000`)
   - **Python Consumer** (listening for messages on RabbitMQ)
   - **RabbitMQ** (message broker)
   - **MongoDB** (database)

4. **Test the API**:
   Use Postman, cURL, or any other tool to send a POST request to the `/users` endpoint of the Node.js API. Example request:
   ```
   POST http://localhost:3000/users
   Content-Type: application/json

   {
     "name": "John Doe",
     "email": "john.doe@example.com",
     "age": 30
   }
   ```

   If the data is valid, the message will be sent to RabbitMQ and the Python consumer will store the data in MongoDB.

5. **Check MongoDB**:
   Use a MongoDB client like MongoDB Compass or the MongoDB shell to connect to the database and verify the user information is stored:
   ```
   mongodb://localhost:27017/usersdb
   ```

### Stopping the Application
To stop the application, run:
```bash
docker-compose down
```

## Components

1. **Node.js**: A backend service that exposes a REST API to accept and validate user data and publish it to a RabbitMQ queue.
2. **RabbitMQ**: A message broker that enables communication between the Node.js API service and the Python consumer service.
3. **Python**: A consumer service that listens to RabbitMQ, processes incoming messages, and stores data into MongoDB.
4. **MongoDB**: A NoSQL database where the user information is stored.

## Conclusion
This project demonstrates a simple microservice architecture, using multiple services interacting via a message queue and persisting data in a database. Docker Compose is used to orchestrate all the services, making it easy to set up and run the entire application locally.

---

