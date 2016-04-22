var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTE - INDEX
app.get('/', (req, res) => {
  res.send('Hello world, I am a chat bot');
});

// ROUTE - RECEIVE MESSAGE
app.post('/webhook/', (req, res) => {
  messaging_events = req.body.entry[0].messaging;
  messaging_events.forEach(event => {
    let sender = event.sender.id;
    if (event.message && event.message.text) {
      let text = event.message.text;
      sendMessage(sender, `Text received, echo: ${text.substring(0, 200)}`);
    }
    res.sendStatus(200);
  });
});

// ROUTE - VERIFICATION
app.get('/webhook/', (req, res) => {
  if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
    res.send(req.query['hub.challenge']);
  }

  res.send('Error, wrong token');
});

// SERVER
app.listen(app.get('port'), () => {
  console.log(`running on port ${app.get('port')}`);
});
