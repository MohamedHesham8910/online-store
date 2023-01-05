function createUserSession(req,user,action){
    req.session.uid = user._id.toString();
    req.session.isAdmin = user.isAdmin;
    req.session.email = user.email;
    req.session.save(action);
}

function endUserSession(req) {
    req.session.uid = null;
  }

module.exports = {
    createUserSession: createUserSession,
    endUserSession: endUserSession
}