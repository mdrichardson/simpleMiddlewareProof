require('dotenv-extended').load();
const restify = require('restify');
var builder = require('botbuilder');

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post('/api/messages', connector.listen());

var inMemoryStorage = new builder.MemoryBotStorage();

var bot = new builder.UniversalBot(connector, async function (session) {
    session.on('error', function (err) {
        session.send('Failed with message: %s', err.message);
        session.endDialog();
    });
}).set('storage', inMemoryStorage);

bot.dialog('send', function (session) {
    console.log('\n\n**** Send Dialog Triggered | app.js > send dialog');
    console.log('**** Attempting to send | app.js > send dialog');
    
    session.send('I AM SENDING A MESSAGE');

    console.log('**** Send function called | app.js > send dialog');
}).triggerAction({ matches: [/send/,/test/]});

bot.use({
    botbuilder: function (session, next) {
        console.warn('**** Botbuilder() Middleware called | app.js > bot.use()');
        next();
    },
    send: function (event, next) {
        console.warn('**** Send() Middleware called | app.js > bot.use()');
        next();
    }
});
