const express = require('express');
const line = require('@line/bot-sdk');

const config = {
    channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN',
    channelSecret: 'YOUR_CHANNEL_SECRET'
};

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

const client = new line.messagingApi.MessagingApiClient({
    channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN',
});
function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    return client.replyMessage({
        replyToken: event.replyToken,
        messages: [{
            type: 'text',
            text: event.message.text
        }],
    });
}

app.listen(3000);