function checkAuthorization(req,res,next){
    if(!res.locals.isAuth){
        res.redirect('/401');
        return;
    }

    if(!res.locals.isAdmin){
        res.redirect('/403');
        return;
    }

    next();
}

module.exports = checkAuthorization;