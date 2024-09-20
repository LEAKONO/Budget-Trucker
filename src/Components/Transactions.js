import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../Contexts/AuthContext';  // Importing useAuth from your AuthContext

const Transactions = () => {
  const { token } = useAuth(); // Get the token from your AuthContext
  const [transactions, setTransactions] = useState({ incomes: [], expenses: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/routes/transactions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Use token from AuthContext
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }

        const data = await response.json();
        setTransactions(data); 
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (token) { 
      fetchTransactions();
    }
  }, [token]);  

  if (loading) {
    return <Container>Loading transactions...</Container>;
  }

  if (error) {
    return <Container>Error: {error}</Container>;
  }

  const { incomes, expenses } = transactions;

  return (
    <Container>
      <div>
        <Heading>Incomes</Heading>
        <List>
          {incomes.length === 0 ? (
            <ListItem>No incomes available</ListItem>
          ) : (
            incomes.map((income) => (
              <ListItem key={income.id}>
                <Description>
                  {income.amount} - {income.source} - {income.date} - {income.description}
                </Description>
              </ListItem>
            ))
          )}
        </List>
      </div>

      <div>
        <Heading>Expenses</Heading>
        <List>
          {expenses.length === 0 ? (
            <ListItem>No expenses available</ListItem>
          ) : (
            expenses.map((expense) => (
              <ListItem key={expense.id}>
                <Description>
                  {expense.amount} - {expense.category} - {expense.date} - {expense.description}
                </Description>
              </ListItem>
            ))
          )}
        </List>
      </div>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f4f4f4;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  margin: 20px 0;
  font-size: 24px;
  color: #333;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
  color: #333;

  &:last-child {
    border-bottom: none;
  }
`;

const Description = styled.span`
  color: #555;
`;

export default Transactions;
