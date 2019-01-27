const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');

const api1 = require('./api/v1');

const app = express();

// connect to mongodb database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors());

app.use('/api/v1', api1);

module.exports = app;
