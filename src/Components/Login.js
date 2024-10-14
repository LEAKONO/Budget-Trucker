import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../Style/money.jpeg';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin'; 

gsap.registerPlugin(TextPlugin);

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const [userName, setUserName] = useState(''); 
  const [welcomeMessage, setWelcomeMessage] = useState(''); 

  useEffect(() => {
    const timeline = gsap.timeline();
    timeline.fromTo(cardRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" });
    timeline.fromTo(titleRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1.5, ease: "power4.out", delay: 0.5 });
    timeline.fromTo(buttonRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)", delay: 0.5 });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(username, password);
      setUserName(username); 
      setWelcomeMessage(`Hello again, ${username}! Let’s get you logged in and back on track with your finances.`);
      navigate('/dashboard');
    } catch (error) {
      setError('Login failed. Check your credentials and try again.');
    }
  };

  return (
    <Container>
      <Card ref={cardRef}>
        <h1 ref={titleRef}>Login</h1>
        {welcomeMessage && <WelcomeMessage>{welcomeMessage}</WelcomeMessage>} 
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <Logo src={logo} alt="Budget Trucker Logo" />
          <Input type="text" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} />
          <Input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
          <Button ref={buttonRef} type="submit">Login</Button>
        </Form>
        <SignUp>
          <span>Don’t have an account? </span>
          <a href="/signup">Sign Up</a>
        </SignUp>
      </Card>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0; 
`;

const Card = styled.div`
  background: #fff;
  padding: 30px; 
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); 
  border-radius: 10px; 
  width: 400px;
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
  margin: 20px 0;
`;

const Logo = styled.img`
  display: block;
  margin: 0 auto 20px;
  width: 120px; 
`;

const Input = styled.input`
  width: 100%;
  padding: 12px; 
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px; 
  font-size: 16px; 
`;

const Button = styled.button`
  background: #007bff;
  color: #fff;
  padding: 12px; 
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 18px; 

  &:hover {
    background: #0056b3;
  }
`;

const SignUp = styled.div`
  margin-top: 20px;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const WelcomeMessage = styled.div`
  color: green; 
  margin-bottom: 10px;
`;
