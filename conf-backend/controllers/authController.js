exports.login = ((req, res) => {
    let {pass} = req.body;
    pass = String(pass).toLowerCase();
    //less secure form, doesnt need ans to same Q
    if(pass == process.env.MASPASS){
        // req.session.auth="admin";
        res.status(200).send("admin")
    }
    else if(pass == process.env.ANS1 || pass == process.env.ANS2){
        // req.session.auth="auth";
        res.status(200).send("auto")
    }
    else{
        // req.session.auth="noauth";
        res.status(200).send("noauth")
    }
})

exports.checkAuth = ((req, res, next) => {
    // if(req.session.auth == "auth" || req.session.auth == "admin"){
    //     next();
    // }
    // else{
    //     res.status(401).send('Not logged in');
    // }
})