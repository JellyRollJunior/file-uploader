import express from 'express';
import path from 'node:path';
import dotenv from 'dotenv';
import session from 'express-session';
import { passport } from './config/passport.js';
import { indexRouter } from './routes/indexRouter.js';
import { loginRouter } from './routes/loginRouter.js';
dotenv.config();

// setup app
const app = express();
// looks for views in views folder
const __dirname = path.resolve();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// enable POST request data
app.use(express.urlencoded({ extended: false })); 
// enable sessions
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }));
// Passport authentication
app.use(passport.session());

// routes
app.use('/', indexRouter);
app.use('/login', loginRouter);

// init server
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));