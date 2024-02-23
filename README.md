# Integrating Affinidi Authentication into an E-commerce React Application

This document provides comprehensive instructions for seamlessly integrating the Affinidi passwordless login solution into a React application, enhancing security and user experience.

### Introduction
Affinidi offers secure, privacy-preserving credential sharing powered by blockchain technology. By integrating their login component, you can enable passwordless authentication for users.

### How Affinidi Vault Works
Affinidi Vault facilitates data discovery, collection, storage, sharing, and monetization across applications, empowering users to control their data securely. Applications requesting data must obtain user consent to access the Vault through Verifiable Presentations (VP).

![Alt Text](https://github.com/sridurgeshv/Affinidi-Capstone-Project/blob/main/images/arch.png)

## Presentation Exchange (PEX) Query
The Presentation Exchange protocol implemented by Affinidi Vault enables data interoperability and uses PEX query to request user data. Applications can assess the trustworthiness of the data by describing the required data that the user must satisfy using the presentation definition.

See the sample PEX query that requests the email address of the user from the Vault:
```json
{
  "id": "email_vc_data",
  "name": "Email VC data",
  "purpose": "Check if data contains necessary fields",
  "constraints": {
    "fields": [
      {
        "path": [
          "$.credentialSubject.email"
        ],
        "purpose": "Email address",
        "filter": {
          "type": "string"
        }
      }
    ]
  }
} 
```
The above definition is part of the default presentation definition of Affinidi Login to authenticate users using their verified email address as their identity.

## API Reference

### Authentication Completion Route
Handles responses after successful login with Affinidi. It accepts a POST request at /api/affinidi-auth/complete with the authorization code and state.
```http
  POST /api/affinidi-auth/complete
```

## Benefits:

- ## Passwordless login experience
  Enables users to access their accounts without passwords, using secure methods like biometrics or trusted device codes.
### Advantages :

- Enhanced convenience and ease of use
- Mitigation of risks from password reuse or weak passwords
- Heightened security against phishing attacks
  
- ## Built-in security and privacy controls
  Security protections and privacy controls are included by default in the system architecture and design. Examples include encryption, access controls, anonymization of data.
### Advantages : 

- Prevention of security incidents and data breaches
- Protection of sensitive user data such as financial or health records
- Assurance of secure and private data handling

- ## No password or sensitive data stored
Eliminates the storage or access to users' passwords, financial details, or personal identifiers.

### Advantages :

- Reduction of hacking targets
- Minimization of exposure risks from insider threats
- Compliance with data privacy regulations like GDPR

## Prerequisites

Before integrating Affinidi Login, ensure the following:

- Affinidi Vault Browser Extension installed
- Affinidi CLI tools installed
- An Ecommerce React application generated with Create React App

## Integration Steps

### Enable Affinidi Login

Integrate Affinidi Login into your application using the affinidi-react-auth library:

### 1. Install Affinidi Library :

```bash
npm install @affinidi/affinidi-react-auth
```
### 2. Configure Package.json :
  Configure package.json to proxy requests to your API server during development:
```json
 "proxy": "http://localhost:3001"
```
After installing the library and configuring the package.json, we modify the src/App.js file and paste the following codes to enable Affinidi Login component.

### 3.Implement Affinidi Login Component
Modify the src/App.js file and paste the following codes to enable Affinidi Login component.
```js
import logo from './logo.svg';
import './App.css';
import React from "react"

import { AffinidiLoginButton, useAffinidiProfile } from '@affinidi/affinidi-react-auth'

const apiBaseUrl = process.env.REACT_APP_SERVER_URI || '';
```
### 4. Retrieve User Information
 Retrieve the user information after successful authentication using useAffinidiProfile hook and add the logout function.
```js
const { isLoading, error, profile, handleLogout } = useAffinidiProfile({
     authCompleteUrl: `${apiBaseUrl}/api/affinidi-auth/complete`
  })

async function logout() {
    //clear session cookie
    handleLogout();
    window.location.href = "/";
}
```
### 5. Display Components
  Display the Affinidi Login button, loading indicator, user profile, and error messages using the below code.
```js
{!profile && <>
    <AffinidiLoginButton authInitUrl={`${apiBaseUrl}/api/affinidi-auth/init`} />
</>}

{isLoading && <p>Loading...</p>}

{profile && <>
    <button style={{ marginRight: 10 }} onClick={logout}>
    Logout
    </button>

    <h3>User Profile</h3>
    <pre style={{ textAlign: "left" }}>{JSON.stringify(profile, null, 4)}</pre>
</>}

{error && <><h2>error</h2>{error}</>}
```
After implementing the required codes, restart the application. The Affinidi Login button shows on the homepage.

In cases where proxy settings is not working on the app with your hosting provider, define the REACT_APP_SERVER_URI in the .env with the base url of your Express server.

## Configuration
### Affinidi Login Configuration
We will be requesting eight data points - email, first name, last name, phone number, street address, postal code, city, and country. Edit the presentation definition and ID token mapping accordingly.

Using either Affinidi Portal or Affinidi CLI, make changes to your presentation definition and ID token mapping.

The identity token mapping should looks like this.
```
[
 {
    "sourceField": "$.credentialSubject.email",
    "idTokenClaim": "email",
    "inputDescriptorId": "email_vc"
  },
  {
    "sourceField": "$.credentialSubject.country",
    "idTokenClaim": "country",
    "inputDescriptorId": "country_vc"
  },
  {
    "sourceField": "$.credentialSubject.givenName",
    "idTokenClaim": "givenName",
    "inputDescriptorId": "givenname_vc"
  },
  {
    "sourceField": "$.credentialSubject.familyName",
    "idTokenClaim": "familyName",
    "inputDescriptorId": "family_vc"
  },
  {
    "sourceField": "$.credentialSubject.phoneNumber",
    "idTokenClaim": "phoneNumber",
    "inputDescriptorId": "phone_vc"
  },
  {
    "sourceField": "$.credentialSubject.postalCode",
    "idTokenClaim": "postalCode",
    "inputDescriptorId": "postal_vc"
  },
  {
    "sourceField": "$.credentialSubject.streetAddress",
    "idTokenClaim": "streetAddress",
    "inputDescriptorId": "address_vc"
  },
  {
    "sourceField": "$.credentialSubject.locality",
    "idTokenClaim": "locality",
    "inputDescriptorId": "locality_vc"
  }
]
```
Ensure you have saved the changes to your presentation definition and id token mapping. With that, we are done with the Affinidi Login configuration.

Ensure you have saved the changes to your presentation definition and id token mapping.



## Testing 
### Start the Server
Open your terminal, and ensure you are in the server-app directory. Then, enter the following command.
```sql
npm start
```
Your terminal should have a message 'Server listening on 3001'.
### Start the Application
Open another terminal and ensure you are in the affinidi-capstone directory. Then, enter the following command.
```sql
npm start
```
Your browser will then open localhost:3000. 


## New Improvements 

- ### Location-based Suggestions: Implement store suggestions based on the user's location for enhanced shopping experience.
- ### Additional Navigation Links: Include more navigation links to various categories for easy access.

# Deployment
Here You can Access the link to my application - [Shopping store]()

## Additional Resources 
- List the available data points your application can request from the Affinidi Vault.[Affinidi Vault User Data](https://docs.affinidi.com/docs/affinidi-vault/affinidi-vault-data/)
- Learn how to use PEX queries to request data from Affinidi Vault.[Requesting User Data](https://docs.affinidi.com/docs/affinidi-vault/requesting-user-data/)
