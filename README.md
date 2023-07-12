Node.js Integration with Salesforce


This document provides a step-by-step guide on creating a Node.js application that can collect form data and push it to a Salesforce custom object. We'll use a Salesforce custom object named Ops_Questionnaire for this purpose.

Prerequisites
Before starting, ensure that you have the following:

Node.js and NPM installed on your computer.
A Salesforce account with API access.
Your Salesforce access token and instance URL.
A PostgreSQL instance running locally or remotely.
Basic knowledge of JavaScript and Node.js.
Steps
Step 1: Setup Your Project
Create a new directory for your project and initialize it with npm:

bash
Copy code
mkdir SF_OpsQuestionnaire
cd SF_OpsQuestionnaire
npm init -y
Step 2: Install Required Packages
We will use express, body-parser, dotenv, pg (PostgreSQL client for Node.js), and jsforce (Salesforce API library for JavaScript). Install these packages as follows:

bash
Copy code
npm install express body-parser dotenv pg jsforce
Step 3: Create Your Server File
Create a new file named server.js in your project folder:

javascript
Copy code
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function() {
  console.log('Server listening on port 3000!');
});
Step 4: Create Your Form
Create a new HTML file named form.html in the root directory of your project. Populate this form with the fields you require.

Step 5: Create an Endpoint to Serve the Form
Add a GET endpoint to your server.js file to send the form.html file as a response:

javascript
Copy code
const path = require('path');

//...

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

//...
Step 6: Accept Form Submissions
Create a POST endpoint in your server.js file to accept form submissions:

javascript
Copy code
//...

app.post('/submit', function(req, res){
  console.log("Received data: ", req.body);
  res.sendStatus(200);
});

//...
Step 7: Connect to Salesforce
Add the following logic in the /submit POST endpoint to establish a new Salesforce connection and send the form data to your Salesforce custom object:

javascript
Copy code
const jsforce = require('jsforce');

//...

app.post('/submit', function(req, res){
  const formData = req.body;

  const conn = new jsforce.Connection({
    instanceUrl : process.env.INSTANCE_URL,
    accessToken : process.env.ACCESS_TOKEN
  });

  conn.sobject("Ops_Questionaire").create(formData, function(err, result) {
    if (err) { 
      console.error(err); 
      res.status(500).send(err);
    }
    console.log("From Salesforce: " + JSON.stringify(result));
    res.sendStatus(200);
  });
});
Test Your Server
Start your server with node server.js and navigate to http://localhost:3000/form in your web browser to view your form.

This guide offers a simple example of how to integrate Node.js with Salesforce. For a real-world application, you'd likely need to incorporate additional error handling, validation, and security measures.
