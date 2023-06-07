import React, { useRef, useState, useEffect } from "react";
import "./Symptoms.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
// import { calculateBloodTestResult } from "../../api/bloodTestUtils";
import { getUserData } from "../../api/getUserData";

const withAuthCheck = (WrappedComponent) => {
  return () => {
    const alertShownRef = useRef(false);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    if (loading) {
      return (
        <div className="placeholder-loading loading-margin">
        <div className="loading-container">
            <div className="loading-circle"></div>
        </div>
        <div className="loading-text">Loading...</div>
        </div>
      );
    }

    if (!user && !alertShownRef.current) {
      alertShownRef.current = true;
      alert("You need to log in to access this page.");
      navigate("/login");
      window.location.reload();
      return null;
    }

    const userData = getUserData(user.uid);
    return <WrappedComponent userData={userData} />;
  };
};

function Symptoms() {
  // const [user] = useAuthState(auth);
  // if (user) {
  //   getUserData(user.uid);
  // }
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setClick] = useState(false);
  const [mainResult, setMainResult] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  // const [labInput, setLabInput] = useState({
  //   wbc: "",
  //   mcv: "",
  //   rbc: "",
  //   mch: "",
  //   plt: "",
  //   mchc: "",
  //   hgb: "",
  //   dwbc: "",
  //   hct: "",
  //   rbcdw: "",
  // });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLabInput({ ...Symptoms, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/symptomsoutput');
    // Validation logic
    const isValid = validateInputs();

    if (isValid) {
      // Proceed with submitting the form
      const symptomsInputCollection = collection(db, "symptoms");
      const data = {
        createdBy: auth.currentUser.uid,
        createdAt: new Date(),
        symptomsInput: String(Symptoms.symptomsInput)
      };

      addDoc(symptomsInputCollection, data)
        .then((e) => {
          console.log("Document successfully written!");
          navigate(`/symptomsoutput/${e.id}`);
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      // Show error or validation message to the user
      alert("Please enter valid descriptions in the field.");
    }
  };


  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    setShowComponent(true)
  });
  return (
    <div
      className={`container-fluid bodylabinput ${showComponent ? "fade-in" : ""
        }`}
    >
      <div className="row prevbutton-div">
        <div className="col offset-1">
          <div id="maaargin">
            <button className="prevbuttons">Previous Result</button>
          </div>
        </div>
      </div>

      <div className="container square mt-5">
        <div id="paddingbox">
          <h1 className="texthead">Symptoms Analysis</h1>
          <h2 className="texthead">Differential Diagnosis</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="formcontainer">
            <div className="row">
            {/* <div className="col-6 col-md-3 margincol">
                input field 
            </div> */}
            <textarea
                name="symptoms"
                placeholder="How do you feel right now?"
                className="textarea"
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
          </div>
          <div className="row justify-content-center">
            <button type="submit" value="Submit" id="submit-btn">Submit</button>
          </div>
        </form>
      </div>

      <div id="buffer">.</div>
    </div >
  );
}

export default withAuthCheck(Symptoms);