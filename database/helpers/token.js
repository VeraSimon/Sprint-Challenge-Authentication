const jwt = require('jsonwebtoken');

const jwtKey = require('../../_secrets/keys').jwtKey;

const generateToken = (user) => {
	// no PII/sensitive data in the payload!!!
	const jwtPayload = { ...user };
	const jwtOptions = {
		expiresIn: '3m'
	};
	return jwt.sign(jwtPayload, jwtKey, jwtOptions);
};

module.exports = {
	generateToken
};
