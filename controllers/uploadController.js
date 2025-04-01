const getUpload = (req, res) => {
    res.render('upload');
};

const postUpload = (req, res) => {
    console.log(req.file);
    res.redirect('/upload');
};

export { getUpload, postUpload };
