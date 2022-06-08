// This code will generate a random value among "A" or "B". To make this automation work, please create a new property at contact level with internal value "random"

const hubspot = require('@hubspot/api-client');

exports.main = (event, callback) => {
  
  const hubspotClient = new hubspot.Client({
    apiKey: process.env.HAPIKEY
  });  
  
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
    
if (getRandomInt(2) > 0) {
        hubspotClient.crm.contacts.basicApi.update(event.object.objectId, {
          properties: {
            random: "A" }
        });
} else {
        hubspotClient.crm.contacts.basicApi.update(event.object.objectId, {
          properties: {
            random: "B" }
        });
}
}
