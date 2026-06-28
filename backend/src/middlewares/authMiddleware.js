const jwt = require('jsonwebtoken');
function auth(req, _res, next) {
  try {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
    if (!token) throw Object.assign(new Error('Authentication required'), { status: 401 });
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) { error.status = 401; if(error.name==='JsonWebTokenError'||error.name==='TokenExpiredError')error.message='Session expired. Please sign in again.'; next(error); }
}
module.exports = { auth };
