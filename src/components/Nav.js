import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../store/actions/auth';
const Nav = (props) => {
    return (
        <nav>
            <ul>
                {
                    props.token ?
                        <Link to='/' onClick={props.onSignOut}>
                            <li>Logout</li>
                        </Link> :
                        <>
                        <Link to='/login'>
                            <li>Login</li>
                        </Link>
                        <Link to='/signup'>
                        <li>Sign Up</li>
                    </Link></>
                }
                 
                <Link to='/'>
                    <li>Home</li>
                </Link>

            </ul>
        </nav>
    );
};
const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onSignOut: () => dispatch(actions.logout())
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(Nav);