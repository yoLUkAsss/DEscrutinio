/**
 * React utilities
 */
import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

/**
 * Components
 */
/**
 * Controller for Component
 */
import UserElectionCRUD from '../../build/contracts/UserElectionCRUD.json'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'

import cookie from 'react-cookies'

class Logout extends Component {
    constructor() {
        super();
        this.state = {
            web3 : null
        }
        this.handleLogout = this.handleLogout.bind(this)
    }

    componentWillMount() {
      getWeb3.then(results => {
        this.setState({
          web3: results.web3
        })
      }).catch(() => {
        console.log('Error finding web3.')
      })
    }

    handleLogout = (event) => {
      event.preventDefault()
      const userElection = contract(UserElectionCRUD)
      userElection.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        userElection.deployed().then((instance) => {
          return instance.logout.sendTransaction(cookie.load("email"), {from:accounts[0], gas : 3000000})
        }).then((tx)=> {
          cookie.save("email", "", {path:"/"})
          cookie.save("current_user_address", "", {path : "/"})
        }).catch((reason) => {
          console.log(reason)
        })
      })
    }
    render () {
        return (
          <Menu.Item name='log out' onClick={this.handleLogout}/>
        );
    }
}

export default Logout