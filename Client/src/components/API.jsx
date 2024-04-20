import axios from 'axios';

// Base URL for backend API
const baseURL = 'https://expense-tracker-backend-apis.onrender.com';


// Function to get all transactions
export const getTransactions = async () => {
  try {
    const response = await axios.get(`${baseURL}/expense`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error; // Propagate the error up for handling
  }
};

// Function to add a new transaction
export const addTransaction = async (newTransaction) => {
  try {
    const response = await axios.post(`${baseURL}/expense`, newTransaction);
    return response.data;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error; // Propagate the error up for handling
  }
};

// Function to delete a transaction by ID
export const deleteTransaction = async (id) => {
  try {
    await axios.delete(`${baseURL}/expense/${id}`);
    return id; // Return the ID of the deleted transaction
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error; // Propagate the error up for handling
  }
};
