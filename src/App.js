import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Login from './components/user/Login';
import SignUp from './components/user/SignUp';
import Nav from './components/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as actions from './store/actions/auth';

function App(props) {
  useEffect(() => {
    props.onTryAutoSignin();
  });


  return (
    <div>
      <Router>
        <Nav />
        <Switch {...props}>
          <Route path="/" exact component={Home} />
          {props.isAuthenticated?<></>:<><Route path="/login" component={Login} /> <Route path="/signup" component={SignUp} /></>}
          
          <Route path="/logout" component={Home} />
          
        </Switch>
      </Router>
{/* 
      <Login {...props}></Login> */}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  }
}

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )

}
export default connect(mapStateToProps, mapDispatchToProps)(App);

