import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Login from './components/user/Login';
import SignUp from './components/user/SignUp';
import BrowseItems from './components/Items/BrowseItems';
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
          <Route path="/" exact component={BrowseItems} />
          {props.isAuthenticated?<></>:<><Route path="/login" component={Login} /> <Route path="/signup" component={SignUp} /></>}
          <Route path="/logout" component={BrowseItems} />
          
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


export default connect(mapStateToProps, mapDispatchToProps)(App);

