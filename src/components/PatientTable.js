import { React } from "react";
import { useEffect, useState } from "react";
import PatentModal from "./PatientModal";
import endpoints from "../connection/endpoints";

const PatientTable = (props) => {
  const [count, setCount] = useState(props.patientList.length);
  const [patientListInView, setPatientListInView] = useState([]);
  const [numItemsPerPage, setNumItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  //:----------> Initial patientList
  useEffect(() => {
    if (!isSearch) {
      setCount(props.patientList.length);
      setTotalPages(Math.ceil(count / numItemsPerPage));
      setPatientListInView(
        props.patientList.slice(
          currentPage * numItemsPerPage,
          currentPage * numItemsPerPage + numItemsPerPage
        )
      );
    }
  }, [currentPage, numItemsPerPage, props.patientList, count, isSearch]);

  //:----------> Search Patient from patientList
  const patientSearchHandler = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    const filteredList = props.patientList.filter((patient) => {
      return patient.resource.name[0].given[0]
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    filteredList.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
    if (searchTerm.length > 0) {
      setIsSearch(true);
      setCurrentPage(0);
      setPatientListInView(filteredList.slice(0, filteredList.length + 1));
      setCount(filteredList.length);
      setTotalPages(1);
    } else {
      setNumItemsPerPage(5);
      setIsSearch(false);
    }
  };

  //:----------> Create/Update operations in PatientModel
  const modalCloseHandler = () => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  const updatePatientHandler = (patient, updatedPatientData) => {
    console.log(patient);
    console.log(updatedPatientData);

    if (patient === null) {
      console.log("creating");
      let resource = {
        resourceType: "Patient",
        name: [
          {
            given: [`${updatedPatientData.name}`],
          },
        ],
        gender: `${updatedPatientData.gender}`,
        birthDate: `${updatedPatientData.dob}`,
      };
      endpoints.createPatient(resource).then((res) => {
        console.log(res);
      });
    } else {
      console.log("updating");
      let resource = patient.resource;
      resource.name[0].given[0] = updatedPatientData.name;
      resource.birthDate = updatedPatientData.dob;
      resource.gender = updatedPatientData.gender;

      endpoints.updatePatient(patient.resource.id, resource).then((res) => {
        console.log(res.data);
      });
    }

    setShowModal(false);
    setSelectedPatient(null);
  };

  return (
    <>
      <PatentModal
        isOpen={showModal}
        patient={selectedPatient}
        onClose={modalCloseHandler}
        onPatientUpdate={updatePatientHandler}
      />

      <div className="bg-white p-8 rounded-md w-full" data-testid="ptable">
        <div className="flex items-center justify-between pb-2">
          {/* {UI: Search Patient} */}
          <div className="flex gap-x-2 bg-gray-50 items-center p-2 rounded-md">
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
            </svg>
            <input
              className="bg-gray-50 outline-none ml-1 block "
              type="text"
              name=""
              id=""
              placeholder={`${count} records...`}
              onChange={patientSearchHandler}
            />
          </div>

          {/* {UI: Add Patient} */}
          <div className="inline-flex xs:mt-0">
            <button
              className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
              onClick={() => {
                setSelectedPatient(null);
                setShowModal(true);
              }}
            >
              Add Patient
            </button>
          </div>
        </div>

        {/* UI: Patient List <--Table View-->*/}
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Patient ID
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    D.O.B
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {patientListInView.map((patient, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => {
                        // Add patientImage to patient object
                        const patientImage =
                          patient.resource.gender === "male"
                            ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                            : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80";
                        patient.patientImage = patientImage;
                        setSelectedPatient(patient);
                        setShowModal(true);
                      }}
                      className="cursor-pointer"
                    >
                      <td
                        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                        data-testid={`patient-${patient.resource.id}-id`}
                      >
                        <p className="text-gray-900 whitespace-no-wrap">
                          {patient.resource.id}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src={
                                patient.resource.gender === "male"
                                  ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                  : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                              }
                              alt="default-patient-image"
                            />
                          </div>
                          <div
                            className="ml-3"
                            data-testid={`patient-${patient.resource.id}-name`}
                          >
                            <p className="text-gray-900 whitespace-no-wrap">
                              {patient.resource.name[0].given[0]}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                        data-testid={`patient-${patient.resource.id}-gender`}
                      >
                        <p className="text-gray-900 whitespace-no-wrap">
                          {patient.resource.gender}
                        </p>
                      </td>
                      <td
                        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                        data-testid={`patient-${patient.resource.id}-birthdate`}
                      >
                        <p className="text-gray-900 whitespace-no-wrap">
                          {patient.resource.birthDate}
                        </p>
                      </td>
                      <td
                        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                        data-testid={`patient-${patient.resource.id}-address`}
                      >
                        <p className="text-gray-900 whitespace-no-wrap">
                          {patient.resource.address
                            ? patient.resource.address[0].city +
                              " " +
                              patient.resource.address[0].state +
                              " " +
                              patient.resource.address[0].postalCode
                            : "No Address Found"}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {isEmpty && (
          <div className="flex justify-center py-2">
            <h1 className="text-gray-600">No records found</h1>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between">
          <div className="inline-flex mt-2 xs:mt-0">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {currentPage * numItemsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {currentPage * numItemsPerPage + numItemsPerPage}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {count}
              </span>{" "}
              Entries
            </span>
          </div>
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-l hover:bg-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => {
                if (currentPage > 0) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              <svg
                className="mr-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"></path>
              </svg>
              Prev
            </button>
            <button
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-r border-0 border-l border-white-700 hover:bg-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => {
                if (currentPage < totalPages - 1) {
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              Next
              <svg
                className="ml-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <select
            className="mt-2 px-2 py-1.5 bg-white bg-clip-padding bg-no-repeat text-base font-normal text-gray-700 border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            value={numItemsPerPage}
            onChange={(e) => {
              setNumItemsPerPage(Number(e.target.value));
            }}
          >
            {[5, 10, 15, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Page Footer */}
      <span className="text-sm text-gray-400">
        Page <span className="font-medium">{currentPage + 1}</span> of{" "}
        <span className="font-medium">{totalPages}</span>
      </span>
    </>
  );
};

export default PatientTable;
