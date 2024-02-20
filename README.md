# Integrating Affinidi Authentication into an E-commerce React Application

This document provides instructions for integrating the Affinidi passwordless login solution into a React application.

Affinidi offers secure, privacy-preserving credential sharing powered by blockchain technology. By integrating their login component, you can enable passwordless authentication for users.


## Benefits:

- Passwordless login experience
- Built-in security and privacy controls
- No password or sensitive data stored

## Prerequisites
Before integrating Affinidi Login, you will need:

- Affinidi Vault Browser Extension installed
- Affinidi CLI tools installed
- A React application generated with Create React App

## Implementation Guide

### Enable Affinidi Login

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

