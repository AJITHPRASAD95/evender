const jwt = require('jsonwebtoken');
function auth(req, _res, next) {
  try {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
    if (!token) throw Object.assign(new Error('Authentication required'), { status: 401 });
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) { error.status = 401; next(error); }
}
module.exports = { auth };
