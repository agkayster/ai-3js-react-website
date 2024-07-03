import express from 'express';
import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

// create additional routes
const router = express.Router();

router.route('/').get((req, res) => {
	res.status(200).json({ message: 'Hello from DALL.E ROUTES' });
});

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').post(async (req, res) => {
	try {
		// info we get when we type into ai prompt
		const { prompt } = req.body;
		console.log('get prompt =>', prompt);

		// how to get AI response
		const response = await openai.images.generate({
			prompt,
			n: 1, // number of images to generate
			size: '1024x1024',
			response_format: 'b64_json',
			quality: 'standard',
		});
		console.log('get openai response =>', response);

		// const image = response.data.data[0].b64_json;
		const image = response.data[0].b64_json;

		// how we pass it back to frontend
		res.status(200).json({ photo: image });
	} catch (error) {
		console.log('get error from dalle =>', error);
		res.status(500).json({
			message: 'Something went wrong',
			error: error.message,
		});
	}
});

export default router;
