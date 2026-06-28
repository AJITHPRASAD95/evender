const allow = (...roles) => (req, _res, next) => roles.includes(req.user?.role) ? next() : next(Object.assign(new Error('Forbidden'), { status: 403 }));
module.exports = { allow };
