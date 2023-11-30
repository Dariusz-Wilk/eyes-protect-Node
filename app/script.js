import React, { useState, useMemo, useEffect } from 'react';
import { render } from 'react-dom';

const App = () => {
	const [status, setStatus] = useState('off');
	const [time, setTime] = useState(1200);
	const [timer, setTimer] = useState(null);

	const useFormatTime = time => {
		return useMemo(() => {
			const mins = Math.floor((time / 60) % 60)
				.toString()
				.padStart(2, '0');
			const secs = (time % 60).toString().padStart(2, '0');

			return `${mins}:${secs}`;
		}, [time]);
	};

	const formattedTime = useFormatTime(time);

	useEffect(() => {
		if (time === 0) {
			setStatus(prevStatus => {
				const newStatus = prevStatus === 'work' ? 'rest' : 'work';
				setTime(newStatus === 'work' ? 1200 : 20);
				return newStatus;
			});
		}
	}, [time]);

	const startTimer = () => {
		if (timer !== null) {
			clearInterval(timer);
		}
		setStatus('work');
		setTime(1200);
		setTimer(
			setInterval(() => {
				setTime(prevTime => {
					if (prevTime > 0) {
						return prevTime - 1;
					} else {
						return prevTime;
					}
				});
			}, 1000)
		);
	};

	return (
		<div>
			<h1>Protect your eyes</h1>
			<div className={status === 'off' ? 'show' : 'hide'}>
				<p>
					According to optometrists in order to save your eyes, you should
					follow the 20/20/20. It means you should to rest your eyes every 20
					minutes for 20 seconds by looking more than 20 feet away.
				</p>
				<p>
					This app will help you track your time and inform you when it's time
					to rest.
				</p>
			</div>
			<img
				src="./images/work.png"
				className={status === 'work' ? 'show' : 'hide'}
			/>
			<img
				src="./images/rest.png"
				className={status === 'rest' ? 'show' : 'hide'}
			/>
			<div className={`timer ${status !== 'off' ? 'show' : 'hide'}`}>
				{formattedTime}
			</div>
			<button
				className={`btn ${status === 'off' ? 'show' : 'hide'}`}
				onClick={startTimer}>
				Start
			</button>
			<button className={`btn ${status !== 'off' ? 'show' : 'hide'}`}>
				Stop
			</button>
			<button className="btn btn-close">X</button>
		</div>
	);
};

render(<App />, document.querySelector('#app'));
