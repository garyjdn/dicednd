const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');

const config = {
  channelAccessToken: "vPj2212eEefTaCWLsOCfdIyS5R70fvxaxhNfmbJglMHs0zAI/a9gDrOFIhOdtRBC0QyZt5IK+KY2PlOkz0sVHU6hTcLGP/M6/tTNk4JOc1XN+kge5s/vLnLGojDtpSAiG1tIXSJ9CQTqmj7bpyZDiAdB04t89/1O/w1cDnyilFU=",
  channelSecret: "7a59754c3d45e9fc95be172323d56771",
};

// create LINE SDK client
const client = new line.Client(config);
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((e)=>{
      console.log(e);
    });

});

function handleEvent(event) {
  
    if(event.message.text.toLowerCase() == "roll d2"){
      msg = Math.floor(Math.random() * 2) + 1;
    } else if(event.message.text.toLowerCase() == "roll d4"){
      msg = Math.floor(Math.random() * 4) + 1;
    } else if(event.message.text.toLowerCase() == "roll d6"){
      msg = Math.floor(Math.random() * 6) + 1;
    } else if(event.message.text.toLowerCase() == "roll d8"){
      msg = Math.floor(Math.random() * 8) + 1;
    } else if(event.message.text.toLowerCase() == "roll d10"){
      msg = Math.floor(Math.random() * 10) + 1;
    } else if(event.message.text.toLowerCase() == "roll d20"){
      msg = Math.floor(Math.random() * 20) + 1;
    } else if(event.message.text.toLowerCase() == "roll d100"){
      msg = Math.floor(Math.random() * 100) + 1;
    } else {
      msg = "...";
    }


    const echo = { type: 'text', text: msg };
    return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});