const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const jsforce = require('jsforce'); // Add this line
const dotenv = require('dotenv');
dotenv.config();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/submit', function(req, res){
    const formData = req.body;
  
    const conn = new jsforce.Connection({
        instanceUrl : process.env.SF_INSTANCE_URL,
        accessToken : process.env.SF_ACCESS_TOKEN
    });
  
    conn.sobject("Ops_Questionnaire__c").create(formData, function(err, result) {
      if (err) { 
        console.error(err); 
        return res.status(500).send(err);  // Using 'return' to prevent further execution in case of an error
      }
      console.log("From Salesforce: " + JSON.stringify(result));
      return res.sendStatus(200);  // Using 'return' here as well for consistency
    });
  });
  

app.listen(3000, function() {
  console.log('Server listening on port 3000!');
});
