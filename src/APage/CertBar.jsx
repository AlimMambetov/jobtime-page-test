
import { assetsSrc } from './config';
import cls from './style.module.scss'


export const CertBar = ({ title = '', text = '' }) => {

	return (<>
		<div className={cls.certbar}>
			<img src={`${assetsSrc}/cert.svg`} />
			<h4>{title}</h4>
			<p>{text}</p>
		</div>
	</>)
}

export default CertBar;