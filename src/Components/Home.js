import React from 'react';
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

const Home = () => {
    return (
        <HomeContainer>
            <NeonText>Your Financial Journey Starts Here!</NeonText>
            <NeonSubtext>Effortlessly manage your finances!</NeonSubtext>
            <Quote>
                "It's not about how much money you make, but how much you keep. A budget is telling your money where to go instead of wondering where it went. Do not save what is left after spending, but spend what is left after saving. Financial freedom is available to those who learn about it and work for it."
            </Quote>
        </HomeContainer>
    );
};

export default Home;
