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
        res.status(200).send("auth")
    }
    else{
        // req.session.auth="noauth";
        res.status(200).send("noauth")
    }
})

// exports.checkAdmin = ((req, res, next) => {
//     console.log('reached check admin')
//     if(req.session.auth == "admin") next();
//     else res.status(400).send("Not admin!")
// })

exports.checkAuth = ((req, res, next) => {

    // console.log('reached check log', "session : ", req.session)
    if(req.body.api_key == process.env.API_SECRET) next();
    else res.status(400).send("Please login first")
})