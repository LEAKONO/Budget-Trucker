import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoo from '../Style/money.jpeg'; 
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin'; 

gsap.registerPlugin(TextPlugin);

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState(''); 
  const navigate = useNavigate();
  
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline();
    timeline.fromTo(cardRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" });
    timeline.fromTo(titleRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1.5, ease: "power4.out", delay: 0.5 });
    timeline.fromTo(buttonRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)", delay: 0.5 });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError("Passwords must match!");
      return;
    }

    const signupData = { username, email, password };
    setLoading(true);

    try {
      const response = await axios.post('https://budget-trucker-b.onrender.com/auth/signup', signupData);
      if (response.status === 200 || response.status === 201) {
        const { token } = response.data; 
        localStorage.setItem('token', token);
        
        setWelcomeMessage(`Thank you for choosing us, ${username}! You're all set.`);
        navigate('/dashboard'); 
      } else {
        throw new Error(response.data.message || 'Signup failed');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Signup error, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card ref={cardRef}>
        <h1 ref={titleRef}>Create Account</h1>
        <Message>Fill in the details to create your account and get started!</Message> 
        {welcomeMessage && <WelcomeMessage>{welcomeMessage}</WelcomeMessage>} 
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <Logo src={logoo} alt="Logo" />
          <Input type="text" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} />
          <Input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
          <Input type="password" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} />
          <Button ref={buttonRef} type="submit" disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</Button>
        </Form>
        <LogIn>
          <span>Already have an account? </span>
          <Link to="/login">Login</Link>
        </LogIn>
      </Card>
    </Container>
  );
};

export default Signup;


// Styled Components
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

const LogIn = styled.div`
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

const Message = styled.div` 
  font-size: 16px; 
  color: #555;
  margin-bottom: 15px;
`;
