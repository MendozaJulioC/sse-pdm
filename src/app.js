const express = require('express');
const EventEmitter = require('events');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));
// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();
// Logs "log once" to the console and removes the listener
logFnWrapper();
emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');
// Logs "log persistently" twice
newListeners[0]();
emitter.setMaxListeners(0)
emitter.emit('log');

module.exports =app;

