import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { scroller } from 'react-scroll'; // For smooth scrolling

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Styled Components
const LandingPageContainer = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: flex-end; /* Align items to the right */
  align-items: center;
  padding: 20px;
  background-color: #007bff;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    justify-content: space-between; /* Adjust for smaller screens */
    padding: 10px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-right: 20px; /* Add some space between links and login button */

  @media (max-width: 768px) {
    display: none; /* Hide nav links on smaller screens */
  }
`;

const NavLink = styled.div`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f0f0f0;
  }
`;

const LoginButton = styled(Link)`
  padding: 10px 20px;
  background-color: white;
  color: #007bff;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 768px) {
    padding: 8px 16px; /* Adjust button size for smaller screens */
  }
`;

const HeroSection = styled.div`
position: relative;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: flex-start; /* Move content higher */
align-items: center;
padding-top: 150px; /* Add padding to move content down slightly */
color: white;
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
overflow: hidden; /* Ensure animations don't overflow */
`;

const HeroImage = styled.img`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
object-fit: cover;
z-index: -1;
`;

const Letter = styled.span`
display: inline-block;
opacity: 0;
transform: translateY(20px);
animation: fadeInLetter 0.5s forwards;
animation-delay: ${({ delay }) => delay}s;

@keyframes fadeInLetter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

const AnimatedText = ({ text }) => {
return (
  <>
    {text.split("").map((char, index) => (
      <Letter key={index} delay={index * 0.1}>
        {char === " " ? "\u00A0" : char}
      </Letter>
    ))}
  </>
);
};

const Headline = styled.h1`
font-size: 3.5rem;
margin-bottom: 10px;
text-align: center;

@media (max-width: 768px) {
  font-size: 2.5rem;
}
`;

const Subheadline = styled.h2`
font-size: 1.8rem;
margin-bottom: 20px;
text-align: center;

@media (max-width: 768px) {
  font-size: 1.5rem;
}
`;

const CTAButton = styled(Link)`
padding: 15px 30px;
background-color: #007bff;
color: white;
text-decoration: none;
border-radius: 5px;
font-size: 1.2rem;
transition: background-color 0.3s ease;
opacity: 0;
animation: ${slideIn} 1s ease-in-out forwards;
animation-delay: 1.5s; /* Delay for the CTA button */

&:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  padding: 12px 24px; /* Adjust button size for smaller screens */
  font-size: 1rem;
}
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const FeatureCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #666;
`;

const WhyChooseUsSection = styled.div`
  margin-top: 40px;
  padding: 20px;
  background-color: #fff;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin: 15px 0;
`;

const CardText = styled.p`
  font-size: 1rem;
  color: #666;
`;

const TestimonialsSection = styled.div`
  margin-top: 40px;
  padding: 20px;
  background-color: #e9f5ff;
  border-radius: 10px;
`;

const TestimonialCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const TestimonialImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const TestimonialName = styled.h4`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const TestimonialText = styled.p`
  font-size: 1rem;
  color: #666;
`;

const ContactSection = styled.div`
  margin-top: 40px;
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 10px;
`;

const ContactInfo = styled.p`
  font-size: 1.1rem;
  color: #333;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const SocialLink = styled.a`
  color: #007bff;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #0056b3;
  }
`;

const Footer = styled.footer`
  margin-top: 40px;
  padding: 20px;
  background-color: #007bff;
  color: white;
  text-align: center;
