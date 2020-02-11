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
    session.send('I AM SENDING A MESSAGE');
}).triggerAction({ matches: [/send/,/test/]});

bot.use({
    botbuilder: function (session, next) {
        try {
            const activity = session.message;
            if (activity.type === 'message') {
                const data = JSON.stringify({ conversation: activity.address.conversation, id: activity.address.id, user: activity.address.user });
                console.log(`**** MIDDLEWARE Botbuilder() called | app.js bot.use() | ${ data }`);
            }
        } catch (err) {
            console.log(`**** [ERROR] MIDDLEWARE Botbuilder() called | app.js bot.use() | ${ JSON.stringify(session) }`);
        }
        next();
    },
    send: async function (event, next) {
        try {
            const activity = event.address;
            if (activity.type === 'message') {
                const data = JSON.stringify({ conversation: activity.conversation, id: activity.id, recipient: activity.recipient, user: activity.user });
                console.log(`**** MIDDLEWARE Send() called | app.js bot.use() | ${ data }`);
            }
        } catch (err) { 
            console.log(`**** [ERROR] MIDDLEWARE Send() called | app.js bot.use() | ${ JSON.stringify(event) }`); 
        }
        next();
    }
});


