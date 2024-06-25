import React, { useRef } from 'react';
import { easing } from 'maath'; // for 3D models
import { useFrame } from '@react-three/fiber'; // for 3D models
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'; // for 3D models

const Backdrop = () => {
	return (
		<AccumulativeShadows position={[0, 0, -0.14]}>
			<RandomizedLight amount={4} />
		</AccumulativeShadows>
	);
};

export default Backdrop;
