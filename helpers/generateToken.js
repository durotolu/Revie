const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    }
    const options = {
        expiresIn: '1h',
    }

    const result = jwt.sign(
        payload,
        process.env.NODE_ENV === 'development' ? 'this is supposed to be secret' : process.env.SECRET,
        options,
    )

    return result;
}

module.exports = generateToken;