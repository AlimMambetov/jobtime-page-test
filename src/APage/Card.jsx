
import cls from './style.module.scss'
import { assetsSrc } from './config';

export const Card = ({ head, title, text, oldMonthPrice, monthPrice, months = 1, price, oldPrice, days = 3, list = [], btnText = 'Get My Plan', foot, onClick, disabled }) => {

	const monthsActive = months > 1;

	return (<>
		<div id={title} data-name={title} className={cls.card}>
			{head && <div className={cls.card__head}>{head}</div>}
			<div className={cls.card__text}>
				<h3>{title}</h3>
				<p>{text}</p>
				<div className={cls.card__month}>
					<span>${oldMonthPrice}{monthsActive ? <>/{months} months</> : ' total'} </span>
					<img width={20} src={`${assetsSrc}/arrow.svg`} alt="arrow" />
					<b>${monthPrice}/{monthsActive ? <>{months} months</> : ' month'}</b>
				</div>
				<div className={cls.card__price}>
					{oldPrice && <span data-price='old'>$ {oldPrice}</span>}
					<span data-price='main' >$ {price}</span>
					<span data-price='days'>{days}</span>
				</div>
			</div>
			<div className={cls.card__box}>
				<ul className={cls.card__list}>
					{list.map((item, i) => <li key={i}>{item}</li>)}
				</ul>
			</div>
			<div className={cls.card__btns}>
				<button className={cls.card__btn} onClick={onClick} disabled={disabled}>{btnText}</button>
			</div>
			<div className={cls.card__foot}>{foot}</div>
		</div>
	</>)
}

export default Card;