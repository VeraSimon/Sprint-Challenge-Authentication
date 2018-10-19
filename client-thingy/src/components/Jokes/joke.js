import React from 'react';
import PropTypes from 'prop-types';

const Joke = (props) => {
	return (
		<div>
			<h5>{props.joke.type}</h5>
			<p>{props.joke.setup}</p>
			<p>{props.joke.punchline}</p>
		</div>
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
