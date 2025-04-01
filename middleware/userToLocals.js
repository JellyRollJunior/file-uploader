const userToLocals = (req, res, next) => {
    res.locals.currentUser = req.user;
    next();
};

export { userToLocals };
