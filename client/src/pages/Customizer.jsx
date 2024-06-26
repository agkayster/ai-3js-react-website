import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { download, stylishShirt } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import {
	AIPicker,
	ColorPicker,
	CustomButton,
	FilePicker,
	Tab,
} from '../components';

const Customizer = () => {
	// use snap to pass in everything from our state management
	const snap = useSnapshot(state);

	//set up different states
	const [file, setFile] = useState('');
	const [prompt, setPrompt] = useState('');
	const [generatingImg, setGeneratingImg] = useState(false);
	const [activeEditorTabs, setActiveEditorTabs] = useState('');
	const [activeFilterTabs, setActiveFilterTabs] = useState({
		logoShirt: true,
		stylishShirt: false,
	});

	// show tab content depending on the active tab
	const generateTabContent = () => {
		switch (activeEditorTabs) {
			case 'colorpicker':
				return <ColorPicker />;
			case 'filepicker':
				return (
					/* pass in our readFile function */
					<FilePicker
						file={file}
						setFile={setFile}
						readFile={readFile}
					/>
				);
			case 'aipicker':
				return <AIPicker />;

			default:
				return null;
		}
	};

	// to toggle the logo and texture of the shirt model on and off
	const handleDecals = (type, result) => {
		const decalType = DecalTypes[type];

		state[decalType.stateProperty] = result;

		if (!activeFilterTabs[decalType.FilterTab]) {
			handleActiveFilterTabs(decalType.FilterTab);
		}
	};

	// checks whether we are showing the logo or not or whether we are showing both the logo and the texture
	const handleActiveFilterTabs = (tabName) => {
		switch (tabName) {
			case 'logoShirt':
				state.isLogoTexture = !activeFilterTabs[tabName];
				break;
			case 'stylishShirt':
				state.isFullTexture = !activeFilterTabs[tabName];
				break;

			default:
				state.isLogoTexture = true;
				state.isFullTexture = false;
		}
	};

	// readFile function is passed into the FilePicker component above
	const readFile = (type) => {
		reader(file).then((result) => {
			handleDecals(type, result);
			setActiveEditorTabs('');
		});
	};

	return (
		<AnimatePresence>
			{!snap.intro && (
				<>
					<motion.div
						key='custom'
						className='absolute top-0 left-0 z-10'
						{...slideAnimation('left')}>
						<div className='flex items-center min-h-screen'>
							<div className='editortabs-container tabs'>
								{EditorTabs.map((tab) => (
									<Tab
										key={tab.icon}
										name={tab.name}
										icon={tab.icon}
										tab={tab}
										handleClick={() => {
											setActiveEditorTabs(tab.name);
										}}
									/>
								))}
								{generateTabContent()}
							</div>
						</div>
					</motion.div>
					<motion.div
						className='absolute z-10 top-5 right-5'
						{...fadeAnimation}>
						<CustomButton
							type='filled'
							title='Go Back'
							handleClick={() => (state.intro = true)}
							customStyles='w-fit px-4 py-2.5 font-bold text-sm'
						/>
					</motion.div>
					<motion.div
						className='filtertabs-container'
						{...slideAnimation('up')}>
						{FilterTabs.map((tab) => (
							<Tab
								key={tab.icon}
								name={tab.name}
								icon={tab.icon}
								tab={tab}
								isFilterTab
								isActiveTab={activeFilterTabs[tab.name]}
								handleClick={() => {
									handleActiveFilterTabs(tab.name);
								}}
							/>
						))}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default Customizer;
