import { proxy } from 'valtio';

const state = proxy({
	intro: true, // boolean, checks whether we are currently on the home page
	color: '#EFBD48',
	isLogoTexture: true, // boolean, checks whether we are displaying the logo on our shirt
	isFullTexture: false,
	logoDecal: './threejs.png',
	fullDecal: './threejs.png',
});

export default state;
