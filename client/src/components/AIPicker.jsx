import React from 'react';
import CustomButton from './CustomButton';

const AIPicker = ({
	prompt,
	setPrompt,
	generatingImg,
	handleSubmit,
	windowOps,
}) => {
	return (
		<>
			{windowOps && (
				<div className='aipicker-container'>
					<textarea
						className='aipicker-textarea'
						placeholder='Ask AI...'
						rows={5}
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
					/>
					<div className='flex flex-wrap gap-3'>
						{/* if we are generating an image */}
						{generatingImg ? (
							<CustomButton
								type='outline'
								title='Asking AI...'
								customStyles='text-xs'
							/>
						) : (
							// if we are not generating an image
							<>
								<CustomButton
									type='outline'
									title='AI Logo'
									customStyles='text-xs'
									handleClick={() => handleSubmit('logo')}
								/>
								<CustomButton
									type='filled'
									title='AI Full'
									customStyles='text-xs'
									handleClick={() => handleSubmit('full')}
								/>
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default AIPicker;
