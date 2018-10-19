import React, { Component } from 'react';
import Axios from 'axios';
import Styled from 'styled-components';

import Joke from './joke';

const JokesContainer = Styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;

const Refresh = Styled.h6`
    text-align: right;
    cursor: pointer;
    margin-right: auto;
`;

class JokesList extends Component {
	state = {
		jokes: [],
		error: {}
	};

	componentDidMount = () => {
		this.youGotJokes();
	};

	youGotJokes = () => {
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
				<Refresh onClick={this.youGotJokes}>refresh</Refresh>
				<JokesContainer>
					{this.state.error && this.state.error.status ? (
						<p>{`HTTP ${this.state.error.status}: ${
							this.state.error.statusText
						}`}</p>
					) : (
						this.state.jokes.map((joke) => (
							<Joke joke={joke} key={joke.id * Math.random()} />
						))
					)}
				</JokesContainer>
			</div>
		);
	}
}

export default JokesList;
