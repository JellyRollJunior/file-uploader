import passport from 'passport';
import * as db from '../db/queries.js';
import { local } from './localStrategy.js';

passport.use(local);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.getUserById(id);
        done(null, user); // attaches user object to `req.user` 
    } catch (error) {
        done(error);
    }
})

export { passport }