import express from 'express';
import db from './db'; // Importando a configuração do banco de dados
import userRoutes from './routes/userRoutes';
import { runKafka } from './kafka';
import { runUserConsumer } from './consumer/userConsumer';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRoutes);

db.once('open', () => {
    runKafka().then(() => {
        console.log('Kafka Producer and Consumer connected');
        runUserConsumer();
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
