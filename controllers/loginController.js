import passport from 'passport';

const getLogin = (req, res) => {
    res.render('login');
};

const postLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(new Error('There was an error logging in'));
        }
        if (!user) {
            console.log('no user');
            return res.render('login', { errors: [{ msg : info.message }] });
        }
        console.log('logged in');
        req.login(user, (err) => {
            if (err) {
                return next(new Error('There was an issue logging in'));
            }
            res.redirect('/');
        });
    })(req, res, next);
};

export { getLogin, postLogin };
