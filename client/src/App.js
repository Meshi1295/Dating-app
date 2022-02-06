import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import PeopleCards from './components/peopleCards/PeopleCards';
import Signup from './components/registration/Register';
import Login from './components/login/Login';
import PrivateProfile from './components/privateProfile/PrivateProfile';
import Chat from './components/chat/Chat';
import Messenger from './components/Messenger/Messenger';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      sign_username: "",
      sign_password: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      login_username: "",
      login_password: "",
      login_info: "",
      submitRegi: true,
      submitLogin: true,
      show: true,
    };
  }


  successRegi = () => {
    const { sign_username, sign_password, lastName, email, firstName, phone } = this.state;
    if (
      sign_username != "" &&
      sign_password != "" &&
      lastName != "" &&
      email != "" &&
      phone != "" &&
      firstName != ""
    ) {
      this.setState({ submitRegi: false });

    } else {
      this.setState({ submitRegi: true });
    }
  };
  successLogin = () => {
    const { login_username, login_password } = this.state;
    if (login_username != "" && login_password != "") {
      this.setState({ submitLogin: false });
    } else {
      this.setState({ submitLogin: true });
    }
  };
  getLogin_username = (event) => {
    this.setState({ login_username: event.target.value });
    this.successLogin();
  };
  getLogin_password = (event) => {
    this.setState({ login_password: event.target.value });
    this.successLogin();
  };
  getSign_username = (event) => {
    this.setState({ sign_username: event.target.value });
    this.successRegi();
  };
  getSign_password = (event) => {
    this.setState({ sign_password: event.target.value });
    this.successRegi();
  };
  getFirsName = (event) => {
    this.setState({ firstName: event.target.value });
    this.successRegi();
  };
  getLastName = (event) => {
    this.setState({ lastName: event.target.value });
    this.successRegi();
  };
  getEmail = (event) => {
    this.setState({ email: event.target.value });
    this.successRegi();
  };
  getUserPhone = (event) => {
    this.setState({ phone: event.target.value })
    this.successRegi();
  };


  login = (event) => {
    event.preventDefault();
    const { login_username, login_password } = this.state;
    let username = login_username;
    let password = login_password;

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("sent request received detail");
        this.setState({ login_info: res });
        console.log("this is the res", res);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          login_info:
            "login information was not ok username or password not exist",
        });
      });
  };
  render() {
    const { submitRegi, register_info, submitLogin, login_info, login_username } = this.state;
    return (
      <div>
        <Header username={login_username} />
        <Routes>
          <Route
            path="/"
            element={
              <Signup
                submitRegi={submitRegi}
                register_info={register_info}
                getSign_username={this.getSign_username}
                getSign_password={this.getSign_password}
                getFirsName={this.getFirsName}
                getLastName={this.getLastName}
                getUserPhone={this.getUserPhone}
                getEmail={this.getEmail}
                userData={this.state}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                getLogin_username={this.getLogin_username}
                getLogin_password={this.getLogin_password}
                submitLogin={submitLogin}
                login_info={login_info}
                login={this.login}
              />
            }
          />
          <Route
            path='/PeopleCards'
            element={<PeopleCards
              username={this.state.login_username} />} />
          <Route path="/chat/:username_from/:username_to" element={<Chat />} />
          <Route path="/messenger/:login_username" element={<Messenger />} />
          <Route
            path='/profile'
            element={<PrivateProfile
              username={this.state.login_username} />} />
        </Routes>
      </div>
    );
  }
}
export default App;
