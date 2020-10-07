import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Login from './components/user/Login';
import SignUp from './components/user/SignUp';
import BrowseItems from './components/Items/BrowseItems';
import Cart from './components/Items/Cart';
import MyItems from './components/Items/MyItems';
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
        <Switch>
          <Route path="/" exact  component={BrowseItems}/>
          <Route path="/login" component={Login} /> 
          <Route path="/signup" component={SignUp} />
          <Route path="/cart" component={Cart}/>
          <Route path="/myitems" component={MyItems}/>
          
        </Switch>
      </Router>
{/* 
      <Login {...props}></Login> */}
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  }
}


export default connect(null,mapDispatchToProps)(App);

