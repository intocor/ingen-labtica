import React, { useState } from 'react';
import './LandingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillCheckCircle } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { auth } from "../../Firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

function LandingPage() {
  const [backgroundImage, setBackgroundImage] = useState('background-1');
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleRightClick = () => {
    if (backgroundImage === 'background-1') {
      setBackgroundImage('background-2');
    } else if (backgroundImage === 'background-2') {
      setBackgroundImage('background-3');
    } else if (backgroundImage === 'background-3') {
      setBackgroundImage('background-1');
    }
  };

  const handleLeftClick = () => {
    if (backgroundImage === 'background-3') {
      setBackgroundImage('background-2');
    } else if (backgroundImage === 'background-2') {
      setBackgroundImage('background-1');
    } else if (backgroundImage === 'background-1') {
      setBackgroundImage('background-3');
    }
  };

  return (
    <div>
      <div className={`container-fluid background fade-in ${backgroundImage}`}>
        <div className="info row">
          <div className="col-1 mx-4 arrow-button align-self-center" onClick={handleLeftClick}>
            <IoIosArrowDropleftCircle />
          </div>

          <div className="col-7 col-md-6 col-lg-4 offset-1 offset-md-0">
            <h1 className="title mb-5">Technological Integration<br />In Clinical Assessments</h1>
            <p className="infoLabtica">Labtica offers fast and accurate testing of your Complete Blood Count (CBC) results. Simply upload your CBC report and provide your personal information to receive valuable insights into your health status. Our platform is secure and easy to use, ensuring your privacy and confidentiality. Try Labtica today for reliable CBC testing!</p>
          </div>

          <div className="col-1 ms-auto me-5 me-sm-4 arrow-button align-self-center text-end" onClick={handleRightClick}>
            <IoIosArrowDroprightCircle />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-2 col-md-1 me-5"></div>
          <div className="col">
            <button className="start-button border border-0" onClick={(
              () => {
                if (user) {
                  navigate('/labinput');
                } else {
                  navigate('/login');
                }
              }
            )}>
              <p className="start-text">Get started</p>
            </button>
          </div>
        </div>

        <div className="row footer-margin justify-content-center">

          <div className="col-1"></div>
          <div className="col footer mt-5">

            <div className="row h-100 align-items-center">
              <div className="footer-heading col offset-2">

                <div className="checkwords">
                  <AiFillCheckCircle />
                  Reliable
                </div>
              </div>

              <div className="footer-heading col">
                <AiFillCheckCircle />
                Fast
              </div>

              <div className="footer-heading col">
                <AiFillCheckCircle />
                Accurate
              </div>

              <div className="footer-heading col">
                <AiFillCheckCircle />
                Personalized
              </div>

              <div className="col-1"></div>
            </div>
          </div>
          <div className="col-1"></div>
        </div>

      </div>


      <div className="container-fluid">

        <div className="row footer-bottom justify-content-center">

          <div className="col-1"></div>
          <div className="col footer mt-5">

            <div className="row h-100 align-items-center">
              <div className="footer-heading col offset-2">
                <AiFillCheckCircle className="check me-2" />
                Reliable
              </div>

              <div className="footer-heading col">
                <AiFillCheckCircle className="check me-2" />
                Fast
              </div>

              <div className="footer-heading col">
                <AiFillCheckCircle className="check me-2" />
                Accurate
              </div>

              <div className="footer-heading col">
                <AiFillCheckCircle className="check me-2" />
                Personalized
              </div>

              <div className="col-1"></div>
            </div>
          </div>
          <div className="col-1"></div>
        </div>

        <div className="about-cbc mt-5">
          <h2 className="display-1 fw-bold">About CBC</h2>
          <p>Learn about CBC</p>
        </div>

        <div className="row mb-5 justify-content-center cbcmarginrow">

          <div className="col-12 col-md-5 new-element cbcmargincol">
            <div className="row center-images">
              <div className="col col-md-4 ms-3 me-5 my-3 image-container">
                <img src="./1.png" className="img-fluid rounded-5 manypics" alt="red blood cell"></img>
              </div>
              <div className="col-8 col-md-6">
                <div className="col offset-md-1 offset-0 mt-5 fw-bold">
                  Red Blood Cell
                </div>
                <div className="col-9 col-md-11 offset-md-1 mt-5">
                  <p className="cbc-texts">This measures the number of red blood cells in a given volume of blood. It is used to evaluate the body's oxygen-carrying capacity and to diagnose anemia and other blood disorders.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-5 ms-0 ms-md-5 new-element2 cbcmargincol">
            <div className="row center-images">
              <div className="col col-md-4 ms-3 me-5 my-3 image-container">
                <img src="./2.png" className="img-fluid rounded-5 manypics" alt="white blood cell"></img>
              </div>
              <div className="col-8 col-md-6">
                <div className="col offset-md-1 mt-5 fw-bold">
                  White Blood Cell
                </div>
                <div className="col-9 col-md-11 offset-md-1 mt-5">
                  <p className="cbc-texts">This measures the amount of hemoglobin in a given volume of blood. It is used to diagnose anemia and to monitor treatment for it.</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="row mb-5 justify-content-center cbcmarginrow">

          <div className="col-12 col-md-5 new-element2 cbcmargincol">
            <div className="row center-images">
              <div className="col col-md-4 ms-3 me-5 my-3 image-container">
                <img src="./3.png" className="img-fluid rounded-5 manypics" alt="hemoglobin level"></img>
              </div>
              <div className="col-8 col-md-6">
                <div className="col offset-md-1 mt-5 fw-bold">
                  Hemoglobin Level
                </div>
                <div className="col-9 col-md-11 offset-md-1 mt-5">
                  <p className="cbc-texts">This measures the amount of hemoglobin in a given volume of blood. It is used to diagnose anemia and to monitor treatment for it.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-5 ms-0 ms-md-5 new-element cbcmargincol">
            <div className="row center-images">
              <div className="col col-md-4 ms-3 me-5 my-3 image-container">
                <img src="./4.png" className="img-fluid rounded-5 manypics" alt="white blood cell"></img>
              </div>
              <div className="col-8 col-md-6">
                <div className="col offset-md-1 mt-5 fw-bold">
                  Hematocrit Level
                </div>
                <div className="col-9 col-md-11 offset-md-1 mt-5">
                  <p className="cbc-texts">This measures the percentage of red blood cells in a given volume of blood. It is used to evaluate the body's oxygen-carrying capacity and to diagnose anemia and other blood disorders.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-5 justify-content-center cbcmarginrow">

          <div className="col-12 col-md-5 new-element cbcmargincol">
            <div className="row center-images">
              <div className="col col-md-4 ms-3 me-5 my-3 image-container">
                <img src="./5.png" className="img-fluid rounded-5 manypics" alt="hemoglobin level"></img>
              </div>
              <div className="col-8 col-md-6">
                <div className="col offset-md-1 offset-0 mt-5 fw-bold">
                  Platelet count
                </div>
                <div className="col-9 col-md-11 offset-md-1 mt-5">
                  <p className="cbc-texts">This measures the number of platelets in a given volume of blood. It is used to diagnose bleeding disorders and to monitor treatment with blood-thinning medications.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-5 ms-0 ms-md-5 new-element2 cbcmargincol">
            <div className="row center-images">
              <div className="col col-md-4 ms-3 me-5 my-3 image-container">
                <img src="./6.png" className="img-fluid rounded-5 manypics" alt="white blood cell"></img>
              </div>
              <div className="col-8 col-md-6">
                <div className="col offset-md-1 mt-5 fw-bold">
                  Mean Corpuscular Hemoglobin Concentration
                </div>
                <div className="col-9 col-md-11 offset-md-1 mt-5">
                  <p className="cbc-texts">This measures the concentration of hemoglobin in each red blood cell. It is used to diagnose different types of anemia.</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="row mb-5 justify-content-center cbcmarginrow">

          <div className="col-12 col-md-5 new-element2 cbcmargincol">
            <div className="row center-images">
              <div className="col col-md-4 ms-3 me-5 my-3 image-container">
                <img src="./7.png" className="img-fluid rounded-5 manypics" alt="hemoglobin level"></img>
              </div>
              <div className="col-8 col-md-6">
                <div className="col offset-md-1 offset-0 mt-5 fw-bold">
                  Mean Corpuscular Volume (MCV)
                </div>
                <div className="col-9 col-md-11 offset-md-1 mt-5">
                  <p className="cbc-texts">This measures the average size of red blood cells. It is used to diagnose different types of anemia.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-5 ms-0 ms-md-5 new-element cbcmargincol">
            <div className="row center-images">
              <div className="col col-md-4 ms-3 me-5 my-3 image-container">
                <img src="./8.png" className="img-fluid rounded-5 manypics" alt="white blood cell"></img>
              </div>
              <div className="col-8 col-md-6">
                <div className="col offset-md-1 mt-5 fw-bold">
                  Mean Corpuscular Hemoglobin (MCH)
                </div>
                <div className="col-9 col-md-11 offset-md-1 mt-5">
                  <p className="cbc-texts">This measures the average amount of hemoglobin in each red blood cell. It is used to diagnose different types of anemia.</p>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="row mb-5 justify-content-center cbcmarginrow">

          <div className="col-12 col-md-5 new-element2 cbcmargincol">
            <div className="row center-images">
              <div className="col col-md-4 ms-3 me-5 my-3 image-container">
                <img src="./9.png" className="img-fluid rounded-5 manypics" alt="hemoglobin level"></img>
              </div>
              <div className="col-8 col-md-6">
                <div className="col offset-md-1 offset-0 mt-5 fw-bold">
                  Differential White Blood Cell Count
                </div>
                <div className="col-9 col-md-11 offset-md-1 mt-5">
                  <p className="cbc-texts">This measures the percentage of different types of white blood cells in a given volume of blood. It is used to diagnose infections, inflammatory conditions, and blood disorders.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-5 ms-0 ms-md-5 new-element cbcmargincol">
            <div className="row center-images">
              <div className="col col-md-4 ms-3 me-5 my-3 image-container">
                <img src="./10.png" className="img-fluid rounded-5 manypics" alt="white blood cell"></img>
              </div>
              <div className="col-8 col-md-6">
                <div className="col offset-md-1 mt-5 fw-bold">
                  Red Blood Cell Distribution Width
                </div>
                <div className="col-9 col-md-11 offset-md-1 mt-5">
                  <p className="cbc-texts">This measures the variation in size of red blood cells. It is used to diagnose different types of anemia.</p>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>


      <div id="footer" className="container-fluid footer2">
        {/* <div className="row footer-firstelem">
          <div className="col-5 offset-1">
            <h2 className="technological display-2">Technological Integration In Clinical Assessments</h2>
          </div>
          <div className="col offset-1">
            <div className="row message-container align-items-center">
              <div className="col-6 ms-4">
                <input className="message-input" type="text" placeholder="Create a message" />
              </div>
              <div className="col ms-4">
                <button className="send-button">Send</button>
              </div>
            </div>
          </div>
        </div> */}

        <div className="row align-items-center w-100">

          {/* <div className="col-12">
                <h3 className="language">Language</h3>
              </div>
              <div className="col-12 invisible">_</div>
              <div className="col offset-4">
                <select className="language-dropdown form-select">
                  <option value="en">EN</option>
                  <option value="fr">FR</option>
                  <option value="es">ES</option>
                </select>
              </div> */}
          <div className="col">
            <img src="./logonobg.png" className="img-fluid" id="logo"></img>
          </div>

          <div className="col mt-5 footercontents">
            <div className="row">
              <div className="col-8 col-sm-12">
                <h3 className="socials">Socials</h3>
              </div>
              <div className="col-8 col-md-5 offset-1 offset-sm-4 offset-lg-5">
                <div className="socials-info">
                  <div className="row">
                    <div className="col-4 col-md-3 col-sm-2 social-logos"><FaFacebook />
                    </div>
                    <div className="col-6 col-md-7 col-sm-8 align-self-center socialtext">facebook.com/Labtica
                    </div>
                    <div className="col-2"></div>


                    <div className="col-4 col-md-3 col-sm-2 social-logos"><BsTwitter />
                    </div>
                    <div className="col-5 col-md-6 col-sm-7 align-self-center socialtext">twitter.com/Labtica
                    </div>
                    <div className="col-3"></div>

                    <div className="col-4 col-md-3 col-sm-2 social-logos"><BsInstagram />
                    </div>
                    <div className="col-6 col-md-7 col-sm-8 align-self-center socialtext">instagram.com/Labtica
                    </div>
                    <div className="col-2"></div>

                    <div className="col-4 col-md-3 col-sm-2 social-logos"><BsLinkedin />
                    </div>
                    <div className="col-8 col-md-7 col-sm-8 align-self-center" id="linkedin">linkedin.com/company/Labtica
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <p className="footer3-info text-center my-5">© 2023 CBI Group Company. All right reserved.</p>
      </div>
    </div >
  );
}

export default LandingPage;
