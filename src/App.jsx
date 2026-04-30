import React, { useState } from 'react'
import cls from './app.module.scss'
import { motion, AnimatePresence } from 'framer-motion';

const reviews = [
  {
    id: 1,
    avatar: '/a-page/avatar1.png',
    stars: 5,
    name: "Sarah Johnson",
    job: "Frontend Developer, Austin",
    date: Date.now() - 1000 * 60 * 60 * 24 * 2,
    title: "Landed my dream job in under 2 weeks",
    review: "I've tried every job board out there, but this one is different. The matching algorithm actually understands my tech stack and preferences. I got 3 interview requests within the first 48 hours. Just signed an offer with a 50% salary increase. The application process is seamless — honestly a game changer for serious job seekers.",
  },
  {
    id: 2,
    avatar: '/a-page/avatar2.png',
    stars: 5,
    name: "Michael Chen",
    job: "Product Manager, Remote",
    date: Date.now() - 1000 * 60 * 60 * 12,
    title: "Transparent salary info changed everything",
    review: "What I love most is that every job posting shows the actual salary range upfront. No more wasting time on vague descriptions or 'competitive pay' nonsense. I also appreciate the company reviews from real employees. Found my current role in less than a month and couldn't be happier with the culture fit.",
  },
  {
    id: 3,
    avatar: '/a-page/avatar3.png',
    stars: 4,
    name: "Jessica Williams",
    job: "UX/UI Designer, New York",
    date: Date.now() - 1000 * 60 * 60 * 48,
    title: "Great platform, especially for remote jobs",
    review: "The remote job filter is the best I've seen — you can filter by timezone overlap and async-friendly companies. I received personalized recommendations that actually matched my design portfolio. The only small downside is that some listings get filled quickly, but that's because the platform works. Highly recommended!",
  },
  {
    id: 4,
    avatar: '/a-page/avatar4.png',
    stars: 5,
    name: "David Rodriguez",
    job: "DevOps Engineer, Seattle",
    date: Date.now() - 1000 * 60 * 60 * 168,
    title: "Recruiters reached out to me first",
    review: "I just uploaded my resume and set my status to 'open to work' — within hours, legitimate recruiters started messaging me. No spam, just relevant opportunities. The skill verification badges helped me stand out. After 2 weeks of interviews, I accepted an offer that exceeded my expectations. Worth every minute I spent setting up my profile.",
  },
  {
    id: 5,
    avatar: '/a-page/avatar5.png',
    stars: 5,
    name: "Emily Foster",
    job: "Marketing Director, Chicago",
    date: Date.now() - 1000 * 60 * 60 * 3,
    title: "Finally found a job that respects work-life balance",
    review: "The culture fit quiz was surprisingly accurate. It matched me with companies that value flexibility and mental health — something other platforms ignore. I also used the salary comparison tool to negotiate a better offer. This isn't just another job board; it's a career companion. Thank you to the team behind this!",
  },
];


function timeAgo(dateInput) {
  const date = new Date(dateInput);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  // Проверка на будущую дату
  if (seconds < 0) {
    return 'in the future';
  }

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      // Склонение для английского (можно заменить на русский ниже)
      if (count === 1) {
        return `1 ${interval.label} ago`;
      } else {
        return `${count} ${interval.label}s ago`;
      }
    }
  }

  return 'just now';
}

function formatDateLong(dateInput) {
  const date = new Date(dateInput);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}


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
          <img src="/a-page/arr-L.svg" alt="Previous" />
        </motion.button>
        <motion.button
          data-arr="next"
          onClick={handleNext}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <img src="/a-page/arr-R.svg" alt="Next" />
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
                    <img src='/a-page/star.svg' alt="star" />
                  </motion.div>
                ))}
              </div>
              <motion.div
                className={cls.slider__invite}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              >
                <img src="/a-page/cursor.svg" alt="cursor" />
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


