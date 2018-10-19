import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

const JokeDiv = Styled.div`
    background-color: lightgray;
    border-radius: 5px;
    padding: 10px;
    margin: 15px;
    width: 400px;
`;

const Joke = (props) => {
	return (
		<JokeDiv>
			<h4>{props.joke.type}</h4>
			<p>{props.joke.setup}</p>
			<p>{props.joke.punchline}</p>
		</JokeDiv>
	);
};

Joke.propTypes = {
	joke: PropTypes.shape({
		id: PropTypes.number,
		type: PropTypes.string.isRequired,
		setup: PropTypes.string.isRequired,
		punchline: PropTypes.string.isRequired
	})
};

export default Joke;
