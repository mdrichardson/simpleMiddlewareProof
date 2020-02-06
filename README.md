# Overview

This is a simple proof-of-concept to show that `bot.use()...send()` middleware is called before a request is actually sent.

# Install

`npm i`

Then copy the contents of `node_modules_replace` such that the contents overwrite the files inside `node_modules`

`npm start`

Test in Emulator. Type "send" or "test" to have the bot send a message.

# Result

This is the console output of this bot:

![](/images/console.PNG)

Notice that:

1. A message is sent from the dialog
2. The middleware is called, *THEN*
3. ChatConnector sends the message
4. Request sends the message
5. Request receives the response

# How it Works

This just logs various events to the console in order to see what gets called when.

## app.js

Log when the dialog gets started:

![](/images/appDialog.PNG)

Log when middleware is triggered:

![](/images/appMiddleware.PNG)

## ChatConnector.js

Log all incoming messages:

![](/images/connectorListen.PNG)

Log when first attempting to send messages:

![](/images/connectorPost.PNG)

Log when done sending messages:

![](/images/connectorSend.PNG)

## request.js

Log all messages sent (under `Request.prototype.start()`):

![](/imates/requestSend.PNG)

Log all message responses:

![](/images/requestResponse.js)