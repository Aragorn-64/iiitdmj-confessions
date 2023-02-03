const jwt = require('jsonwebtoken')

exports.loginJWT = (req, res) => {
    let {pass} = req.body;
    pass = String(pass).toLowerCase();
    let Type = "noauth"
    if(pass == process.env.MASPASS){
        Type = "admin"
    }
    else if(pass == process.env.ANS1 || pass == process.env.ANS2){
        Type = "auth"
    }

    let jtoken = jwt.sign({
        authType : Type
    }, process.env.JWT_KEY)
    res.cookie("token", jtoken, {
        httpOnly : true, 
        // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
    }).send({authType : Type, token: jtoken})
}

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

exports.checkAuthJWT = (req, res, next) => {
    try {
        let jtoken = req.cookies.token
        console.log("token: ", jtoken)
        let payload = jwt.verify(jtoken, process.env.JWT_KEY)
        if(payload.authType == "auth" || payload.authType == "admin") next()
        else res.status(400).send("Please login")

    } 
    catch (err) {
        console.log(err)
        if(!req.cookies || !req.cookies.token) res.status(400).send("cookie empty : likely not logged in!")
        else res.status(500).send(err)
    }
}

exports.checkAdminJWT = (req, res, next) => {
    try {
        let jtoken = req.cookies.token
        console.log("token: ", jtoken)
        let payload = jwt.verify(jtoken, process.env.JWT_KEY)
        if(payload.authType == "admin") next()
        else res.status(400).send("Not admin!")

    } 
    catch (err) {
        console.log(err)
        if(!req.cookies || !req.cookies.token) res.status(400).send("cookie empty : likely not logged in!")
        else res.status(500).send(err)
    }
}

// exports.checkAuth = ((req, res, next) => {

//     // console.log('reached check log', "session : ", req.session)
//     if(req.body.api_key == process.env.API_SECRET) next();
//     else res.status(400).send("Please login first")
// })