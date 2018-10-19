const axios = require('axios');
const bcrypt = require('bcryptjs');

const { authenticate } = require('./middlewares');
const { generateToken } = require('../database/helpers/token');
const usersTable = require('../database/helpers/usersmodel');

module.exports = (server) => {
	server.post('/api/register', register);
	server.post('/api/login', login);
	server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
	// implement user registration
	if (req.body.username && req.body.password) {
		const newUser = {
			username: req.body.username,
			password: req.body.password
		};
		const hash = bcrypt.hashSync(newUser.password, 13);
		newUser.password = hash;

		usersTable
			.addNewUser(newUser)
			.then((id) => {
				usersTable
					.authUser(newUser.username)
					.then((user) => {
						const token = generateToken(user.id);
						// I'd normally do a status(200) here, but ya can't send more than one response, and we need to affirm the user was created successfully
						res.status(201).json({
							message: `Affirmative, ${user.username}. I read you.`,
							token
						});
					})
					.catch((err) => {
						res.status(500).json({ error: err });
					});
			})
			.catch((err) => {
				res.status(500).json({ error: err });
			});
	} else {
		res.status(400).json({ error: 'Missing properties!' });
	}
}

function login(req, res) {
	// implement user login
	const credentials = {
		username: req.body.username,
		password: req.body.password
	};

	usersTable
		.authUser(credentials.username)
		.then((user) => {
			if (user && bcrypt.compareSync(credentials.password, user.password)) {
				const token = generateToken(user.id);
				res.status(200).json({
					message: `Affirmative, ${user.username}. I read you.`,
					token
				});
			} else {
				res.status(401).json({ error: 'You shall not pass!' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
}

function getJokes(req, res) {
	axios
		.get('https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten')
		.then((response) => {
			res.status(200).json(response.data);
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Error Fetching Jokes',
				error: err
			});
		});
}
