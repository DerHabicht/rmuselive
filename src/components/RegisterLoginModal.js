import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from "react-modal-bootstrap";
import button, { Tabs, Tab } from "react-bootstrap";
import React, { Component } from "react";
import agent from "../agent";
//connecting to user agent to login, now user,


class RegisterLoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      Email: "",
      Password: ""
    };
    this.ChangeFirstname = this.ChangeFirstname.bind(this);
    this.ChangeLastname = this.ChangeLastname.bind(this);
    this.ChangeUsername = this.ChangeUsername.bind(this);
    this.ChangeEmail = this.ChangeEmail.bind(this);
    this.ChangePassword = this.ChangePassword.bind(this);
  }
  openModal = () => {
    this.setState({
      isOpen: true
    });
  };

  hideModal = () => {
    this.setState({
      isOpen: false
    });
  };

  SignUp = event => {
    event.preventDefault();
    agent.Auth.register(
      this.state.Username,
      this.state.Email,
      this.state.Password
    )
      .then(loggedInUser => {
        console.log("Signed-Up");
      })
      .then(payload =>
        this.props.history.push(`/ProfileScreen/${payload.username}`)
      )
      .catch(err => {
        console.log("SIGN UP ERROR", err);
      });
  };

  LogIn = event => {
    event.preventDefault();
    agent.Auth.login(this.state.Email, this.state.Password)
      .then(payload => {
        console.log(`look at the unique user heheheh ${payload.username}`);
      })
      .then(payload =>
        this.props.history.push(`/ProfileScreen/${payload.username}`)
      )
      .catch(err => {
        console.log("LOG IN ERROR", err);
      });
  };

  ChangeFirstname(e) {
    this.setState({ Firstname: e.target.value });
  }

  ChangeLastname(e) {
    this.setState({ Lastname: e.target.value });
  }

  ChangeUsername(e) {
    this.setState({ Username: e.target.value });
  }

  ChangeEmail(e) {
    this.setState({ Email: e.target.value });
  }

  ChangePassword(e) {
    this.setState({ Password: e.target.value });
  }

  render() {
    console.log("LOGIN MODAL STATE", this.state);
    return (
      <div>
        <button onClick={this.openModal} style={{ height: 40, width: 150 }}>
          Register/Log-in
        </button>
        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal} />
            <ModalTitle>Welcome to RmuseLive</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Tabs defaultActiveKey={1} id="login-tabs">
              <Tab
                eventKey={1}
                title="Login"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h1>Login</h1>
                <div>
                  <label htmlFor="Email">Email:</label>
                  <input
                    type="text"
                    name="Email"
                    onChange={event =>
                      this.setState({ Email: event.target.value })
                    }
                  />
                  {/* <input type="text" name="Email" onChange={this.ChangeEmail} /> */}
                </div>
                <div>
                  <label htmlFor="Password">Password:</label>
                  <input
                    type="password"
                    name="Password"
                    onChange={this.ChangePassword}
                  />
                </div>
                <a href="ProfileScreen">
                  {" "}
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={this.Login}
                  >
                    Login
                  </button>
                </a>
              </Tab>
              <Tab
                eventKey={2}
                title="Sign Up"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h1>Sign Up</h1>
                <div>
                  <label htmlFor="Username">Username:</label>
                  <input
                    type="text"
                    name="Username"
                    onChange={event => this.ChangeUsername(event)}
                  />
                </div>
                <div>
                  <label htmlFor="Firstname">First Name:</label>
                  <input
                    type="text"
                    name="Firstname"
                    onChange={event => this.ChangeFirstname(event)}
                  />
                </div>
                <div>
                  <label htmlFor="Lastname">Last Name:</label>
                  <input
                    type="text"
                    name="Lastname"
                    onChange={event => this.ChangeLastname(event)}
                  />
                </div>
                <div>
                  <label htmlFor="Email">Email:</label>
                  <input type="text" name="Email" onChange={this.ChangeEmail} />
                </div>
                <div>
                  <label htmlFor="Password">Password:</label>
                  <input
                    type="password"
                    name="Password"
                    onChange={event => this.ChangePassword(event)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={this.SignUp}
                >
                  SignUp
                </button>
              </Tab>
            </Tabs>
          </ModalBody>
          <ModalFooter />
        </Modal>
      </div>
    );
  }
}
export default RegisterLoginModal;
