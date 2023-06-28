import React from 'react';
import linkedin from '../images/linkedin.svg';
import instagram from '../images/instagram.svg';
import github from '../images/github.svg';
import whats from '../images/whats.svg';
import gmail from '../images/gmail.svg';
import '../style/App.css';

function Footer() {
  return (
    <div className="footer">
      <a href="https://www.linkedin.com/in/jaci-xavier/" target="_blank" rel="noreferrer">
        <img src={ linkedin } alt="" className="link-icon" />
      </a>
      <a href="https://instagram.com/dev_xvr?igshid=MzRlODBiNWFlZA==" target="_blank" rel="noreferrer">
        <img src={ instagram } alt="" className="link-icon" />
      </a>
      <a href="https://github.com/Jaci-Xavier" target="_blank" rel="noreferrer">
        <img src={ github } alt="" className="link-icon" />
      </a>
      <a href="https://api.whatsapp.com/send?phone=5555219788835" target="_blank" rel="noreferrer">
        <img src={ whats } alt="" className="link-icon" />
      </a>
      <a href="mailto:devxvr@gmail.com?subject=&body=" target="_blank" rel="noreferrer">
        <img src={ gmail } alt="" className="link-icon" />
      </a>
      <h4>© 2023 - Jaci Xavier</h4>
    </div>
  );
}

export default Footer;
