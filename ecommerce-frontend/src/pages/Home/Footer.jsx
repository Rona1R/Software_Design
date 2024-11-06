import React, { useState } from "react";
import "./Footer.css";
import { useEffect } from "react";
import axios from "axios";

const Footer = () => {
  const [biznesi,setBiznesi] = useState([]);
  // const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async ()=>
    { 
          try {
            const response = await axios
              .get(
                "https://localhost:7061/api/TeDhenatBiznesit/getTeDhenat"
              )
              // .then((response) => {
              setBiznesi(response.data);
             
              // });
          } catch (err) {
            console.log(err);
          }
    }

    fetchData();
  }, []);

  return (
    <div>
      <footer>
       <div className="footerHomePage">
          <div className="footerContainer">
            <div className="footerSection">
              <div className="socialMedia">
                <a
                  href={biznesi.facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    Facebook
                  </span>
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a
                  href={biznesi.twitterLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    Twitter
                  </span>
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a
                  href={biznesi.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                   Instagram
                  </span>
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  href={biznesi.linkedInLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                 <span>
                  LinkedIn
                 </span>
                <i className="fa-brands fa-linkedin"></i>
                </a>
              </div>
            </div>

            <div className="footerSection">
              {/* <div>

                
              </div> */}
              <div className="links">
                <h2>Quick Links</h2>
                <ul>
                  <li>
                    <a href="/">About Us</a>
                  </li>
                  <li>
                    <a href="/">Contact Us</a>
                  </li>
                  <li>
                    <a href="/Products/OnSale">Shop on Sale</a>
                  </li>
                  <li>
                    <a href="/">Company Policy</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footerSection">
              <div className="footer-kontakti">         
                <h2>Contact Information</h2>
                <ul>
                  <li>
                    Email:{" "}
                    <a href="mailto:support@example.com">{biznesi.emailBiznesit}</a>
                  </li>
                  <li>+{biznesi.nrKontaktues}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footerBottom">
            <p>
              &copy; {new Date().getFullYear()} {biznesi.emriBiznesit}. All rights
              reserved.
            </p>
          </div>
       </div>
      </footer>
    </div>
  );
};

export default Footer;
