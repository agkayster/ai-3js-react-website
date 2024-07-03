import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import dalleRoutes from './routes/dalle.routes.js';

// setting up our environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '500mb' }));

app.get('/', (req, res) => {
	res.status(200).json({ message: 'This is the server backend' });
});

app.use('/api/v1/dalle', dalleRoutes);

const port = 5000;

app.listen(port, () => console.log(`Server is up and running on port ${port}`));
