import express from 'express';
import path from 'node:path';
import dotenv from 'dotenv';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import { passport } from './config/passport.js';
import { userToLocals } from './middleware/userToLocals.js';
import { indexRouter } from './routes/indexRouter.js';
import { loginRouter } from './routes/loginRouter.js';
import { signupRouter } from './routes/signupRouter.js';
import { uploadRouter } from './routes/uploadRouter.js';
import { folderRouter } from './routes/folderRouter.js';
import { fileRouter } from './routes/fileRouter.js';
dotenv.config();

// setup app
const app = express();
// looks for views in views folder
const __dirname = path.resolve();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// serve assets from public folder
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));
// enable POST request data
app.use(express.urlencoded({ extended: false }));
// enable sessions (stored in Prisma DB)
app.use(
    session({
        store: new PrismaSessionStore(new PrismaClient(), {
            checkPeriod: 2 * 60 * 1000, //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET,
        cookie: { maxAge: 60 * 60 * 1000 }, // 60 minutes
    })
);
// Passport authentication
app.use(passport.session());
app.use(userToLocals);

// routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/upload', uploadRouter);
app.use('/folder', folderRouter);
app.use('/file', fileRouter)

// error handlers
app.use('*', (req, res, next) => {
    res.render('error', { error: '404 Page not found' });
});
app.use((error, req, res, next) => {
    res.render('error', { error });
});

// init server
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
