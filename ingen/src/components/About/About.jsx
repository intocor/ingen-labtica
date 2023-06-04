import 'bootstrap/dist/css/bootstrap.min.css';
import { BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import './About.css';

function About() {
  return (
    <div>
      <div className="container-fluid footer2">
        <div className="row footer-firstelem">
          <div className="col-5 offset-1">
            <h2 className="technological display-2">Technological Integration In Clinical Assessments</h2>
          </div>
          <div className="col offset-0 offset-sm-1 d-flex justify-content-center justify-content-lg-start">
            <div className="row align-items-center" id="message-container">
              <div className="col-4 col-lg-6 ms-4">
                <input id="message-input" type="text" placeholder="Create a message" />
              </div>
              <div className="col ms-4">
                <button id="send-button">Send</button>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-10 col-sm-5 offset-1 footer2-1-info">
            <p>At Labtica, we pride ourselves on providing excellent customer service. Our team of knowledgeable and friendly representatives are always here to assist you with any questions or concerns you may have.</p>
            <p>If you need help using our platform or have any technical difficulties, please don't hesitate to reach out to us. You can contact us through email, phone, or by visiting our office during business hours. We are committed to ensuring your satisfaction with our service and are always striving to improve.</p>
            <p>Thank you for choosing Labtica for your CBC testing needs. We value your trust and look forward to providing you with the best possible service.</p>
          </div>
          <div className="col offset-1">
            <h3 className="contact-us">Contact us</h3>
            <div className="contact-info mt-4">
              <p>Email: info@labtica.com</p>
              <p>Phone: (+63) 93 0308-5413</p>
              <p>Address: 123 Quirino Avenue, Davao City, Philippines</p>
              <p className="contact-info-lastline">Feel free to reach out to us with any questions or concerns you may have. We look forward to hearing from you!</p>
            </div>

            <div className="row mt-5">
              <div className="col-12 text-start">
                <h3 className="socials">Socials</h3>
              </div>
              <div className="col-12 col-sm-4 mt-3">
                <div className="socials-info">
                  <div className="row">
                    <div className="col-4 col-md-6 col-sm-5 social-logos"><FaFacebook />
                    </div>
                    <div className="col-8 col-md-6 col-sm-7 align-self-center socialtext">facebook.com/Labtica
                    </div>


                    <div className="col-4 col-md-6 col-sm-5 social-logos"><BsTwitter />
                    </div>
                    <div className="col-8 col-md-6 col-sm-7 align-self-center socialtext">twitter.com/Labtica
                    </div>

                    <div className="col-4 col-md-6 col-sm-5 social-logos"><BsInstagram />
                    </div>
                    <div className="col-8 col-md-6 col-sm-7 align-self-center socialtext">instagram.com/Labtica
                    </div>

                    <div className="col-4 col-md-6 col-sm-5 social-logos"><BsLinkedin />
                    </div>
                    <div className="col-8 col-md-6 col-sm-7 align-self-center socialtext">linkedin.com/company/Labtica
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
      <div className="container">
        <p className="footer3-info text-center my-5">© 2023 CBI Group Company. All right reserved.</p>
      </div>
    </div >
  );
}

export default About;
