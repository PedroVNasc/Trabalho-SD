sudo docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest

sudo docker network create kafka-network

sudo docker run --name zookeeper --network kafka-network -p 2181:2181 zookeeper

sudo docker run -p 9092:9092 --name kafka --network kafka-network \
  -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
  -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
  confluentinc/cp-kafka

