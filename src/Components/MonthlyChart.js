import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useAuth } from '../Contexts/AuthContext';
import './ChartStyles.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyBudgetChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });
    const { token } = useAuth();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/routes/transactions', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log('Fetched transactions:', response.data); // Log the fetched data

                const transactions = response.data.incomes.concat(response.data.expenses);
                processTransactions(transactions);
            } catch (error) {
                console.error('Error fetching transactions:', error.response?.data || error.message);
            }
        };

        const processTransactions = (transactions) => {
            const monthlyIncome = Array(12).fill(0);
            const monthlyExpenses = Array(12).fill(0);

            transactions.forEach(transaction => {
                const date = new Date(transaction.date);
                const month = date.getMonth(); // 0 = January, 11 = December

                if (transaction.source) {
                    monthlyIncome[month] += Number(transaction.amount); 
                } else if (transaction.category) { 
                    monthlyExpenses[month] += Number(transaction.amount); 
                }
            });

            console.log('Monthly Income:', monthlyIncome);
            console.log('Monthly Expenses:', monthlyExpenses);

            setChartData({
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Income',
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        data: monthlyIncome,
                    },
                    {
                        label: 'Expenses',
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        data: monthlyExpenses,
                    },
                ],
            });
        };

        fetchTransactions();
    }, [token]);

    return (
        <div className="chart-container">
            <h2 className="chart-heading">Monthly Income vs Expenses</h2>
            <div className="large-chart">
                <Bar data={chartData} />
            </div>
        </div>
    );
};

export default MonthlyBudgetChart;
