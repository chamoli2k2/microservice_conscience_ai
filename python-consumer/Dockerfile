# Sample Dockerfile for Python Consumer
FROM python:3.9-slim

WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install the dependencies including pymongo with srv extra
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code
COPY . .

# Command to run your application
CMD ["python", "consumer.py"]
