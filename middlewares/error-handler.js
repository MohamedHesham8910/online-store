function handleError(error,req,res,next){
    console.log(error);
    res.status(500).render('shared/500');
    next();
}

module.exports = handleError;