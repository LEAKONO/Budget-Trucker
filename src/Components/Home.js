import React from 'react';
import { Link } from 'react-router-dom'; 
import styled from 'styled-components';

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; 
    min-height: calc(100vh - 50px); 
    background-color: #3a3f47; 
    text-align: center;
    padding: 20px; 
    margin: 0; 
`;

const NeonText = styled.h1`
    font-size: 4em; 
    color: #fff; 
    text-shadow: 
        0 0 5px #00ff00, 
        0 0 10px #00ff00, 
        0 0 15px #00ff00,
        0 0 20px #00ff00; 
`;

const NeonSubtext = styled.p`
    font-size: 1.5em;
    color: #fff; 
    text-shadow: 
        0 0 5px #ff00ff, 
        0 0 10px #ff00ff, 
        0 0 15px #ff00ff; 
`;

const Quote = styled.p`
    font-size: 1.2em;
    color: #fff;
    margin: 20px 0;
    font-style: italic;
    text-shadow: 
        0 0 5px #00ff00,
        0 0 10px #00ff00;
`;

const ButtonContainer = styled.div`
    margin-top: 30px; 
`;

const Button = styled(Link)`
    background-color: #ff9900; 
    color: white;
    padding: 15px 30px; 
    border: none;
    border-radius: 5px; 
    font-size: 1.2em; 
    text-decoration: none; 
    margin: 10px; 
    transition: background-color 0.3s;

    &:hover {
        background-color: #cc7a00; 
    }
`;

const Home = () => {
    return (
        <HomeContainer>
            <NeonText>Your Financial Journey Starts Here!</NeonText>
            <NeonSubtext>Effortlessly manage your finances!</NeonSubtext>
            <Quote>
            "Financial freedom comes from managing what you earn. Prioritize saving and budgeting to ensure your money works for you."
            </Quote>
            <ButtonContainer>
                <Button to="add-expense">Ready to Add Expense?</Button>
                <Button to="add-income">Ready to Add Income?</Button>
            </ButtonContainer>
        </HomeContainer>
    );
};

export default Home;
