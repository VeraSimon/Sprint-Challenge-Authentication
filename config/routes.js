const axios = require('axios');

const { authenticate } = require('./middlewares');
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
			password: req.body.password,
			department: req.body.department
		};
		const hash = bcrypt.hashSync(newUser.password, 13);
		newUser.password = hash;

		usersTable
			.addNewUser(newUser)
			.then((id) => {
				// res.status(201).json({ newUserId: id[0] });
				usersTable
					.findUser(newUser.username)
					.then((user) => {
						const token = tokenHelper.generateToken(user.id);
						// I'd normally do a status(200) here, but ya can't send more than one response, and we need to affirm the user was created successfully
						res.status(201).json({
							message: 'success!',
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
}

function getJokes(req, res) {
	axios
		.get(
			'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
		)
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
