# Overview

This is a simple proof-of-concept to show that `bot.use()...send()` **middleware is called before a request is actually sent**.

# Install

`npm i`

Then copy the contents of `node_modules_replace` such that the contents overwrite the files inside `node_modules`

`npm start`

Test in Emulator. Type "send" or "test" to have the bot send a message.

# Result

This is the console output of this bot:

![](/images/console2.PNG)

Notice that:

(1) A message is sent from the dialog

(3) The middleware is called, *THEN*

(4) ChatConnector sends the message

(6) Request sends the message

(7) Request receives the response

# How it Works

This just logs various events to the console in order to see what gets called when.

## app.js

Log when the dialog gets started:

![](/images/appDialog   )

Log when middleware is triggered:

![](/images/appMiddleware2.PNG)

## ChatConnector.js

Log all incoming messages:

![](/images/connectorListen2.PNG)

Log when first attempting to send messages:

![](/images/connectorPost2.PNG)

Log when done sending messages:

![](/images/connectorSend2.PNG)

## request.js

Log all messages sent (under `Request.prototype.start()`):

![](/images/requestSend2.PNG)

Log all message responses:

![](/images/requestResponse2.PNG)