import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';
import { WRAP, IS_ACTIVE } from './../utils/constants';
import logoBlogWhite from './../assets/images/logo-blog-white.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [active, setActive] = useState(false)
  const [rightValue, setRightValue] = useState('')

  useEffect(() => {
    const container = document.querySelector('.footer-container').getBoundingClientRect()
    window.addEventListener('scroll', () => {
      setRightValue(`${(window.screen.width - (container.width - 60)) / 2}px`)

      let position = window.pageYOffset
      if(350 < position > (container.bottom <= (window.innerHeight || document.documentElement.clientHeight))) {
        setActive(true)
      } else {
        setActive(false)
      }
    })
  }, [])

  const handleClick = (e) => {
    e.preventDefault();
    WRAP.scrollIntoView({
      behavior: 'smooth'
    }, 500)
  }

  return (
   <footer className="footer">
      <div className="l-container footer-container">
        <div className={`footer-back-top ${active ? IS_ACTIVE : ''}`} style={{right: (active && rightValue), bottom: (active && 25)}}>
          <Link to="/" onClick={(e) => handleClick(e)}>
            TOP
          </Link>
        </div>
        <div className="footer-logo">
          <Link to="/">
            <img src={logoBlogWhite} alt="Blog" />
          </Link>
        </div>
        <p className="footer-text">
          サンプルテキストサンプル ルテキストサンプルテキストサ
          <br />ンプルテキストサンプル ルテキスト
        </p>
      </div>
      <p className="footer-copyright">
        <small>Copyright©2007-{currentYear} Blog Inc.</small>
      </p>
   </footer>
  );
}

export default Footer;
