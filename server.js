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
  
    if(event.message.text == "hai"){
      const echo = { type: 'text', text: "Halo juga :)·" };
      return client.replyMessage(event.replyToken, echo);
    }

    const echo = { type: 'text', text: "Saya tidak mengerti, saya simpan dulu" };
    return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});