const express = require('express');
const line = require('@line/bot-sdk');

const config = {
    channelAccessToken: 'RdFcsMBl+Anxfn8q/y1BCXpgnr5w4s9arTGLjZICFwKY4l0EMSJiMdUiSbfWq9v3O7Tc5mM6BMLpWZszUYgfJ+xCkA9mqiHfcZ4gtffrrBq95aU+vY1KoSjuO2ENghYlDDkA+ceO7oe56FQeuQ3jwAdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'b3301e0a2252d81985541b0431d4c9b7'
};

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

app.get("/test",(req, res)=>{
    res.end("test");
})

const client = new line.messagingApi.MessagingApiClient({
    channelAccessToken: 'RdFcsMBl+Anxfn8q/y1BCXpgnr5w4s9arTGLjZICFwKY4l0EMSJiMdUiSbfWq9v3O7Tc5mM6BMLpWZszUYgfJ+xCkA9mqiHfcZ4gtffrrBq95aU+vY1KoSjuO2ENghYlDDkA+ceO7oe56FQeuQ3jwAdB04t89/1O/w1cDnyilFU=',
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
// define the first route
app.get("/", function (req, res) {
    res.send("<h1>Hello World!</h1>")
})

app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));