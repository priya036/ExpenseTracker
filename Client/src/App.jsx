import React, { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';
import { GlobalContext, GlobalProvider } from './Context/GlobalState'
import { useContext } from 'react';
import AddTransaction from './components/AddTransaction'
import Balance from './components/Balance'
import Header from './components/Header'
import IncomeExp from './components/IncomeExp'
import TranscationList from './components/TransactionList'
import { getTransactions, addTransaction, deleteTransaction } from './components/API';


function App() {

  const { setData } = useContext(GlobalContext);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []); // Fetch transactions when component mounts

  // Function to fetch transactions
  const fetchTransactions = async () => {
    try {
      const transactions = await getTransactions();
      setExpenses(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Function to handle adding a new transaction
  const handleAddTransaction = async (newTransaction) => {
    try {
      const addedTransaction = await addTransaction(newTransaction);
      // Update the UI or do other stuff
      setExpenses([...expenses, addedTransaction]); // Assuming addedTransaction is the newly added transaction
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  // Function to handle deleting a transaction
  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      // Update the UI or do other stuff
      setExpenses(expenses.filter(transaction => transaction.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  

  return (
    <>
      <GlobalProvider>
        <Header />
        <Balance />
        <IncomeExp />
        <TranscationList expenses={expenses} deleteTransaction={handleDeleteTransaction} />
        <AddTransaction addTransaction={handleAddTransaction} />
      </GlobalProvider>

    </>
  )
}
export default App

// https://cluster0.qhwjguv.mongodb.net/Expense-tracker/expenses