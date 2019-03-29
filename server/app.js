const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');
require('dotenv').config();

const authRouter = require('./routes/auth');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

const app = express();
sequelize.sync();
passportConfig(passport);

app.set('port', process.env.PORT || 8000);

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(hpp());
} else {
 app.use(morgan('dev'));
 app.use(cors());
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: true
    },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRouter);

app.listen(app.get('port'), () => {
 console.log('Waiting on port ', app.get('port'));
});
