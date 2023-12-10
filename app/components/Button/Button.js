import React from 'react';

const Button = ({ children, clickAction, className }) => {
	return (
		<button onClick={clickAction} className={className}>
			{children}
		</button>
	);
};

export default Button;
