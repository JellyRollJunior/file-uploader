const getIndex = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/folder/0');
    }
    res.render('index');
};

export { getIndex };
