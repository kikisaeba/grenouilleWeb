
function isAuthorized (req) {

  if (req.method === 'GET' && req.url === '/auth_token') {
    return true;
  }

  if (req.method === 'GET' && req.url === '/stats_scene_get') {
    return true;
  }

  if (!req.headers['authorization']) {
    return false;
  }

  if (req.headers['authorization'].indexOf('Bearer ') === -1 ) {
    return false;
  }

  if (req.headers['authorization'].length < 8) {
    return false;
  }

  return true;
};

module.exports = (req, res, next) => {

  if (isAuthorized(req)) {
    return next();
  }

  return res.status(401).json({});
};
