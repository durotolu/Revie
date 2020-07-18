module.exports = {
  checkUserInput,
};

function checkUserInput(req, res, next) {
  let user = req.body;
  if (user.username && user.password) {
    next();
  } else {
    res.status(403).json({ message: 'missing required field' });
  };
};