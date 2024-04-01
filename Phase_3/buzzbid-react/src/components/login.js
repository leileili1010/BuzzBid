import React, {useRef, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {MDBContainer, MDBInput, MDBBtn} from 'mdb-react-ui-kit';

function Login() {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState('');
    const nav = useNavigate();

    const handleLogin = async() => {
      try {
          if (!username || !password) {
              setError("Please enter your username and password to log in.");
          } else {
              const response = await axios.post("http://localhost:8081/auth/login", {
                  username, password
              });

              nav('/dashboard');
          }
      } catch (error) {
          setError('Invalid username or password. Please try again.');
      }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-lg p-4" style={{width: '500px', height: 'auto'}}>
                <MDBContainer className="p-3">
                    <h2 className="mb-4 text-center">Log In</h2>
                    <MDBInput wrapperClass='mb-4' placeholder='Username' id='username' value={username} type='email'
                              onChange={(e) => setUsername(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4' placeholder='Password' id='password' type='password' value={password}
                              onChange={(e) => setPassword(e.target.value)}/>
                    {error && <p className="text-danger">{error}</p>}
                    <button className="mb-4 d-block btn-primary" style={{height: '50px', width: '100%'}}
                            onClick={handleLogin}>Log In
                    </button>
                    <div className="text-center">
                        <p>Not registered? <a href="/register">Register</a></p>
                    </div>
                </MDBContainer>
            </div>
        </div>
    );
}

export default Login;