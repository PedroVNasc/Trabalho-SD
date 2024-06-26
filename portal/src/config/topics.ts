// List of kafka topics to be created
const topics = [
    {
        topic: "sus-logs",
        numPartitions: 1,
        replicationFactor: 1,
    },
    {
        topic: "sus-errors",
        numPartitions: 1,
        replicationFactor: 1,
    },
    {
        topic: "user-created",
        numPartitions: 1,
        replicationFactor: 1,
    },
    {
        topic: "sus-tasks",
        numPartitions: 1,
        replicationFactor: 1,
    },
];

export default topics;