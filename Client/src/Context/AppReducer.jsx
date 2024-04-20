export default (state, action) => {
    //defining logic with use of switch statement
    switch (action.type) {
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transaction:state.transaction
                .filter(transaction=>transaction.id!==action.payload)
            }
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transaction:[action.payload,...state.transaction]
            }
        default:
            return state;
    }
}



//global state say its childer function to what function has to be done and
//app reducer is the logic to implement the global state
//instead of props we use -> state management 