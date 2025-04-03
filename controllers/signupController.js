import * as db from '../db/queries.js';

const getSignup = (req, res) => {
    res.render('signup');
};

const postSignup = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        await db.insertUser(username, password);
        res.redirect('/folder/0');
    } catch (error) {
        next(error);
    }
}

export { getSignup, postSignup };