`;

const FooterText = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const LandingPage = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);

  // Function to handle smooth scrolling
  const scrollToSection = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  // Feature data
  const features = [
    {
      title: 'Track your income and expenses effortlessly.',
      description:
        'Our platform allows you to easily track your income and expenses in one place. You can categorize transactions, set budgets, and view detailed reports to understand your spending habits.',
    },
    {
      title: 'Set and achieve financial goals.',
      description:
        'Set financial goals like saving for a vacation, paying off debt, or building an emergency fund. Our tools help you stay on track with progress tracking and reminders.',
    },
    {
      title: 'Visualize your spending with charts and reports.',
      description:
        'Get a clear picture of your finances with interactive charts and reports. Understand where your money is going and make informed decisions to improve your financial health.',
    },
  ];

  return (
    <LandingPageContainer>
      {/* Navigation Bar */}
      <NavBar>
        <NavLinks>
          <NavLink onClick={() => scrollToSection('features')}>Features</NavLink>
          <NavLink onClick={() => scrollToSection('why-choose-us')}>Why Choose Us</NavLink>
          <NavLink onClick={() => scrollToSection('contact')}>Contact</NavLink>
        </NavLinks>
        <LoginButton to="/login">Login</LoginButton>
      </NavBar>

      {/* Hero Section */}
      <HeroSection>
        <HeroImage src="https://images.pexels.com/photos/6328941/pexels-photo-6328941.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Hero" />
        <Headline>Take Control of Your Finances</Headline>
        <Subheadline>Start managing your money smarter today.</Subheadline>
        <CTAButton to="/signup">Get Started for Free</CTAButton>
      </HeroSection>

      {/* Features Section */}
      <div id="features">
        <h3>Features</h3>
        <FeaturesContainer>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesContainer>
      </div>

      {/* Why Choose Us Section */}
      <WhyChooseUsSection id="why-choose-us">
        <h3>Why Choose Us?</h3>
        <CardContainer>
          <Card>
            <CardTitle>Easy to Use</CardTitle>
            <CardText>Our platform is designed to be intuitive and user-friendly, so you can focus on your finances.</CardText>
          </Card>
          <Card>
            <CardTitle>Comprehensive Tools</CardTitle>
            <CardText>From budgeting to goal setting, we provide all the tools you need to succeed.</CardText>
          </Card>
          <Card>
            <CardTitle>Secure & Reliable</CardTitle>
            <CardText>Your data is safe with us. We use the latest security measures to protect your information.</CardText>
          </Card>
        </CardContainer>
      </WhyChooseUsSection>

      {/* Testimonials Section */}
      <TestimonialsSection>
        <h3>What Our Users Say</h3>
        <CardContainer>
          <TestimonialCard>
            <TestimonialImage src="https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Noni M" />
            <TestimonialName>John Doe</TestimonialName>
            <TestimonialText>"Great service! Helped me save more money."</TestimonialText>
          </TestimonialCard>
          <TestimonialCard>
            <TestimonialImage src="https://images.pexels.com/photos/415263/pexels-photo-415263.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Natasha" />
            <TestimonialName>Jane Smith</TestimonialName>
            <TestimonialText>"Highly recommended! Easy to use and effective."</TestimonialText>
          </TestimonialCard>
          <TestimonialCard>
            <TestimonialImage src="https://images.pexels.com/photos/2853592/pexels-photo-2853592.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Faith G" />
            <TestimonialName>Mike Johnson</TestimonialName>
            <TestimonialText>"The best financial tool I've ever used!"</TestimonialText>
          </TestimonialCard>
        </CardContainer>
      </TestimonialsSection>

      {/* Contact Section */}
      <ContactSection id="contact">
        <h3>Contact Us</h3>
        <ContactInfo>Email: leakonoemmanuel3@gmail.com</ContactInfo>
        <ContactInfo>Phone: +254 113535094</ContactInfo>
        <SocialLinks>
          <SocialLink href="https://github.com/LEAKONO" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/in/emmanuel-leakono-7125472b8/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </SocialLink>
          <SocialLink href="https://www.instagram.com/_jarisii_/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </SocialLink>
        </SocialLinks>
      </ContactSection>

      {/* Footer Section */}
      <Footer>
        <FooterText>&copy; 2023 Your Company. All rights reserved.</FooterText>
      </Footer>
    </LandingPageContainer>
  );
};

export default LandingPage;