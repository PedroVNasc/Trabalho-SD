import express from 'express';
import db from './db'; // Importando a configuração do banco de dados
import userRoutes from './routes/userRoutes';
import { kafkaSetup } from './kafka';
import { runUserConsumer } from './consumer/userConsumer';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRoutes);

db.once('open', () => {
    kafkaSetup().then(() => {
        console.log('Kafka Producer and Consumer connected');
        runUserConsumer();
        console.log('User Consumer running...');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
