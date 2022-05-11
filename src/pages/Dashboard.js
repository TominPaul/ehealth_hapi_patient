import { React, useEffect, useState } from "react";
import endpoints from "../connection/endpoints";
import NavigationBar from "../components/NavigationBar";
import PatientTable from "../components/PatientTable";

const Dashboard = () => {
  const [patientList, setPatientList] = useState([]);

  //:---------------------> Fetching records from FHIR that being passed to PatientTable
  useEffect(() => {
    endpoints.getPatientList().then((res) => {
      console.log(res.data);
      setPatientList(res.data.entry);
    });
  }, []);

  return (
    <div data-testid="dashboard">
      <NavigationBar />
      <PatientTable patientList={patientList} />
    </div>
  );
};

export default Dashboard;
