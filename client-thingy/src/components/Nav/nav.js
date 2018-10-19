import React from 'react';
import { NavLink } from 'react-router-dom';
import Styled from 'styled-components';

const NavDiv = Styled.div`
    display: flex;
`;

const Nav = () => {
	return (
		<NavDiv>
			<NavLink exact to="/" activeClassName="activeLink">
				Home
			</NavLink>
			&nbsp;|&nbsp;
			<NavLink to="/login" activeClassName="activeLink">
				Login
			</NavLink>
			&nbsp;|&nbsp;
			<NavLink to="/register" activeClassName="activeLink">
				Register
			</NavLink>
			&nbsp;|&nbsp;
			<NavLink to="/jokes" activeClassName="activeLink">
				Jokes List
			</NavLink>
		</NavDiv>
	);
};

export default Nav;
