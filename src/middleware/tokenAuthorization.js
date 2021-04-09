const jwt = require("jsonwebtoken");
const auth = require("../config/auth");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).send({ error: "Token não informado" });

  const [Bearer, token] = authorization.split(" ");

  if (!token) return res.status(401).send({ error: "Token mal formatado" });

  try {
    const payload = jwt.verify(token, auth.secret);
    req.employee_registration_number =
      payload.user_employee_registration_number;

    return next();
  } catch (error) {
    res.status(401).send({ error: "Token Invalido" });
  }
};