const Timer = ({ initialMinutes = 9, initialSeconds = 59, onExpire }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  React.useEffect(() => {
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


const Card = ({ head, title, text, price, oldPrice, days = 3, list = [], btnText = 'Get My Plan', foot }) => {


  return (<>
    <div id='card' className={cls.card}>
      <div className={cls.card__head}>{head}</div>
      <div className={cls.card__text}>
        <h3>{title}</h3>
        <p>{text}</p>
        <div className={cls.card__price}>
          {oldPrice && <span data-price='old'>$ {oldPrice}</span>}
          <span data-price='main' >$ {price}</span>
          <span data-price='days'>for {days} days</span>
        </div>
      </div>
      <div className={cls.card__box}>
        <ul className={cls.card__list}>
          {list.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
      <div className={cls.card__btns}>
        <button className={cls.card__btn}>{btnText}</button>
      </div>
      <div className={cls.card__foot}>{foot}</div>
    </div>
  </>)
}

const CertBar = ({ title = '', text = '' }) => {

  return (<>
    <div className={cls.certbar}>
      <img src="/a-page/cert.svg" />
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  </>)
}


function App() {
  const [activeReview, setActiveReview] = useState(0);

  const sliderOps = {
    ...reviews[activeReview],
    setActiveReview,
    activeReview,
    reviewsLength: reviews.length,
  };

  const cardOps = {
    head: '90% off',
    title: 'PRO Plan',
    text: "GET HIRED 2X FASTER",
    price: 5,
    oldPrice: '49.99',
    days: 3,
    list: [
      "Apply up to 100 jobs/day",
      "Let advanced Al connect you with the best job opportunities"
    ],
    btnText: "Get My Plan",
    foot: "Powered by chatGPT 5.2"
  }


  const scrollToCard = () => {
    const element = document.getElementById('card');
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 200;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };


  return (<>
    <div className={cls.wrap}>
      <header className={cls.header}>
        <div className={cls.header__content}>
          <img src="/a-page/main-logo.svg" alt="logo" />

          <a href="#">LOG IN</a>
        </div>
      </header>
      <div className={cls.head}>
        <div className={cls.head__line}>🎉 Personal discount — 90%</div>
        <div className={cls.head__content}>
          <div className={cls.head__timer}>
            <p>Discount expires in</p>
            <Timer />
            <span>min : sec</span>
          </div>
          <button onClick={scrollToCard} className={cls.btn}>Get My Plan</button>
        </div>
        <div className={cls.head__lock}>🔒 save & secure • Powered by <span>stripe</span></div>
      </div>
      <main className={cls.main}>
        <div className={cls.content}>
          <CertBar title="Money-Back Guarantee" text="We commit to your career success. If you don't land an interview within 15 days, you get your money back." />
          <h2 className={cls.title}>Try PRO Plan and <span>apply up to 300 jobs daily</span></h2>
          <Card {...cardOps} />
          <p data-p="link">I agree to the <a href="#">Terms of Use</a>, <a href="#">Refund Policy.</a></p>
          <p data-p="desc">We value our customers and encourage you to review the documents above. Within 3 days, you’ll gain access to the full functionality of <a target='_blank' href="https://jobtime.ai">jobtime.ai</a>, which guarantees you responses to 300 job openings selected specifically for you based on your resume and the answers you provided earlier. This plan is a special offer for new customers and cannot be used more than once. Please upload only your own resume and avoid complex visual designs—this will allow us to extract the necessary information for the job more quickly. After 3 days, the plan auto-renews at $49.99, billed monthly. Cancel anytime. After successful payment, we will also offer you opportunities to improve your resume and cover letters. Don’t miss this opportunity.</p>
        </div>

        <div className={cls.reviews}>
          <img src="/a-page/sec-bg.png" alt="bg" />
          <h2 className={cls.reviews__title}>Reviews on {<img src='/a-page/logo.svg' alt='logo' />}</h2>
          <ReviewSlider {...sliderOps} />
        </div>
      </main>

      <footer className={cls.footer}>
        <img src="/a-page/decor-line.png" alt="decor" />
        <img src="/a-page/main-logo.svg" alt="logo" />
        <p>Your Career Assistant. Artificial intelligence-enabled tools and resources that help you get a job 10 times faster</p>
        <p>All Rights Reserved ©2024 JobTime <br /> <a href="mailto:support@jobtime.ai" target='_blank'>support@jobtime.ai</a></p>
      </footer>
    </div>
  </>)
}

export default App
