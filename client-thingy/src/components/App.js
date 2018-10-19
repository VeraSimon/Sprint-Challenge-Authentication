import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Nav from './Nav/nav';
import Home from './Home/home';
import Login from './Login/login';
import Register from './Register/register';
import JokesList from './Jokes/jokeslist';

class App extends Component {
	render() {
		return (
			<div>
				<Nav />
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/jokes" component={JokesList} />
			</div>
		);
	}
}

export default App;
