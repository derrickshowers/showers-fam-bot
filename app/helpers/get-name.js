'use strict';

let request = require('request');

const profileUrl = 'https://graph.facebook.com/v2.6/';

module.exports = function getName(sender, callback) {
  request({
    url: `${profileUrl}${sender}`,
    qs: {
      access_token: process.env.TOKEN,
      fields: 'first_name'
    },
    method: 'GET'
  }, (error, response, body) => {
    if (error) {
      console.log(`Error getting profile info: ${error}`);
    } else if (response.body.error) {
      console.log(`Error: ${response.body.error}`);
    } else {
      callback(JSON.parse(body).first_name);
    }
  });
};
