export function calculateBloodTestResult(data){
    const { wbc, mcv, rbc, mch, plt, mchc, hgb, dwbc, hct, rbcdw, createdAt} = data;
  
    const wbcResult = wbc > 9.6 ? "High" : wbc < 3.4 ? "Low" : "Normal";
    const mcvResult = mcv > 100.0 ? "High" : mcv < 80.0 ? "Low" : "Normal";
    const rbcResult = rbc > 5.65 ? "High" : rbc < 4.35 ? "Low" : "Normal";
    const mchResult = mch > 33.2 ? "High" : mch < 27.5 ? "Low" : "Normal";
    const pltResult = plt > 9.6 ? "High" : plt < 135 ? "Low" : "Normal";
    const mchcResult = mchc > 36.0 ? "High" : mchc < 32.0 ? "Low" : "Normal";
    const hgbResult = hgb > 16.6 ? "High" : hgb < 13.2 ? "Low" : "Normal";
    const dwbcResult = dwbc > 9.6 ? "High" : dwbc < 3.4 ? "Low" : "Normal";
    const hctResult = hct > 48.6 ? "High" : hct < 38.3 ? "Low" : "Normal";
    const rbcdwResult = rbcdw > 14.5 ? "High" : rbcdw < 11.8 ? "Low" : "Normal";
    const dateResult = createdAt;
  
    const result = {
      wbc: wbcResult,
      mcv: mcvResult,
      rbc: rbcResult,
      mch: mchResult,
      plt: pltResult,
      mchc: mchcResult,
      hgb: hgbResult,
      dwbc: dwbcResult,
      hct: hctResult,
      rbcdw: rbcdwResult,
      createdAt: dateResult,
    };
  
    return result;
  };