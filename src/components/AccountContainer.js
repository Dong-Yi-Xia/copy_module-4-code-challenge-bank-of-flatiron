import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";


class AccountContainer extends Component {

  state = {
    transactions : [],
    search: "",
    select: "all"
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

  selectFun = (selectedResult) => {
    this.setState({
      select: selectedResult
    })
  }

  filterSearchTransactions = () => {
    let {transactions, search} = this.state
    let filterSearch = transactions.filter(transaction => {
      return transaction.description.toLowerCase().includes(search.toLowerCase())
    })

    let selectedChoice = this.state.select
    switch(selectedChoice){
      case "all" :
        return filterSearch

      case "descriptionUP" : 
        return filterSearch.sort( (wordA, wordB) => {
            return wordA.description.localeCompare(wordB.description)
        })

      case "descriptionDOWN" : 
      return filterSearch.sort( (wordA, wordB) => {
          return wordB.description.localeCompare(wordA.description)
      })
        
      case "categoryUP" : 
      return filterSearch.sort( (wordA, wordB) => {
          return wordA.category.localeCompare(wordB.category)
      })

      case "categoryDOWN" : 
      return filterSearch.sort( (wordA, wordB) => {
          return wordB.category.localeCompare(wordA.category)
      })

      default:

   
    }


    
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
          select={this.state.select}
          selectFun={this.selectFun}
         />
      </div>
    );
  }
}

export default AccountContainer;
