import React, { Component } from 'react';
import Axios from 'axios';

import Joke from './joke';

class JokesList extends Component {
	state = {
		jokes: [],
		error: {}
	};

	componentDidMount = () => {
		const endpoint = 'http://localhost:3300/api/jokes';
		const token = localStorage.getItem('userToken');
		const options = {
			headers: {
				Authorization: token
			}
		};

		Axios.get(endpoint, options)
			.then((res) => {
				this.setState({
					...this.state,
					jokes: res.data
				});
			})
			.catch((err) => {
				// console.error('Error:\n', err.response);
				this.setState({
					...this.state,
					error: err.response
				});
			});
	};

	render() {
		return (
			<div>
				{this.state.error && this.state.error.status ? (
					<p>{`HTTP ${this.state.error.status}: ${
						this.state.error.statusText
					}`}</p>
				) : (
					this.state.jokes.map((joke) => (
						<Joke joke={joke} key={joke.id * Math.random()} />
					))
				)}
			</div>
		);
	}
}

export default JokesList;
