import React, { useRef, useState, useEffect } from "react";
import "./Symptoms.css";
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

function Symptoms() {
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
          navigate(`/laboutput/${e.id}`);
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
    for (const key in labInput) {
      const value = labInput[key];
      if (isNaN(parseFloat(value))) {
        return false; // Invalid input, not a number
      }
    }
    return true; // All inputs are valid numbers
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