// Author: Simon Kobyda, xkobyd00

import React from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import './styles.css';

const TransactionBody = ({ id, state, onValueChanged }) => {
    return (<>
        <Box m={1} component="span" display="block">
            <TextField id={id + "-iban"}
                label="IBAN"
                value={state.iban}
                onChange={e => onValueChanged("iban", e.target.value)}
                fullWidth
                />
        </Box>
        <Box m={1} component="span" display="block">
            <TextField id={id + "-amount"}
                label="Amount"
                value={state.amount}
                onChange={e => onValueChanged("amount", e.target.value)}
                type="number"
                fullWidth
            />
        </Box>
    </>);
}

export class CreateTransaction extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            iban: props.iban ? props.iban : "",
            amount: props.amount ? props.amount : 0,
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onValueChanged = this.onValueChanged.bind(this);
        this.create = this.create.bind(this);
    }

    onValueChanged(key, value) {
        this.setState({ [key]: value });
    }

    close() {
        this.setState({ showModal: false, dialogError: undefined });
    }

    open() {
        this.setState({ showModal: true });
    }

    create() {
        const loggedUser = this.props.loggedUser;
        const appOnValueChanged = this.props.appOnValueChanged;

        const { iban, amount } = this.state;
        const data = { iban, amount };
        const call = {
            action: "createTransaction",
            arguments: data
        };
        const callStr = JSON.stringify(call);
        console.log(callStr);

        const d = new Date();
        const newTransactions = [...loggedUser.transactions];
        newTransactions.push({
            dateCreate: d.getDate() + d.getMonth + d.getFullYear,
            amount: amount,
            incoming: "O",
            accountId: loggedUser.iban,
            iban: iban,
            confirmed: false
        });
        loggedUser.transactions = newTransactions;
        appOnValueChanged("loggedUser", loggedUser);
    }

    render() {
        const id = "create";
        return (
            <>
                <Button onClick={this.open} variant="contained" color="primary"><span className="my-button">{this.props.text}</span></Button>
                <Dialog open={this.state.showModal}
                    onClose={this.close}
                    aria-labelledby={id + "-modal"}
                    maxWidth={'sm'}
                    fullWidth
                >
                    <DialogTitle id={id + "-modal-title"}>{this.props.text}</DialogTitle>
                    <DialogContent>
                        <TransactionBody id={id}
                            state={this.state}
                            onValueChanged={this.onValueChanged} />
                        <span style={{ color: "red" }}>
                            { this.state.errorMessage && (<br />) }
                            { this.state.errorMessage }
                        </span>
                    </DialogContent>
                    <DialogActions>
                        <Button id={id + "-action-close"} onClick={this.close} color="default">
                            <span className="my-button">
                                Close
                            </span>
                        </Button>
                        <Button id={id + "-action-create"} onClick={this.create} color="primary">
                            <span className="my-button">
                                Create
                            </span>
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export class Transactions extends React.Component {
    constructor(props) {
        super(props);

        this.onValueChanged = this.onValueChanged.bind(this);
    }

    onValueChanged(key, value) {
        this.setState({ [key]: value });
    }

    render() {
        const TransactionPanel = (transaction) => {
            return (
                <ExpansionPanel key={transaction.iban}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                    classes={{layout:"grid", gridTemplateColumns: "100px 300px 100px"}}
                  >
                      <span style={transaction.incoming === "I" ? {width:"0.7em"} : {width:"0.7em",color:"red"}}>{ (transaction.incoming === "I" ? " " : "-") }</span>
                      <span style={transaction.incoming === "I" ? {marginRight:"10em"} : {marginRight:"10em",color:"red"}}>{ transaction.amount + "eur" }</span>
                      <span style={{marginRight:"10em"}}>{ transaction.iban }</span>
                      <span>{transaction.approved ? transaction.dateProccess : "Waiting for approval" }</span>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                      <table id="my-table">
                        <tbody>
                            <tr>
                              <th></th>
                              <th></th>
                              <th></th>
                            </tr>
                            <tr>
                              <td><b>Type:</b> { transaction.incoming === "I" ? "Incoming" : "Outgoing" }</td>
                              <td><b>Amount:</b> { transaction.amount + "eur" }</td>
                              <td><b>Online:</b> { "Online transaction" }</td>
                            </tr>
                            <tr>
                              <td><b>Sender:</b> { transaction.iban }</td>
                              <td><b>Receiver:</b> { transaction.accountId }</td>
                              <td><b>Approved by:</b> { transaction.approved }</td>
                            </tr>
                            <tr>
                              <td><b>Transaction created:</b> { transaction.dateCreate }</td>
                              <td><b>Transaction approved:</b> { transaction.dateApproved }</td>
                              <td><b>Transaction proccessed:</b> { transaction.dateProccess }</td>
                            </tr>
                        </tbody>
                      </table>
                  </ExpansionPanelDetails>
                  <ExpansionPanelActions>
                      <CreateTransaction loggedUser={this.props.loggedUser} iban={transaction.iban} amount={transaction.amount} text={transaction.incoming === "O" ? "Repeat Transaction" : "Respond"} appOnValueChanged={this.props.appOnValueChanged} />
                  </ExpansionPanelActions>
                </ExpansionPanel>
            );
        };

        const body = this.props.transactions.reverse().map(transaction => TransactionPanel(transaction));

        return(
            <Grid container spacing={3}>
                {this.props.loggedUser &&
                <Grid item xs={12}>
                    <Box display="flex" css={{ float: "right" }}>
                        <CreateTransaction loggedUser={this.props.loggedUser} appOnValueChanged={this.props.appOnValueChanged} text="Make a Transaction"/>
                    </Box>
                </Grid>}
                <Grid item xs={12}>
                    { body }
                </Grid>
            </Grid>
        );
    };
}
