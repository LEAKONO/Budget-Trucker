import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { scroller } from 'react-scroll';
import { FiArrowRight, FiCheck, FiDollarSign, FiPieChart, FiTrendingUp, FiShield, FiSmartphone, FiBarChart2, FiTarget } from 'react-icons/fi';
import { FaGooglePlay, FaAppStore } from 'react-icons/fa';

// Keyframes for animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const LandingPageContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #2d3748;
  overflow-x: hidden;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 5%;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: fixed;
  width: 90%;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 1rem 5%;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #4a6cf7;
  display: flex;
  align-items: center;

  span {
    margin-left: 0.5rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.div`
  color: #4a5568;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;
  position: relative;

  &:hover {
    color: #4a6cf7;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #4a6cf7;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LoginButton = styled(Link)`
  padding: 0.6rem 1.2rem;
  color: #4a5568;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: #4a6cf7;
  }
`;

const SignupButton = styled(Link)`
  padding: 0.6rem 1.2rem;
  background-color: #4a6cf7;
  color: white;
  border-radius: 6px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(74, 108, 247, 0.2);

  &:hover {
    background-color: #3a5bd9;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(74, 108, 247, 0.3);
  }
`;

const MobileMenuButton = styled.div`
  display: none;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 999;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 1rem;
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 8rem 5% 4rem;
  background: linear-gradient(135deg, #f6f9ff 0%, #eef2ff 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 200%;
    background: radial-gradient(circle, rgba(74, 108, 247, 0.1) 0%, transparent 70%);
    z-index: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 6rem 5% 4rem;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  z-index: 1;
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 2rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #1a202c;
  background: linear-gradient(90deg, #4a6cf7, #6b46c1);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  @media (max-width: 1024px) {
    font-size: 2.8rem;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #4a5568;
  margin-bottom: 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled(Link)`
  padding: 1rem 2rem;
  background: linear-gradient(90deg, #4a6cf7, #6b46c1);
  color: white;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(74, 108, 247, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(74, 108, 247, 0.4);
  }
`;

const SecondaryButton = styled(Link)`
  padding: 1rem 2rem;
  background-color: white;
  color: #4a6cf7;
  border: 2px solid #4a6cf7;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f8f9ff;
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const HeroImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: relative;
`;

const HeroImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transform: perspective(1000px) rotateY(-10deg);
  transition: transform 0.5s ease;
  animation: ${pulse} 6s infinite ease-in-out;

  &:hover {
    transform: perspective(1000px) rotateY(0deg);
  }

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatNumber = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: #4a6cf7;
  line-height: 1;
`;

const StatLabel = styled.span`
  font-size: 0.875rem;
  color: #718096;
`;

const Section = styled.section`
  padding: 6rem 5%;
  position: relative;

  @media (max-width: 768px) {
    padding: 4rem 5%;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
  color: #1a202c;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  color: #4a5568;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background-color: rgba(74, 108, 247, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #4a6cf7;
  font-size: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a202c;
`;

const FeatureDescription = styled.p`
  color: #4a5568;
  line-height: 1.6;
`;

const HowItWorksSection = styled(Section)`
  background-color: #f8fafc;
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #4a6cf7, #6b46c1);
    z-index: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    &::before {
      display: none;
    }
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  width: 30%;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 350px;
  }
`;

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a6cf7, #6b46c1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const StepTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const StepDescription = styled.p`
  color: #4a5568;
  text-align: center;
  line-height: 1.6;
`;

const TestimonialsSection = styled(Section)`
  background: linear-gradient(135deg, #4a6cf7, #6b46c1);
  color: white;
`;

const WhiteSectionTitle = styled(SectionTitle)`
  color: white;
`;

const WhiteSectionSubtitle = styled(SectionSubtitle)`
  color: rgba(255, 255, 255, 0.9);
`;

const TestimonialsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TestimonialCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const TestimonialContent = styled.p`
  font-style: italic;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TestimonialAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const TestimonialAuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TestimonialAuthorName = styled.span`
  font-weight: 700;
`;

const TestimonialAuthorTitle = styled.span`
  font-size: 0.875rem;
  opacity: 0.8;
`;

const PricingSection = styled(Section)`
  background-color: #f8fafc;
`;

const PricingPlans = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const PricingCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);

  ${({ featured }) =>
    featured &&
    `
    border: 2px solid #4a6cf7;
    transform: scale(1.05);
    box-shadow: 0 10px 25px -5px rgba(74, 108, 247, 0.3);
    
    &::before {
      content: 'Most Popular';
      position: absolute;
      top: 0;
      right: 0;
      background-color: #4a6cf7;
      color: white;
      padding: 0.25rem 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      border-bottom-left-radius: 12px;
    }
  `}

  &:hover {
    transform: ${({ featured }) => (featured ? 'scale(1.07)' : 'translateY(-5px)')};
    box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.1);
  }
`;

const PricingTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1a202c;
`;

const PricingPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #1a202c;

  span {
    font-size: 1rem;
    font-weight: 500;
    color: #718096;
  }
`;

const PricingFeatures = styled.ul`
  margin-bottom: 2rem;
`;

const PricingFeature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: #4a5568;

  svg {
    color: #4a6cf7;
  }
`;

const PricingButton = styled(Link)`
  display: block;
  text-align: center;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: 1rem;

  ${({ featured }) =>
    featured
      ? `
    background: linear-gradient(90deg, #4a6cf7, #6b46c1);
    color: white;
    box-shadow: 0 4px 15px rgba(74, 108, 247, 0.3);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(74, 108, 247, 0.4);
    }
  `
      : `
    background-color: white;
    color: #4a6cf7;
    border: 2px solid #4a6cf7;

    &:hover {
      background-color: #f8f9ff;
      transform: translateY(-3px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
  `}
`;

const CtaSection = styled(Section)`
  background: linear-gradient(135deg, #4a6cf7, #6b46c1);
  color: white;
  text-align: center;
`;

const CtaContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CtaTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CtaSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Footer = styled.footer`
  background-color: #1a202c;
  color: white;
  padding: 4rem 5% 2rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const FooterColumn = styled.div`
  h4 {
    font-size: 1.125rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 2px;
      background-color: #4a6cf7;
    }
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.75rem;
  }

  a {
    color: #a0aec0;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: white;
    }
  }
`;

const FooterLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
`;

const FooterDescription = styled.p`
  color: #a0aec0;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: #4a6cf7;
    transform: translateY(-3px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: #a0aec0;
  margin: 0;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const FooterLink = styled.a`
  color: #a0aec0;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: white;
  }
