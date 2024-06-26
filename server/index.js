import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

// setting up our environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
	res.status(200).json({ message: 'This is the server backend' });
});

const port = 5000;

app.listen(port, () => console.log(`Server is up and running on port ${port}`));
