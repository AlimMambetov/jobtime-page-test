import React, { useState, useEffect, useMemo } from 'react'
import cls from './style.module.scss'
import { motion, AnimatePresence } from 'framer-motion';
import { assetsSrc } from './config';
import { tariffs } from './tariffs';



// scripts
import { formatDateLong, timeAgo } from './scripts';
import { reviews } from './reviews';


// components
import CertBar from './CertBar';
import Card from './Card';
import Timer from './Timer';
import ReviewSlider from './ReviewSlider';


// ----------------






function APage() {
  const [activeReview, setActiveReview] = useState(0);
  const [planId, setPlanId] = useState(null);
  const [isPaying, setIsPaying] = useState(false);



  const handleGetMyPlan = async () => {

  };

  const sliderOps = {
    ...reviews[activeReview],
    setActiveReview,
    activeReview,
    reviewsLength: reviews.length,
  };



  const scrollToCard = () => {
    const element = document.getElementById('PRO');
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;

      const margin = window.innerWidth < 600 ? 220 : 220;
      const offsetPosition = elementPosition + window.pageYOffset - margin;

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
          <img src={`${assetsSrc}/main-logo.svg`} alt="logo" />

          <a href="/login">LOG IN</a>
        </div>
      </header>
      <div className={cls.head}>
        <div className={cls.head__line}>🎉 Personal discount — 50%</div>
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
          <h2 className={cls.title}>From No Response <span>to Dream Job</span></h2>
          <div className={cls.tariffs}>
            {tariffs.map((el, i) => <Card btnText={isPaying ? "Loading..." : el.btnText} disabled={isPaying || !planId} onClick={handleGetMyPlan} {...el} key={i} />)}
          </div>
          <p data-p="link">I agree to the <a href="/terms">Terms of Use</a>, <a href="/refund-policy">Refund Policy.</a></p>
          <p data-p="desc">We value our customers and recommend that you review the above documents. After payment, you will have access to all functions. <a target='_blank' href="https://jobtime.ai">jobtime.ai</a> This guarantees you a response to more than 3,000 vacancies (depending on the chosen tariff), selected specifically for you based on your resume and the answers you provided earlier. This data plan is a special offer for new customers and cannot be used more than once. Please upload only your resume and avoid complicated visual designs — this will allow us to extract the necessary information for the vacancy faster. After a month, the tariff plan is automatically extended for the full cost of the tariff, payment is made monthly. You can cancel at any time. After successful payment, we will also offer you opportunities to improve your resume and cover letter. Don't miss this opportunity!</p>
        </div>

        <div className={cls.reviews}>
          <img src={`${assetsSrc}/sec-bg.png`} alt="bg" />
          <h2 className={cls.reviews__title}>Reviews on {<img src={`${assetsSrc}/logo.svg`} alt='logo' />}</h2>
          <ReviewSlider {...sliderOps} />
        </div>
      </main>

      <footer className={cls.footer}>
        <img src={`${assetsSrc}/decor-line.png`} alt="decor" />
        <img src={`${assetsSrc}/main-logo.svg`} alt="logo" />
        <p>Your Career Assistant. Artificial intelligence-enabled tools and resources that help you get a job 10 times faster</p>
        <p>All Rights Reserved ©2024 JobTime <br /> <a href="mailto:hello@jobtime.ai" target='_blank'>hello@jobtime.ai</a></p>
      </footer>
    </div>
  </>)
}

export default APage
