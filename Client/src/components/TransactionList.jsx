import React, { useContext } from "react";
import { GlobalContext } from '../Context/GlobalState'
import { deleteTransaction } from "../components/API";

function TransactionList() {
  const { transaction, deleteTransaction: deleteTransactionFromContext } = useContext(GlobalContext)
  const sign = transaction.amount < 0 ? '-' : '+';


  const handleDeleteTransaction = async (id) => {
    try {
      // Call deleteTransaction function from API to delete the transaction with the given ID
      await deleteTransaction(id);
      // Update the local state or re-fetch transactions if needed
      deleteTransactionFromContext(id); // Update the global context to reflect the deletion
    } catch (error) {
      console.error('Error deleting transaction:', error);
      // Handle error if necessary
    }
  };
  return (
    <>
      <h3>History</h3>
      <ul id="list" class="list">
        {/* <li class="minus">
          Cash <span>-$400</span><button class="delete-btn">x</button>
        </li>  */}
        {transaction.map(transaction => (
          <li key={transaction.id} className={transaction.amount < 0 ? 'minus' : 'plus'}>
            {transaction.text} <span>${transaction.amount}</span>
            <button class="delete-btn"
              onClick={() => handleDeleteTransaction(transaction.id)}>x</button>
          </li>))}
      </ul>
    </>
  )
}
export default TransactionList