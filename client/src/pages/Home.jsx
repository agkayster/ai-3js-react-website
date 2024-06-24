import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../store';

import {
	headContainerAnimation,
	headContentAnimation,
	headTextAnimation,
	slideAnimation,
} from '../config/motion';

const Home = () => {
	const snap = useSnapshot(state);
	return (
		<AnimatePresence>
			{/* checks if we are on the home page */}
			{snap.intro && (
				<motion.section
					className='home'
					/* spreads the slideAnimation and it starts from the left */
					{...slideAnimation('left')}>
					<motion.header>
						<img
							src='./threejs.png'
							alt='logo'
							className='w-8 h-8 object-contain'
						/>
					</motion.header>
				</motion.section>
			)}
		</AnimatePresence>
	);
};

export default Home;