`;

const AppDownloadSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const AppDownloadButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.5rem;
  }
`;

const AppDownloadText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AppDownloadLabel = styled.span`
  font-size: 0.75rem;
`;

const AppDownloadPlatform = styled.span`
  font-weight: 600;
`;

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
    setMobileMenuOpen(false);
  };

  const features = [
    {
      icon: <FiDollarSign />,
      title: 'Expense Tracking',
      description: 'Automatically categorize and track all your expenses in real-time with our smart AI-powered system.',
    },
    {
      icon: <FiPieChart />,
      title: 'Budget Planning',
      description: 'Create custom budgets and get alerts when you approach your spending limits in any category.',
    },
    {
      icon: <FiTrendingUp />,
      title: 'Investment Insights',
      description: 'Get personalized investment recommendations based on your financial goals and risk tolerance.',
    },
    {
      icon: <FiShield />,
      title: 'Security First',
      description: 'Bank-level encryption and multi-factor authentication to keep your financial data safe and secure.',
    },
    {
      icon: <FiSmartphone />,
      title: 'Mobile Friendly',
      description: 'Full-featured mobile apps for iOS and Android so you can manage your finances on the go.',
    },
    {
      icon: <FiBarChart2 />,
      title: 'Advanced Reports',
      description: 'Beautiful, interactive reports that help you visualize your financial health at a glance.',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Sign Up in Seconds',
      description: 'Create your account with just your email and a password. No credit card required to start.',
    },
    {
      number: '2',
      title: 'Connect Your Accounts',
      description: 'Securely link your bank accounts, credit cards, and investment accounts in minutes.',
    },
    {
      number: '3',
      title: 'Start Managing',
      description: 'Get insights, set budgets, track goals, and watch your financial health improve.',
    },
  ];

  const testimonials = [
    {
      content: 'This app completely transformed how I manage my money. I went from living paycheck to paycheck to saving $5,000 in just six months!',
      author: 'Sarah Johnson',
      title: 'Marketing Manager',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      content: 'As a freelancer, tracking irregular income was always stressful. Now I have complete visibility and control over my finances.',
      author: 'Michael Chen',
      title: 'Freelance Designer',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      content: 'The investment insights alone are worth the subscription. I increased my portfolio returns by 18% in the first year using their recommendations.',
      author: 'David Wilson',
      title: 'Financial Analyst',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
  ];

  const pricingPlans = [
    {
      title: 'Starter',
      price: '0',
      period: 'forever',
      features: [
        'Basic expense tracking',
        '3 budget categories',
        'Manual account entry',
        'Email support',
        'Community forum access',
      ],
      featured: false,
    },
    {
      title: 'Professional',
      price: '9',
      period: 'per month',
      features: [
        'Unlimited expense tracking',
        'Unlimited budget categories',
        'Automatic bank connections',
        'Investment tracking',
        'Priority email support',
        'Advanced reports',
      ],
      featured: true,
    },
    {
      title: 'Enterprise',
      price: '29',
      period: 'per month',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom reporting',
        'Team access controls',
        '24/7 phone support',
        'White-label options',
      ],
      featured: false,
    },
  ];

  return (
    <LandingPageContainer>
      {/* Navigation Bar */}
      <NavBar style={scrolled ? { boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' } : {}}>
        <Logo>
          <FiDollarSign />
          <span>FinTrack</span>
        </Logo>
        
        <NavLinks>
          <NavLink onClick={() => scrollToSection('features')}>Features</NavLink>
          <NavLink onClick={() => scrollToSection('how-it-works')}>How It Works</NavLink>
          <NavLink onClick={() => scrollToSection('pricing')}>Pricing</NavLink>
          <NavLink onClick={() => scrollToSection('testimonials')}>Testimonials</NavLink>
        </NavLinks>
        
        <AuthButtons>
          <LoginButton to="/login">Login</LoginButton>
          <SignupButton to="/signup">Get Started</SignupButton>
        </AuthButtons>
        
        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          ☰
        </MobileMenuButton>
      </NavBar>

      <MobileMenu isOpen={mobileMenuOpen}>
        <NavLink onClick={() => scrollToSection('features')}>Features</NavLink>
        <NavLink to="/#how-it-works">How It Works</NavLink>
        <NavLink onClick={() => scrollToSection('pricing')}>Pricing</NavLink>
        <NavLink onClick={() => scrollToSection('testimonials')}>Testimonials</NavLink>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <LoginButton to="/login" style={{ width: '100%', textAlign: 'center' }}>Login</LoginButton>
          <SignupButton to="/signup" style={{ width: '100%', textAlign: 'center' }}>Get Started</SignupButton>
        </div>
      </MobileMenu>

      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Take Control of Your Financial Future</HeroTitle>
          <HeroSubtitle>
            FinTrack gives you the tools and insights you need to make smarter financial decisions, 
            reduce stress, and achieve your money goals faster than you thought possible.
          </HeroSubtitle>
          <HeroButtons>
            <PrimaryButton to="/signup">
              Get Started for Free <FiArrowRight />
            </PrimaryButton>
            <SecondaryButton to="/demo">
              See How It Works
            </SecondaryButton>
          </HeroButtons>
          <StatsContainer>
            <StatItem>
              <StatNumber>250K+</StatNumber>
              <StatLabel>Happy Users</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>$1B+</StatNumber>
              <StatLabel>Managed</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>4.9★</StatNumber>
              <StatLabel>Average Rating</StatLabel>
            </StatItem>
          </StatsContainer>
        </HeroContent>
        <HeroImageContainer>
          <HeroImage 
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
            alt="FinTrack Dashboard" 
          />
        </HeroImageContainer>
      </HeroSection>

      {/* Features Section */}
      <Section id="features">
        <SectionTitle>Powerful Features to Transform Your Finances</SectionTitle>
        <SectionSubtitle>
          FinTrack combines cutting-edge technology with intuitive design to give you complete 
          control over your financial life.
        </SectionSubtitle>
        <FeaturesContainer>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesContainer>
      </Section>

      {/* How It Works Section */}
      <HowItWorksSection id="how-it-works">
        <SectionTitle>How FinTrack Works</SectionTitle>
        <SectionSubtitle>
          Getting started with FinTrack is quick and easy. Here's how you can take control 
          of your finances in just a few simple steps.
        </SectionSubtitle>
        <StepsContainer>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepNumber>{step.number}</StepNumber>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Step>
          ))}
        </StepsContainer>
      </HowItWorksSection>

      {/* Testimonials Section */}
      <TestimonialsSection id="testimonials">
        <WhiteSectionTitle>Trusted by Thousands of Users</WhiteSectionTitle>
        <WhiteSectionSubtitle>
          Don't just take our word for it. Here's what our users have to say about their 
          experience with FinTrack.
        </WhiteSectionSubtitle>
        <TestimonialsContainer>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index}>
              <TestimonialContent>"{testimonial.content}"</TestimonialContent>
              <TestimonialAuthor>
                <TestimonialAvatar src={testimonial.avatar} alt={testimonial.author} />
                <TestimonialAuthorInfo>
                  <TestimonialAuthorName>{testimonial.author}</TestimonialAuthorName>
                  <TestimonialAuthorTitle>{testimonial.title}</TestimonialAuthorTitle>
                </TestimonialAuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialsContainer>
      </TestimonialsSection>

      {/* Pricing Section */}
      <PricingSection id="pricing">
        <SectionTitle>Simple, Transparent Pricing</SectionTitle>
        <SectionSubtitle>
          Choose the plan that fits your needs. Start for free and upgrade anytime.
        </SectionSubtitle>
        <PricingPlans>
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} featured={plan.featured}>
              <PricingTitle>{plan.title}</PricingTitle>
              <PricingPrice>
                ${plan.price} <span>/ {plan.period}</span>
              </PricingPrice>
              <PricingFeatures>
                {plan.features.map((feature, idx) => (
                  <PricingFeature key={idx}>
                    <FiCheck /> {feature}
                  </PricingFeature>
                ))}
              </PricingFeatures>
              <PricingButton 
                to={plan.title === 'Starter' ? '/signup' : '/pricing'} 
                featured={plan.featured}
              >
                {plan.title === 'Starter' ? 'Get Started' : 'Choose Plan'}
              </PricingButton>
            </PricingCard>
          ))}
        </PricingPlans>
      </PricingSection>

      {/* App Download Section */}
      <Section style={{ backgroundColor: '#f8fafc' }}>
        <SectionTitle>Available on All Your Devices</SectionTitle>
        <SectionSubtitle>
          Take FinTrack with you wherever you go. Download our mobile app for iOS or Android.
        </SectionSubtitle>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <AppDownloadSection>
            <AppDownloadButton href="#">
              <FaAppStore size={24} />
              <AppDownloadText>
                <AppDownloadLabel>Download on the</AppDownloadLabel>
                <AppDownloadPlatform>App Store</AppDownloadPlatform>
              </AppDownloadText>
            </AppDownloadButton>
            <AppDownloadButton href="#">
              <FaGooglePlay size={24} />
              <AppDownloadText>
                <AppDownloadLabel>Get it on</AppDownloadLabel>
                <AppDownloadPlatform>Google Play</AppDownloadPlatform>
              </AppDownloadText>
            </AppDownloadButton>
          </AppDownloadSection>
        </div>
      </Section>

      {/* CTA Section */}
      <CtaSection>
        <CtaContainer>
          <CtaTitle>Ready to Transform Your Finances?</CtaTitle>
          <CtaSubtitle>
            Join thousands of users who are already taking control of their financial future 
            with FinTrack. Start your free trial today—no credit card required.
          </CtaSubtitle>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <PrimaryButton to="/signup" style={{ padding: '1rem 2.5rem' }}>
              Get Started for Free <FiArrowRight />
            </PrimaryButton>
            <SecondaryButton to="/demo" style={{ padding: '1rem 2.5rem' }}>
              Watch Demo
            </SecondaryButton>
          </div>
        </CtaContainer>
      </CtaSection>

      {/* Footer */}
      <Footer>
        <FooterContent>
          <FooterColumn>
            <FooterLogo>
              <FiDollarSign /> FinTrack
            </FooterLogo>
            <FooterDescription>
              The most powerful yet simple financial management platform to help 
              you achieve your money goals faster.
            </FooterDescription>
            <SocialLinks>
              <SocialLink href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </SocialLink>
              <SocialLink href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </SocialLink>
              <SocialLink href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </SocialLink>
            </SocialLinks>
          </FooterColumn>
          
          <FooterColumn>
            <h4>Product</h4>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Integrations</a></li>
              <li><a href="#">Roadmap</a></li>
            </ul>
          </FooterColumn>
          
          <FooterColumn>
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </FooterColumn>
          
          <FooterColumn>
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Tutorials</a></li>
              <li><a href="#">Webinars</a></li>
              <li><a href="#">API Docs</a></li>
            </ul>
          </FooterColumn>
          
          <FooterColumn>
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">GDPR</a></li>
              <li><a href="#">CCPA</a></li>
            </ul>
          </FooterColumn>
        </FooterContent>
        
        <FooterBottom>
          <Copyright>© 2023 FinTrack. All rights reserved.</Copyright>
          <FooterLinks>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Cookie Policy</FooterLink>
            <FooterLink href="#">Sitemap</FooterLink>
          </FooterLinks>
        </FooterBottom>
      </Footer>
    </LandingPageContainer>
  );
};

export default LandingPage;