import React, { useState, useContext } from 'react'
import { GlobalContext } from '../Context/GlobalState'
import { addTransaction } from '../components/API'

function AddTransaction() {

    const [text, SetText] = useState(''); //for input field
    const [amount, SetAmount] = useState(0); //for amount field
    // const { addTransaction } = useContext(GlobalContext); // add function from GlobalState.jsx
    const { addTransaction: addTransactionToContext } = useContext(GlobalContext); // Renaming addTransaction to avoid conflicts

    const onSubmit = async (e) => {
        e.preventDefault();
        
        const newTransaction = {
            text,
            amount: +amount // Converting amount to a number
        };

        try {
            const addedTransaction = await addTransaction(newTransaction); // Using the addTransaction function
            addTransactionToContext(addedTransaction); // Adding the transaction to context
            SetText('');
            SetAmount(0);
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };
    // //on submit for handling new transaction
    // const onSubmit = (e) => {
    //     e.preventDefault(); //prevents from refresh

    //     //new transaction details and its type
    //     const newTransaction = {
    //         id: Math.floor(Math.random() * 10000000),
    //         text,
    //         amount: Number(amount),
    //     };

    //     //adding the new transaction by calling the addTransaction function
    //     addTransaction(newTransaction);
    // }

    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    {/* Onchange to set the the value to the Text and amount using useState*/}
                    <input type="text" value={text} onChange={(e) => SetText(e.target.value)} id="text" placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount <br />
                        (negative - expense, positive - income)</label>
                    <input type="number" value={amount} onChange={(e) => SetAmount(e.target.value)} id="amount" placeholder="Enter amount..." />
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </>
    )
}

export default AddTransaction;