// Author: Michal Zelenak, xzelen24

import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { CreateTransaction } from './Transactions.js';

import './styles.css';

class CreateContact extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            name: "",
            iban: "",
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

        const { name, iban} = this.state;
        const data = { name, iban };
        const call = {
            action: "createContact",
            arguments: data
        };
        const callStr = JSON.stringify(call);
        console.log("CreateContact", callStr);

        const newContacts = [...loggedUser.contacts];
        newContacts.push({
            name,
            iban
        });
        loggedUser.contacts = newContacts;
        appOnValueChanged("loggedUser", loggedUser);
        this.close();
    }

    render() {
        const id = "create";
        return (
            <>
                <Button onClick={this.open} variant="contained" color="primary"><span className="my-button">Create Contact</span></Button>
                <Dialog open={this.state.showModal}
                    onClose={this.close}
                    aria-labelledby={id + "-modal"}
                    maxWidth={'sm'}
                    fullWidth
                >
                    <DialogTitle id={id + "-modal-title"}>Create Contact</DialogTitle>
                    <DialogContent>
                        <Box m={1} component="span" display="block">
                            <TextField id={id + "-name"}
                                label="Name"
                                value={this.state.name}
                                onChange={e => this.onValueChanged("name", e.target.value)}
                                fullWidth
                                />
                        </Box>
                        <Box m={1} component="span" display="block">
                            <TextField id={id + "-iban"}
                                label="IBAN"
                                value={this.state.iban}
                                onChange={e => this.onValueChanged("iban", e.target.value)}
                                fullWidth
                                />
                        </Box>
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

class DeleteContact extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onValueChanged = this.onValueChanged.bind(this);
        this.delete = this.delete.bind(this);
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

    delete() {
        const loggedUser = this.props.loggedUser;
        const appOnValueChanged = this.props.appOnValueChanged;

        const data = { iban: this.props.contact.iban, name: this.props.contact.name };
        const call = {
            action: "deleteContact",
            arguments: data
        };
        const callStr = JSON.stringify(call);
        console.log("Delete Contact API:", callStr);

        const newContacts = [...loggedUser.contacts];
        const index = newContacts.indexOf(c => c.iban === data.iban);
        newContacts.splice(index, 1);

        loggedUser.contacts = newContacts;
        appOnValueChanged("loggedUser", loggedUser);
        this.close();
    }

    render() {
        const id = this.props.contact.id + "-delete";
        return (
            <>
                <Button onClick={this.open} variant="contained" color="secondary"><span className="my-button">Delete</span></Button>
                <Dialog open={this.state.showModal}
                    onClose={this.close}
                    aria-labelledby={id + "-modal"}
                    maxWidth={'sm'}
                    fullWidth
                >
                    <DialogTitle id={id + "-modal-title"}>Delete Contact</DialogTitle>
                    <DialogContent>
                        Delete this contact?
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
                        <Button id={id + "-action-delete"} onClick={this.delete} color="secondary">
                            <span className="my-button">
                                Delete
                            </span>
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export default class Contacts extends React.Component {
    constructor(props) {
        super(props);

        this.onValueChanged = this.onValueChanged.bind(this);
    }

    onValueChanged(key, value) {
        this.setState({ [key]: value });
    }

    render() {
        const ContactPanel = (contact) => {
            return (
                <ExpansionPanel key={ contact.name }>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                  >
                      { contact.name }
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                      <table id="my-table">
                        <tbody>
                            <tr>
                              <th></th>
                            </tr>
                            <tr>
                              <td><b>IBAN:</b> { contact.iban }</td>
                              <td><b>Name:</b> { contact.name }</td>
                            </tr>
                        </tbody>
                      </table>
                  </ExpansionPanelDetails>
                  <ExpansionPanelActions>
                      <CreateTransaction loggedUser={this.props.loggedUser} appOnValueChanged={this.props.appOnValueChanged} iban={contact.iban} amount={0} text="Make a Transcation" />
                      <DeleteContact contact={contact} loggedUser={this.props.loggedUser} appOnValueChanged={this.props.appOnValueChanged}/>
                  </ExpansionPanelActions>
                </ExpansionPanel>
            );
        };

        const body = this.props.contacts.map(contact => ContactPanel(contact));

        return (
            <Grid container spacing={3}>
                {this.props.loggedUser &&
                <Grid item xs={12}>
                    <Box display="flex" css={{ float: "right" }}>
                        <CreateContact loggedUser={this.props.loggedUser} appOnValueChanged={this.props.appOnValueChanged} />
                    </Box>
                </Grid>}
                <Grid item xs={12}>
                    { body }
                </Grid>
            </Grid>
        );
    };
}
