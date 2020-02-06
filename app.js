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

bot.dialog('send', async function (session) {
    console.log(`\n\n**** DIALOG Triggered | app.js send dialog\n     ${ new Date().toISOString() }`);
    
    session.send('I AM SENDING A MESSAGE');

    console.log(`**** DIALOG Ended after calling send() | app.js send dialog\n     ${ new Date().toISOString() }`);
}).triggerAction({ matches: [/send/,/test/]});

bot.use({
    botbuilder: function (session, next) {
        console.log(`**** MIDDLEWARE Botbuilder() called | app.js bot.use()\n     ${ new Date().toISOString() }`);
        next();
    },
    send: async function (event, next) {
        console.log(`**** MIDDLEWARE Send() called | app.js bot.use()\n     ${ new Date().toISOString() }`);
        next();
    }
});


