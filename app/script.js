import React, { useState, useMemo, useEffect } from 'react';
import { render } from 'react-dom';
import Button from './components/Button/Button';

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
		if (time === 0 && status === 'work') {
			playBell();
			setTime(20);
			setStatus('rest');
		} else if (time === 0 && status === 'rest') {
			playBell();
			setTime(1200);
			setStatus('work');
		}
	}, [time]);

	const startTimer = () => {
		setTime(1200);
		setStatus('work');
		setTimer(
			setInterval(() => {
				setTime(time => time - 1);
			}, 1000)
		);
	};

	const stopTimer = () => {
		setTimer(clearInterval(timer));
		setTime(0);
		setStatus('off');
	};

	const playBell = () => {
		const bellSong = new Audio('sounds/bell.wav');
		bellSong.play();
	};

	const closeApp = () => {
		window.close();
	};

	return (
		<div className="app">
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
			<Button
				clickAction={startTimer}
				className={`btn ${status === 'off' ? 'show' : 'hide'}`}>
				Start
			</Button>
			<Button
				clickAction={stopTimer}
				className={`btn ${status === 'off' ? 'hide' : 'show'}`}>
				Stop
			</Button>
			<Button clickAction={closeApp} className={'btn btn-close'}>
				X
			</Button>
		</div>
	);
};

render(<App />, document.querySelector('#app'));
