import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {

  state = {
    transactions : [],
    search: ""
  } 

  componentDidMount(){
    fetch('http://localhost:6001/transactions')
    .then(r => r.json())
    .then(resp => {
      this.setState({
        transactions: resp
      })
    })
  }


  addTransactionFun = (addTransaction) =>{
    let newTransArr = [...this.state.transactions, addTransaction]
    this.setState({
      transactions: newTransArr
    })
  }

  searchFun = (searchResult) => {
    this.setState({
      search: searchResult
    })
  }

  filterSearchTransactions = () => {
    let {transactions, search} = this.state
    let filterSearch = transactions.filter(transaction => {
      return transaction.description.toLowerCase().includes(search.toLowerCase())
    })
    return filterSearch
  }

  render() {
    return (
      <div>
        <Search 
           searchValue={this.state.search}
           searchFun={this.searchFun}
        />

        <AddTransactionForm 
          addTransactionFun={this.addTransactionFun}
        />

        <TransactionsList
          transactions={this.filterSearchTransactions()}
         />
      </div>
    );
  }
}

export default AccountContainer;
