import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import "../Navigation/Navigation.css";
import "../Footer/Footer.css";
const Footer = () => {
  return (
    
      <div className="footerWrap">
        <div className="footer">
          <footer className="footer-distributed">
            <div className="footer-right">
              <a href="#">
                <FacebookIcon/>
              </a>
              <a href="#">
              <InstagramIcon/>
              </a>
              <a href="#">
              <LinkedInIcon/>
              </a>
              <a href="#">
              <GitHubIcon/>
              </a>
            </div>

            
              <p>Montreale by Anastasiia Lysenko &copy; 2022</p>
            
           </footer>
        </div>
      </div>
  );
};

export default Footer;
