import { formatDateLong, timeAgo } from './scripts';
import cls from './style.module.scss'
import { motion, AnimatePresence } from 'framer-motion';
import { assetsSrc } from './config';


export
	const ReviewSlider = ({
		avatar,
		date,
		name,
		job,
		stars = 5,
		title,
		review,
		setActiveReview,
		activeReview,
		reviewsLength
	}) => {
		const arrStars = Array.from({ length: 5 }, (_, i) => i + 1);

		const handlePrev = () => {
			setActiveReview((prev) => (prev === 0 ? reviewsLength - 1 : prev - 1));
		};

		const handleNext = () => {
			setActiveReview((prev) => (prev === reviewsLength - 1 ? 0 : prev + 1));
		};

		// Анимации для контента
		const slideVariants = {
			enter: (direction) => ({
				opacity: 0
			}),
			center: {
				x: 0,
				opacity: 1
			},
			exit: (direction) => ({
				opacity: 0
			})
		};

		// Анимация для звезд
		const starVariants = {
			hidden: { scale: 0, rotate: -180 },
			visible: (i) => ({
				scale: 1,
				rotate: 0,
				transition: {
					delay: i * 0.05,
					type: "spring",
					stiffness: 260,
					damping: 20
				}
			})
		};

		// Анимация для кнопок
		const buttonVariants = {
			hover: { scale: 1.1 },
			tap: { scale: 0.95 }
		};

		return (
			<div className={cls.slider}>
				<div className={cls.slider__controlls}>
					<motion.button
						data-arr="prev"
						onClick={handlePrev}
						variants={buttonVariants}
						whileHover="hover"
						whileTap="tap"
					>
						<img src={`${assetsSrc}/arr-L.svg`} alt="Previous" />
					</motion.button>
					<motion.button
						data-arr="next"
						onClick={handleNext}
						variants={buttonVariants}
						whileHover="hover"
						whileTap="tap"
					>
						<img src={`${assetsSrc}/arr-R.svg`} alt="Next" />
					</motion.button>
				</div>

				<div className={cls.slider__wrap}>
					<AnimatePresence mode="wait" custom={activeReview}>
						<motion.div
							key={activeReview}
							custom={activeReview}
							variants={slideVariants}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{
								x: { type: "spring", stiffness: 300, damping: 30 },
								opacity: { duration: 0.2 }
							}}
							className={cls.slider__wrap}
						>
							<div className={cls.slider__head}>
								<motion.img
									src={avatar}
									alt="avatar"
									initial={{ scale: 0, rotate: -180 }}
									animate={{ scale: 1, rotate: 0 }}
									transition={{ type: "spring", stiffness: 260, damping: 20 }}
								/>
								<motion.h4
									initial={{ x: -50, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ delay: 0.1 }}
									data-r="name"
								>
									{name}
								</motion.h4>
								<motion.p
									initial={{ x: -50, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ delay: 0.2 }}
									data-r="job"
								>
									{job}
								</motion.p>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.3 }}
									data-r="date"
								>
									{timeAgo(date)}
								</motion.div>
							</div>
							<div className={cls.slider__box}>
								<div className={cls.slider__stars}>
									{arrStars.map(el => (
										<motion.div
											data-star
											key={el}
											data-active={el <= stars ? true : null}
											custom={el}
											variants={starVariants}
											initial="hidden"
											animate="visible"
										>
											<img src={`${assetsSrc}/star.svg`} alt="star" />
										</motion.div>
									))}
								</div>
								<motion.div
									className={cls.slider__invite}
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
								>
									<img src={`${assetsSrc}/cursor.svg`} alt="cursor" />
									Invited
								</motion.div>
							</div>

							<div className={cls.slider__content}>
								<motion.h5
									className={cls.slider__title}
									initial={{ y: 30, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.2 }}
								>
									{title}
								</motion.h5>
								<motion.p
									className={cls.slider__review}
									initial={{ y: 30, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.3 }}
								>
									{review}
								</motion.p>
							</div>

							<motion.div
								className={cls.slider__date}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
							>
								{formatDateLong(date)}
							</motion.div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		);
	};


export default ReviewSlider