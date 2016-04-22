'use strict';

let request = require('request');

const messageUrl = 'https://graph.facebook.com/v2.6/me/messages';

module.exports = function sendMessage(sender, text) {
  let messageData = {
    text: text
  };

  request({
    url: messageUrl,
    qs: { access_token: process.env.TOKEN },
    method: 'POST',
    json: {
      recipient: { id: sender },
      message: messageData
    }
  }, (error, response) => {
    if (error) {
      console.log(`Error sending messages: ${error}`);
    } else if (response.body.error) {
      console.log(`Error: ${response.body.error}`);
    }
  });
};
