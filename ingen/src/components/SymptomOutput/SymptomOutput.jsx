import React, { useRef, useState, useEffect } from "react";
import "./SymptomOutput.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import { calculateBloodTestResult } from "../../api/bloodTestUtils";
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

function SymptomOutput() {
  // const [user] = useAuthState(auth);
  // if (user) {
  //   getUserData(user.uid);
  // }
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setClick] = useState(false);
  const [resultData, setresultData] = useState([]);
  const [mainResult, setMainResult] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [labInput, setLabInput] = useState({
    wbc: "",
    mcv: "",
    rbc: "",
    mch: "",
    plt: "",
    mchc: "",
    hgb: "",
    dwbc: "",
    hct: "",
    rbcdw: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLabInput({ ...labInput, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation logic
    const isValid = validateInputs();

    if (isValid) {
      // Proceed with submitting the form
      const labInputCollection = collection(db, "labInput");
      const data = {
        createdBy: auth.currentUser.uid,
        createdAt: new Date(),
        wbc: parseFloat(labInput.wbc),
        mcv: parseFloat(labInput.mcv),
        rbc: parseFloat(labInput.rbc),
        mch: parseFloat(labInput.mch),
        plt: parseFloat(labInput.plt),
        mchc: parseFloat(labInput.mchc),
        hgb: parseFloat(labInput.hgb),
        dwbc: parseFloat(labInput.dwbc),
        hct: parseFloat(labInput.hct),
        rbcdw: parseFloat(labInput.rbcdw),
      };

      const result = calculateBloodTestResult(data);
      console.log(result);

      addDoc(labInputCollection, data)
        .then((e) => {
          console.log("Document successfully written!");
          navigate(`/symptoms/${e.id}`);
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      // Show error or validation message to the user
      alert("Please enter valid numbers in all fields.");
    }
  };

  const handlePrevResultClick = () => {

    if (resultData.length === 0) {
      alert("No previous results found.");
      return;
    }
    
    const latestResult = resultData[resultData.length - 1];
    setLabInput({
      wbc: latestResult.wbc,
      mcv: latestResult.mcv,
      rbc: latestResult.rbc,
      mch: latestResult.mch,
      plt: latestResult.plt,
      mchc: latestResult.mchc,
      hgb: latestResult.hgb,
      dwbc: latestResult.dwbc,
      hct: latestResult.hct,
      rbcdw: latestResult.rbcdw,
    });

    if (latestResult){
      navigate(`/laboutput/${latestResult.id}`);
    }
  };

  const validateInputs = () => {
    for (const key in symptoms) {
      const value = symptoms[key];
      if (value.trim() === '') {
        return false; // Invalid input, empty string
      }
    }
    return true; // All inputs are non-empty strings
  };  

  const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
      async function fetchData() {
          const filteredResult = collection(db, 'labInput');
          const q = await getDocs(filteredResult);
          const newData = q.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
          }
          ));
          const result = newData.filter((e) => {
              return e.createdBy === user.uid;
          })
          setresultData(result);
          const mResult = newData.filter((e) => {
              return e.id === params.resultid;
          })
          const res = { ...calculateBloodTestResult(mResult[0]) };
          const { wbc, mcv, rbc, mch, plt, mchc, hgb, dwbc, hct, rbcdw, createdAt } = res;
          const dte = createdAt.toDate().toLocaleString();
          setMainResult({ wbc, mcv, rbc, mch, plt, mchc, hgb, dwbc, hct, rbcdw, createdDate: dte });
          setIsLoading(false);
      }

      user ? fetchData() : null;
      console.log('GUMANAAA', resultData);
      setShowComponent(true);
  }, [user, params.resultid]);

  return (
    <div
      className={`container-fluid bodylabinput ${showComponent ? "fade-in" : ""
        }`}
    >
      <div className="row prevbutton-div">
        <div className="col offset-1">
          <div id="maaargin">
            <button className="prevbuttons" onClick={handlePrevResultClick}>Previous Result</button>
          </div>
        </div>
      </div>

      <div className="container squaresymp mt-5">
        <div id="paddingbox">
          <h1 className="texthead">Symptoms Analysis</h1>
          <h2 className="texthead">Differential Diagnosis</h2>
        </div>

        {/* <form onSubmit={handleSubmit}>
          <div className="formcontainer">
            <div className="row">
             <div className="col-6 col-md-3 margincol">
                input field 
            </div> 
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
        </form> */}
        <div className="innersquare">
          <h1>Symptoms Summary</h1>
          <p className="typing-text"> The patient is a 18 year old woman, presenting to the emergency room with a sudden onset high fever of 40 Degree Celsius. <br/> She is experiencing intense headache located behind the eyes and the temple. The patient is experiencing mild bleeding from her nose, gums, and eyes.  <br/> The pain behind the eyes worsens with eye movement. The patient is also complaining of severe muscle and joint pain with a rash that spreads from  <br/> the arms, legs, torso, and back. Sustained nausea and vomiting has been observed for the past 4 days. It is also observed that her lymph nodes  <br/> in the neck and groin area are swollen. <span className="typing-cursor"></span></p>
          <h1> Differential Diagnosis</h1>
          <p className="typing-text">1. <b>Dengue fever</b>: This viral infection is transmitted by mosquitoes and can cause high fever, severe headache (especially behind the eyes), joint and muscle  <br/> pain, rash, bleeding from the nose and gums, and swollen lymph nodes. <span className="typing-cursor"></span></p>
          <p className="typing-text">2. <b>Meningitis</b>: Inflammation of the meninges (protective membranes) surrounding the brain and spinal cord can cause high fever, severe headache  <br/> (including behind the eyes and temples), sensitivity to light, nausea, vomiting, and neck stiffness. Swollen lymph nodes may also be present. <span className="typing-cursor"></span></p>
          <p className="typing-text">3. <b>Viral hemorrhagic fever </b>: This group of viral infections, including diseases such as Ebola or Marburg, can cause high fever, severe headache, bleeding  <br/> from various sites (nose, gums, eyes), joint and muscle pain, rash, and swollen lymph nodes. <span className="typing-cursor"></span></p>
          <p className="typing-text">4. <b>Malaria </b>: A parasitic infection transmitted by mosquitoes, causing recurrent bouts of high fever, headache (including behind the eyes),  <br/>muscle and joint pain, fatigue, and sometimes rash. Swollen lymph nodes may also be present. <span className="typing-cursor"></span></p>
        </div>

      </div>

      <div id="buffer">.</div>
    </div >
  );
}

export default withAuthCheck(SymptomOutput);