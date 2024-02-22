# Integrating Affinidi Authentication into an E-commerce React Application

This document provides instructions for integrating the Affinidi passwordless login solution into a React application.

Affinidi offers secure, privacy-preserving credential sharing powered by blockchain technology. By integrating their login component, you can enable passwordless authentication for users.

## API Reference

#### The authentication completion route handles the response after a successful login with Affinidi. It accepts a POST request at /api/affinidi-auth/complete with the authorization code and state.

```http
  POST /api/affinidi-auth/complete
```

## Benefits:

- ## Passwordless login experience
  Users can log into their account without needing to remember or type in a password. Instead, login uses alternative secure methods like biometrics (fingerprint, face recognition), security keys, or codes sent to a trusted device.
### Advantages :

- Increased convenience and ease of use
- Eliminates risk from password reuse or weak passwords
- Enhanced security against attacks like phishing
  
- ## Built-in security and privacy controls
  Security protections and privacy controls are included by default in the system architecture and design. Examples include encryption, access controls, anonymization of data.
### Advantages : 

- Helps prevent security incidents and data breaches
- Protects sensitive user data like financial information or health records
- Gives users confidence their data is handled securely and privately

- ## No password or sensitive data stored
The system does not store or have access to users' passwords, financial details, personal identifiers, or other private information.

### Advantages :

- Eliminates a key target for hackers
- Reduces risk of exposure from insider threats
- Allows compliance with regulations like GDPR on data privacy

## Prerequisites
Before integrating Affinidi Login, you will need:

- Affinidi Vault Browser Extension installed
- Affinidi CLI tools installed
- A React application generated with Create React App

## Introduction

### How Affinidi Vault Works
Use Affinidi Vault to discover, collect, store, share, and monetise your data across different applications while controlling your data. Applications that wish to request data from you must get the user’s consent before being able to extract the data from the Vault through Verifiable Presentation (VP).
![Alt Text](https://github.com/sridurgeshv/Affinidi-Capstone-Project/blob/main/images/arch.png)

## Presentation Exchange (PEX) Query
The Presentation Exchange protocol implemented by Affinidi Vault enables data interoperability and uses PEX query to request user data. Applications can assess the trustworthiness of the data by describing the required data that the user must satisfy using the presentation definition.

See the sample PEX query that requests the email address of the user from the Vault:
```
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

## Enable Affinidi Login

Once we confirm that the generated application is working, we will enable the Affinidi Login through the affinidi-react-auth  library.

1. Install the affinidi-react-auth library from NPM.
```
npm install @affinidi/affinidi-react-auth
```

2. To proxy unknown requests to your API server during development, add a proxy field to your package.json like this:
```
 "proxy": "http://localhost:3001"
```

After installing the library and configuring the package.json, we modify the src/App.js file and paste the following codes to enable Affinidi Login component.

3. Import the env variable and libraries required.
```
import logo from './logo.svg';
import './App.css';
import React from "react"

import { AffinidiLoginButton, useAffinidiProfile } from '@affinidi/affinidi-react-auth'

const apiBaseUrl = process.env.REACT_APP_SERVER_URI || '';
```

4. Retrieve the user information after successful authentication using useAffinidiProfile hook and add the logout function.
```
const { isLoading, error, profile, handleLogout } = useAffinidiProfile({
     authCompleteUrl: `${apiBaseUrl}/api/affinidi-auth/complete`
  })

async function logout() {
    //clear session cookie
    handleLogout();
    window.location.href = "/";
}
```

5. Display the Affinidi Login button, loading indicator, user profile, and error messages using the below code.
```
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

### List the available data points your application can request from the Affinidi Vault.[Affinidi Vault User Data](https://docs.affinidi.com/docs/affinidi-vault/affinidi-vault-data/)
### Learn how to use PEX queries to request data from Affinidi Vault.[Requesting User Data](https://docs.affinidi.com/docs/affinidi-vault/requesting-user-data/)
## Affinidi Login Configuration
we will be requesting eight datapoints - email, first name, last name, phone number, street address, postal code, city and country. We will thus need to edit our presentation definition and ID token mapping.

Using either Affinidi Portal or Affinidi CLI, make changes to your presentation definition such that it looks like this. Note: As Affinidi improves the product, there may be changes to the syntax of the PEX queries. As such, you should refer to this page as the authoritative source.

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


## Testing 
First, let's start our server. Open your terminal, and ensure you are in the server-app directory. Then, enter the following command.
```
npm start
```
Your terminal should have a message 'Server listening on 3001'.

Next, open another terminal and ensure you are in the affinidi-capstone directory. Then, enter the following command.
```
npm start
```
Your browser will then open localhost:3000. 

## New Improvements 

- # On location : Based on User's location, there will be suggesting the stores in near to user in future where user can shop from the nearest shops
- Adding few more navigation links to different categories

# Deployment
Here You can Access the link to my application - [Shopping store]()





 
