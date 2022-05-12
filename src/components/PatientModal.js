import { React, useEffect, useState } from "react";

const PatentModal = (props) => {
  const [nameValue, setNameValue] = useState("");
  const [dobValue, setDobValue] = useState("");
  const [genderValue, setGenderValue] = useState("male");

  useEffect(() => {
    setNameValue(props.patient ? props.patient.resource.name[0].given[0] : "");
    setDobValue(props.patient ? props.patient.resource.birthDate : "");
    setGenderValue(props.patient ? props.patient.resource.gender : "");
  }, [props.patient]);

  return props.isOpen ? (
    <div>
      <div className="py-12 bg-gray-700/50 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          <div className="relative py-6 px-6 md:px-10 bg-white shadow-md rounded border border-gray-400">
            <h1 className="text-gray-800 pt-4 h-10 font-lg font-bold tracking-normal leading-tight mb-4">
              Enter Patient Details
            </h1>
            <img
              alt="..."
              src={
                props.patient && props.patient.patientImage
                  ? props.patient.patientImage
                  : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
              }
              className="mb-6 shadow-lg rounded-full mx-auto max-w-120-px"
              style={{ width: "180px" }}
            ></img>
            <label
              htmlFor="name"
              className="text-gray-800 mt-4 text-sm font-bold leading-tight tracking-normal"
            >
              Patient Name
            </label>
            <input
              className="mb-4 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center px-3 text-sm border-gray-300 rounded border"
              placeholder="Enter Full Name Here"
              value={nameValue}
              onChange={(e) => {
                setNameValue(e.target.value);
              }}
            />
            <label
              htmlFor="gender"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Gender
            </label>
            <select
              className="mb-4 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center px-3 text-sm border-gray-300 rounded border"
              onChange={(e) => {
                setGenderValue(e.target.value);
              }}
              value={genderValue}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="unknwon">Unknown</option>
            </select>

            <label
              htmlFor="dob"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Date of Birth
            </label>
            <input
              type="date"
              className="mb-6 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center px-3 text-sm border-gray-300 rounded border "
              placeholder="YYYY-MM-DD"
              value={dobValue}
              onChange={(e) => {
                setDobValue(e.target.value);
              }}
            />

            <div className="mb-2 flex items-center justify-start w-full">
              <button
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                onClick={() => {
                  var updatedPatientData = {
                    name: nameValue,
                    dob: dobValue,
                    gender: genderValue,
                  };

                  setNameValue("");
                  setDobValue("");
                  setGenderValue("");

                  props.onPatientUpdate(props.patient, updatedPatientData);
                }}
              >
                Save
              </button>
              <button
                className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                onClick={props.onClose}
              >
                Discard
              </button>
            </div>
            <button
              className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
              onClick={props.onClose}
              aria-label="close modal"
            >
              <svg
                className="icon icon-tabler icon-tabler-x"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default PatentModal;
