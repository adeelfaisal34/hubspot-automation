// This code will capitalize first letter in First Name and Last Name Field in HubSpot for data accuracy and improvement in personalization tokens

const hubspot = require('@hubspot/api-client');

exports.main = (event, callback) => {
  
  const hubspotClient = new hubspot.Client({
    apiKey: process.env.HAPIKEY
  });
  
  hubspotClient.crm.contacts.basicApi.getById(event.object.objectId, ["firstname", "lastname"])
    .then(contactresults => {
    
      let firstName = contactresults.body.properties.firstname;
          console.log(`Found Contact first name: ${firstName}`);
      let lastName = contactresults.body.properties.lastname;
          console.log(`Found Contact last name: ${lastName}`);

// Capitalize names

      firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

// Update Field

      hubspotClient.crm.contacts.basicApi.update(event.object.objectId, {
          properties: {
            firstname: firstName,
            lastname: lastName
          }
        });
    
    
      callback({
        outputFields: {
          firstName: firstName,
          lastName: lastName
        }
      });
    })
    .catch(err => {
      console.error(err);
    });
}
