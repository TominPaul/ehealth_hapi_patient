import { React, useEffect, useState } from "react";
import endpoints from "../connection/endpoints";
import NavigationBar from "../components/NavigationBar";
import PatientTable from "../components/PatientTable";
import ErrorModal from "../components/UI/ErrorModal/ErrorModal";

const Dashboard = () => {
  const [patientList, setPatientList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  //:---------------------> Fetching records from FHIR that being passed to PatientTable
  useEffect(() => {
    endpoints
      .getPatientList()
      .then((res) => {
        setPatientList(res.data.entry);
      })
      .catch((err) => {
        setError(err);
        setIsError(true);
      });
  }, []);

  const errorHandler = () => {
    setIsError(false);
  };

  return (
    <div data-testid="dashboard">
      <NavigationBar />
      {isError && <ErrorModal errorData={error} onConfirm={errorHandler} />}
      <PatientTable patientList={patientList} />
    </div>
  );
};

export default Dashboard;
