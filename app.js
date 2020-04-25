import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

class App extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    regSuccess: '',
  };

  handleChildSubmit() {
    //All Fields are not empty, update regSuccess state to true
    if (this.state.firstName && this.state.lastName && this.state.email && this.state.contact) {
      this.setState({ regSuccess: true });
    } else {
      this.setState({ regSuccess: false });
    }
  }

  //get input values
  handleChildInput(input) {
    this.setState(input);
  }

  //reset all states to empty
  handleResetState() {
    if (this.state.regSuccess === true) {
      this.setState({ regSuccess: '', firstName: '', lastName: '', contact: '', email: '' });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>Welcome to WMD Home Page</h1>
          <nav>
            <ul>
              <li>
                <Link to={'/'}>Home</Link>
              </li>
              <li>
                <Link to={'/register'}>Register</Link>
              </li>
            </ul>
          </nav>
          <hr />
          {this.state.regSuccess === true ? <Redirect to="/regsuccess" /> : ''}
          {/* reset state */}
          {this.handleResetState()}
          <Switch>
            <Route exact path="/" component={Home} />

            {/* registration */}
            <Route
              path="/register"
              render={(props) => (
                <Register
                  onChildSubmit={this.handleChildSubmit.bind(this)}
                  onChildInput={(props) => {
                    this.handleChildInput(props);
                  }}
                  regStatus={this.state.regSuccess}
                  resetStates={this.handleResetState.bind(this)}
                />
              )}
            />
            {/* registration */}

            <Route path="/regsuccess" component={RegSuccess} />

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

class Register extends React.Component {

    
  handleInput(event) {
    let name = event.target.name;

    this.props.onChildInput({ [name]: event.target.value });
  }

  handleRegistration() {
    this.props.onChildSubmit();
  }

  render() {
    // reset all states if registration successful previously
    if(this.props.regStatus === true) {
        this.props.resetStates();
    }
    return (
      <div>
        {/*Display error info if Registration failed */}
        {this.props.regStatus === false ? (
          <div className="div-error">
            <button className='btn-regstatus'>Registration Status:</button>
            <span>All Fields must have value</span>
          </div>
        ) : (
          ''
        )}

        <h1>User Registration</h1>
        <h3>First Name</h3>
        <input name="firstName" onChange={this.handleInput.bind(this)}></input>
        <h3>Last Name</h3>
        <input name="lastName" onChange={this.handleInput.bind(this)}></input>
        <h3>Email</h3>
        <input name="email" onChange={this.handleInput.bind(this)}></input>
        <h3>Contact Number</h3>
        <input name="contact" onChange={this.handleInput.bind(this)}></input>
        <button className='btn-register' onClick={this.handleRegistration.bind(this)}>Register</button>
      </div>
    );
  }
}

class Home extends React.Component {
  render() {
    return <h1>Welcome to WMD Home Page</h1>;
  }
}

class RegSuccess extends React.Component {
  render() {
    return <h1>Successfully Registered</h1>;
  }
}

export default App;
