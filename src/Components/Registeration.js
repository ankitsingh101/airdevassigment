import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import Login from "./Login";

function Registration() {
    const [userID, setUserID] = useState(Math.floor(Math.random() * 90 + 10));
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const [flag, setFlag] = useState(false);
    const [login, setLogin] = useState(true);

    function handleFormSubmit(e) {
        e.preventDefault();
    
        if (!userID || !email || !password) {
          setFlag(true);
        } else {
          setFlag(false);
          localStorage.setItem("User_ID", JSON.stringify(userID));
          localStorage.setItem("Email", JSON.stringify(email));
          localStorage.setItem("Password", JSON.stringify(password));
          setLogin(!login);
        }
      }
    
      function handleClick() {
        setLogin(!login);
      }

      return (
        <>
            <div>
              {login ? (
                <form onSubmit={handleFormSubmit}>
                  <h3>Register</h3>
    
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
    
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>
    
                  
    
                  
    
                  <button type="submit" className="btn btn-dark btn-lg btn-block">
                    Register
                  </button>
                  <p onClick={handleClick} className="forgot-password text-right">
                    Already registered{" "}log in?
                    
                  </p>
                  {flag && (
                    <Alert color="primary" variant="danger">
                      I got it you are in hurry! But every Field is important!
                    </Alert>
                  )}
                </form>
              ) : (
                <Login />
              )}
            </div>
        
        </>
      );
}

export default Registration;