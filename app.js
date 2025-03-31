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
    try {
        const user = await db.getUserByUsername(username);
        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }
        if (user.password != password) {
            return done(null, false, { message: 'Incorrect password' });
        }
        done(null, user); // pass authenticated user forward
    } catch (error) {
        return done(error);
    }
});
passport.use(local);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = db.getUserById(id);
        done(null, user); // attaches user object to `req.user` 
    } catch (error) {
        done(error);
    }
})



// routes
app.use('/', indexRouter);
app.use('/login', loginRouter);

// init server
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));