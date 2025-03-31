import express from 'express';
import path from 'node:path';
import { indexRouter } from './routes/indexRouter.js';
import { loginRouter } from './routes/loginRouter.js';

const app = express();
// looks for views in views folder
const __dirname = path.resolve();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes
app.use('/', indexRouter);
app.use('/login', loginRouter);

// init server
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));