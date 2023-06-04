import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsDot, BsFillCheckCircleFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../../Firebase";
import { calculateBloodTestResult } from "../../api/bloodTestUtils";
import "./LabOutput.css";

function LabOutput() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setresultData] = useState([]);
  const [mainResult, setMainResult] = useState(null);
  const params = useParams();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const filteredResult = collection(db, "labInput");
      const q = await getDocs(filteredResult);

      const newData = q.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const result = newData.filter((e) => {
        return e.createdBy === user.uid;
      });
      setresultData(result);

      const mResult = newData.filter((e) => {
        return e.id === params.resultid;
      });

      if (mResult.length > 0) {
        const res = { ...calculateBloodTestResult(mResult[0]) };
        const {
          wbc,
          mcv,
          rbc,
          mch,
          plt,
          mchc,
          hgb,
          dwbc,
          hct,
          rbcdw,
          createdAt,
        } = res;
        const dte = createdAt.toDate().toLocaleString();
        setMainResult({
          wbc,
          mcv,
          rbc,
          mch,
          plt,
          mchc,
          hgb,
          dwbc,
          hct,
          rbcdw,
          createdDate: dte,
        });
      }
      setIsLoading(false);
    }

    if (user) {
      fetchData();
    }
  }, [user, params.resultid]);

  return (
    <div>
      {isLoading ? (
        <div className="placeholder-loading loading-margin">
          <div className="loading-container">
            <div className="loading-circle"></div>
          </div>
          <div className="loading-text">Loading...</div>
        </div>
      ) : (
        mainResult &&
        resultData && (
          <div className="bodylaboutput">
            <div className="button-container">
              <button
                className="prevbutton"
                onMouseDown={() => setDropdownOpen(!isDropdownOpen)}
              >
                Previous Result
              </button>
              <div className="divinputtime">
                <p className="textinputtime">Test Date & Time </p>
                <div className="timeanddate">
                  <p>{mainResult.createdDate}</p>
                </div>
                <div className={`${isDropdownOpen ? "show" : "hide"} dropdown`}>
                  {resultData.map((data) => (
                    <div
                      className="dropdown-content"
                      key={data.id}
                      onMouseDown={() => navigate(`/laboutput/${data.id}`)}
                    >
                      <p className="dropdown-text">
                        {data.createdAt.toDate().toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="tableoutputcontainer">
              <div className="square-after">
                <div className="laboutputtext">
                  <div>
                    <input
                      type="button"
                      defaultValue="Run Another Test"
                      className="testagain"
                      onMouseDown={() => {
                        navigate("/labinput");
                      }}
                    />
                  </div>
                  <h1 className="laboratorytest-after">LABORATORY TEST</h1>
                  <h2 className="completebloodcount-after">
                    Complete Blood Count
                  </h2>
                  <table className="outouttable">
                    <tbody>
                      <tr>
                        <td className="cellspacing column1">
                          <BsFillCheckCircleFill className="buttonCheck" />
                          White Blood Cell Count (WBC)
                        </td>
                        <td className="cellspacing column2">
                          <BsDot /> {mainResult.wbc}{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className="cellspacing column1">
                          <BsFillCheckCircleFill className="buttonCheck" />
                          Red Blood Cell Count (RBC)
                        </td>
                        <td className="cellspacing column2">
                          <BsDot /> {mainResult.rbc}
                        </td>
                      </tr>
                      <tr>
                        <td className="cellspacing column1">
                          <BsFillCheckCircleFill className="buttonCheck" />
                          Platelet Count (PLT)
                        </td>
                        <td className="cellspacing column2">
                          <BsDot /> {mainResult.plt}
                        </td>
                      </tr>
                      <tr>
                        <td className="cellspacing column1">
                          <BsFillCheckCircleFill className="buttonCheck" />
                          Hemoglobin Level (HGB)
                        </td>
                        <td className="cellspacing column2">
                          <BsDot /> {mainResult.hgb}
                        </td>
                      </tr>
                      <tr>
                        <td className="cellspacing column1">
                          <BsFillCheckCircleFill className="buttonCheck" />
                          Hematocrit Level (HCT)
                        </td>
                        <td className="cellspacing column2">
                          <BsDot /> {mainResult.hct}
                        </td>
                      </tr>
                      <tr>
                        <td className="cellspacing column1">
                          <BsFillCheckCircleFill className="buttonCheck" />
                          Mean Corpuscular Volume (MCV)
                        </td>
                        <td className="cellspacing column2">
                          <BsDot /> {mainResult.mcv}
                        </td>
                      </tr>
                      <tr>
                        <td className="cellspacing column1">
                          <BsFillCheckCircleFill className="buttonCheck" />
                          Mean Corpuscular Hemoglobin (MCH)
                        </td>
                        <td className="cellspacing column2">
                          <BsDot /> {mainResult.mch}
                        </td>
                      </tr>
                      <tr>
                        <td className="cellspacing column1">
                          <BsFillCheckCircleFill className="buttonCheck" />
                          Mean Corpuscular Hemoglobin Concentration (MCHD)
                        </td>
                        <td className="cellspacing column2">
                          <BsDot /> {mainResult.mchc}
                        </td>
                      </tr>
                      <tr>
                        <td className="cellspacing column1">
                          <BsFillCheckCircleFill className="buttonCheck" />
                          Differential White Blood Cell Count (DWBC)
                        </td>
                        <td className="cellspacing column2">
                          <BsDot /> {mainResult.dwbc}
                        </td>
                      </tr>
                      <tr>
                        <td className="cellspacing column1">
                          <BsFillCheckCircleFill className="buttonCheck" />
                          Red Blood Cell Distribution Width (RBCDW)
                        </td>
                        <td className="cellspacing column2">
                          <BsDot /> {mainResult.rbcdw}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default LabOutput;
