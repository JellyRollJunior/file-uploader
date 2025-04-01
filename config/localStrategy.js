import passportLocal from 'passport-local';
import * as db from '../db/queries.js';
const LocalStrategy = passportLocal.Strategy;

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

export { local }