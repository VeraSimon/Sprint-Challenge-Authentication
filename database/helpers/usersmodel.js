const db = require('../dbConfig');

// addNewUser({username: 'string', password: 'hashed string'}) -> [id: int]
const addNewUser = (userObj) => {
	return db('users')
		.insert(userObj)
		.into('users');
};

// findUser(username) -> {id: int, username: 'string', password: 'hashed string'}
const findUser = (userObj) => {
	return db('users')
		.where({ username: userObj })
		.first();
};

module.exports = {
	addNewUser,
	findUser
};
