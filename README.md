# eHealth-HAPI_PATIENT <--> React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

<img src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
<img src="https://img.shields.io/badge/JavaScript%20-%23F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind_CSS%20-%2338B2AC.svg?&style=for-the-badge&logo=Tailwind%20CSS&logoColor=white"/>

## About

eHealth_hapi_patient is a react web application that does some core operations with [patient](https://www.hl7.org/fhir/patient.html) object in the FHIR server. Following are some of the core tasks involved:
1. Display a list of recently updated patients from the FHIR server.
2. View & Update some of the patient information.
3. Support searching by patient name.
4. Support creation of new patient.

The application also supports searching patient by name and can also process creation of new patient resources and add it to an existing FHIR test server.

### FHIR - A Brief Introduction

The HL7® FHIR® (Fast Healthcare Interoperability Resources) [FHIR](https://www.hl7.org/fhir/) standard defines how healthcare information can be exchanged between different computer systems regardless of how it is stored in those systems. It allows healthcare information including clinical and administrative data, to be available securely to those who have a need to access it, and to those who have the right to do so for the benefit of a patient receiving care. 

The standards development organization HL7® (Health Level Seven®3) uses a collaborative approach to develop and upgrade FHIR.

### Test Server

The test server we will be using for this exercise is located [here](http://hapi.fhir.org/home?serverId=home_21). It contains a bunch of test healthcare data put there by various people testing thier FHIR applications. Just as a warning though, this is not a production server, so any data stored on it could be wiped at any time. Do not depend on this server for permanent storage, and keep in mind that someone else could modify or delete your data without warning.

### FHIR Patient documentation

To make REST calls, you can start with:
```bash
GET http://hapi.fhir.org/baseDstu3/Patient?_format=json&name:missing=false birthdate:missing=false
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Contributors

* [Tomin Paul](https://www.linkedin.com/in/tomin-paul/) | [![Twitter Follow](https://img.shields.io/twitter/follow/tomin_paul?style=social)](https://twitter.com/tomin_paul)

## Screenshots

![screen1](https://github.com/TominPaul/ehealth_hapi_patient/blob/main/screenshots/eHealth_hapi_patient_1.png)

![screen2](https://github.com/TominPaul/ehealth_hapi_patient/blob/main/screenshots/eHealth_hapi_patient_2.png)

![screen3](https://github.com/TominPaul/ehealth_hapi_patient/blob/main/screenshots/eHealth_hapi_patient_3.png)

![screen4](https://github.com/TominPaul/ehealth_hapi_patient/blob/main/screenshots/eHealth_hapi_patient_4.png)