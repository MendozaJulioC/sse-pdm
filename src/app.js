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
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];
logFnWrapper.listener();
logFnWrapper();
emitter.on('log', () => console.log('log persistently'));
const newListeners = emitter.rawListeners('log');
newListeners[0]();
emitter.setMaxListeners(0)
emitter.emit('log');
module.exports =app;

