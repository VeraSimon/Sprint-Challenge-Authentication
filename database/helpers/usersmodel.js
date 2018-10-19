const db = require('../dbConfig');

// addNewUser({username: 'string', password: 'hashed string'}) -> [id: int]
const addNewUser = (userObj) => {
	return db('users')
		.insert(userObj)
		.into('users');
};

// authUser(username) -> {id: int, username: 'string', password: 'hashed string'}
const authUser = (username) => {
	return db('users')
		.where({ username })
		.first();
};

module.exports = {
	addNewUser,
	authUser
};
