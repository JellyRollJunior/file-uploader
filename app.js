import express from 'express';
import path from 'node:path';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import { indexRouter } from './routes/indexRouter.js';
import { loginRouter } from './routes/loginRouter.js';
dotenv.config();

const app = express();
// looks for views in views folder
const __dirname = path.resolve();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Passport
import passportLocal from 'passport-local';
import * as db from './db/queries.js';
const LocalStrategy = passportLocal.Strategy;
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session()); // dependency for passport

const local = new LocalStrategy(async (username, password, done) => {
    
})


// routes
app.use('/', indexRouter);
app.use('/login', loginRouter);

// init server
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));