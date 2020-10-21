import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Login from './components/user/Login';
import SignUp from './components/user/SignUp';
import BrowseItems from './components/Items/BrowseItems';
import Cart from './components/Items/Cart';
import MyItems from './components/Items/MyItems/MyItems';
import ChangePassword from './components/user/ChangePassword'
import Nav from './components/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as actions from './store/actions/auth';


function App(props) {
  useEffect(() => {
    props.onTryAutoSignin();
 
  });


  return (
    <>
      <Router>
        <Nav />
        <Switch>
        <Route path="/main/" exact  component={BrowseItems}/>
         {props.token? <><Route path="/main/cart" component={Cart}/>
          <Route path="/main/myitems" component={MyItems}/>
          <Route path="/main/change_password" component={ChangePassword}/>
          </>:<> 
          <Route path="/main/login" component={Login} /> 
          <Route path="/main/signup" component={SignUp} /></>}
       
        </Switch>
      </Router>

    </>
  );
}
const mapStateToProps = (state) => {
  return {
      token: state.authReducer.token,
     

  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);

