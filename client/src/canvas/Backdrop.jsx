import React, { useRef } from 'react';
import { easing } from 'maath'; // for 3D models
import { useFrame } from '@react-three/fiber'; // for 3D models
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'; // for 3D models

const Backdrop = () => {
	const shadows = useRef();
	return (
		/* alphatest sets transparency of the shadows, temporal smoothes out the edges of the shadow, frames would render as per number set */
		<AccumulativeShadows
			position={[0, 0, -0.14]}
			ref={shadows}
			temporal
			frames={60}
			//set alphaTest to 0 to remove shadow
			alphaTest={0.85}
			scale={10}
			rotation={[Math.PI / 2, 0, 0]}>
			<RandomizedLight
				amount={4}
				radius={9}
				intensity={0.85}
				ambient={0.25}
				position={[5, 5, -10]}
			/>
			<RandomizedLight
				amount={4}
				radius={5}
				intensity={0.25}
				ambient={0.55}
				position={[-5, 5, -9]}
			/>
		</AccumulativeShadows>
	);
};

export default Backdrop;
