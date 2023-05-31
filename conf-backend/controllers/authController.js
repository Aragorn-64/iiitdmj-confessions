const jwt = require('jsonwebtoken');
const Cookies = require('universal-cookie');

exports.loginJWT = (req, res) => {
  const { pass } = req.body;
  const lowerCasePass = String(pass).toLowerCase();
  let authType = "noauth";

  if (lowerCasePass === process.env.MASPASS) {
    authType = "admin";
  } else if (lowerCasePass === process.env.ANS1 || lowerCasePass === process.env.ANS2) {
    authType = "auth";
  }

  const jtoken = jwt.sign({ authType }, process.env.JWT_KEY);
  const cookies = new Cookies(req.headers.cookie);
  cookies.set('token', jtoken, { httpOnly: true });

  res.send({ authType, token: jtoken });
};

exports.checkAuthJWT = (req, res, next) => {
  try {
    const cookies = new Cookies(req.headers.cookie);
    const jtoken = cookies.get('token');
    if (!jtoken) {
      return res.status(400).send("Please log in (auth)");
    }
    const payload = jwt.verify(jtoken, process.env.JWT_KEY);
    if (payload.authType === "auth" || payload.authType === "admin") {
      next();
    } else {
      res.status(400).send("Please log in");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

exports.checkAdminJWT = (req, res, next) => {
  try {
    const cookies = new Cookies(req.headers.cookie);
    const jtoken = cookies.get('token');
    if (!jtoken) {
      return res.status(400).send("Please log in (admin)");
    }
    const payload = jwt.verify(jtoken, process.env.JWT_KEY);
    if (payload.authType === "admin") {
      next();
    } else {
      res.status(400).send("Not admin!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};
