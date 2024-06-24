#!/bin/sh

echo "Starting Kafka..."

# Wait for Zookeeper to be ready
sleep 10

# Start Kafka
exec /usr/bin/start-kafka.sh
