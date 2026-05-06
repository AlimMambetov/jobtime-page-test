import { useEffect, useState } from "react";

import cls from './style.module.scss'




export const Timer = ({ initialMinutes = 9, initialSeconds = 59, onExpire }) => {
	const [minutes, setMinutes] = useState(initialMinutes);
	const [seconds, setSeconds] = useState(initialSeconds);

	useEffect(() => {
		// Не запускаем таймер, если время уже истекло
		if (minutes === 0 && seconds === 0) {
			if (onExpire) onExpire();
			return;
		}

		const interval = setInterval(() => {
			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(interval);
					if (onExpire) onExpire();
				} else {
					setMinutes(minutes - 1);
					setSeconds(59);
				}
			} else {
				setSeconds(seconds - 1);
			}
		}, 1000);

		// Очищаем интервал при размонтировании компонента
		return () => clearInterval(interval);
	}, [minutes, seconds, onExpire]);

	// Форматируем числа (добавляем ведущий ноль)
	const formatNumber = (num) => String(num).padStart(2, '0');

	const minutesLeft = formatNumber(minutes);
	const secondsLeft = formatNumber(seconds);

	// Разбиваем на отдельные цифры для отображения
	const minutesFirstDigit = minutesLeft[0];
	const minutesSecondDigit = minutesLeft[1];
	const secondsFirstDigit = secondsLeft[0];
	const secondsSecondDigit = secondsLeft[1];

	return (
		<div className={cls.timer}>
			<div className={cls.timer__box}>
				<div className={cls.timer__num}>{minutesFirstDigit}</div>
				<div className={cls.timer__num}>{minutesSecondDigit}</div>
			</div>
			:
			<div className={cls.timer__box}>
				<div className={cls.timer__num}>{secondsFirstDigit}</div>
				<div className={cls.timer__num}>{secondsSecondDigit}</div>
			</div>
		</div>
	);
};


export default Timer