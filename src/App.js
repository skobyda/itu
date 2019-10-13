// Author: Simon Kobyda, xkobyd00
import React from 'react';
import './App.css';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { UserPanel, Login } from './userPanel.js';
import { Transactions } from './Transactions.js';
import Contacts from './Contacts.js';
import Supervisors from './Supervisors.js';

const menu = { // index of menu items
    TRANSACTIONS: 0,
    CONTACTS: 1,
    SUPERVISORS: 2,
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            loggedUser: undefined,
            transactions: [],
        };

        this.onValueChanged = this.onValueChanged.bind(this);
    }

    onValueChanged(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {

        // const onValueChanged = this.onValueChanged;
        let request= new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                console.log("RETURNED:", this.responseText);
                // const supervisors = JSON.parse(this.responseText);
                // onValueChanged("supervisors", supervisors);
            }
        }
        request.open("POST", "http://itu1.epizy.com/php/backend_api.php", true);
        console.log('SEND REQUEST: {"action":"login","arguments":{"email":"example@ex.com","password":"Hackthis"}}');
        request.send('{"action":"login","arguments":{"email":"example@ex.com","password":"Hackthis"}}');
    }

    render() {
        const { loggedUser, page} = this.state;

        console.log(this.state);
        return (
            <div className="App">
                {!loggedUser ? <Login id="login" appOnValueChanged={this.onValueChanged} />
                : <>
                    <div>
                        <AppBar position="static">
                            <Tabs aria-label="menu"
                                onChange={(event, value) => this.onValueChanged("page", value)}
                                value={page}
                            >
                                <Tab label={<span className="my-button">Transactions</span>} />
                                <Tab label={<span className="my-button">Contacts</span>} />
                                <Tab label={<span className="my-button">Supervisors</span>} />
                            </Tabs>
                        </AppBar>
                        <UserPanel appOnValueChanged={this.onValueChanged} loggedUser={loggedUser} />
                    </div>
                    <header className="App-page">
                        <div className="App-content">
                            { page === menu.TRANSACTIONS && <Transactions transactions={loggedUser.transactions} loggedUser={loggedUser} appOnValueChanged={this.onValueChanged} /> }
                            { page === menu.CONTACTS && <Contacts contacts={loggedUser.contacts} loggedUser={loggedUser} appOnValueChanged={this.onValueChanged} /> }
                            { page === menu.SUPERVISORS && <Supervisors supervisors={loggedUser.supervisors} loggedUser={loggedUser} appOnValueChanged={this.onValueChanged} /> }
                        </div>
                    </header>
                </>}
            </div>
        );
    }
}

export default App;
