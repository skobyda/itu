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


import './styles.css';

class DeleteNote extends React.Component {
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

        const data = { date: this.props.note.date, createDate: this.props.note.createDate, note: this.props.note.note, shortNote: this.props.note.shortNote };
        const call = {
            action: "deleteContact",
            arguments: data
        };
        //        const callStr = JSON.stringify(call);
        //       console.log("Delete Contact API:", callStr);

        const newNotes = [...loggedUser.notes];

        var finded = 0;
        var index = 0;

        for (const result of newNotes) { if (result.note === data.note) { finded = index } else { index = index + 1 } };

        newNotes.splice(finded, 1);
        console.log(finded);
        loggedUser.notes = newNotes;
        appOnValueChanged("loggedUser", loggedUser);
        this.close();
    }

    render() {
        const id = this.props.note + "-delete";
        return (
            <>
                <Button onClick={this.open} variant="contained" color="secondary"><span className="my-button">Delete</span></Button>
                <Dialog open={this.state.showModal}
                    onClose={this.close}
                    aria-labelledby={id + "-modal"}
                    maxWidth={'sm'}
                    fullWidth
                >
                    <DialogTitle id={id + "-modal-title"}>Delete Note</DialogTitle>
                    <DialogContent>
                        Delete this Note?
                        <span style={{ color: "red" }}>
                            {this.state.errorMessage && (<br />)}
                            {this.state.errorMessage}
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

class CreateNote extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            date: "",
            createDate: "",
            shortNote: "",
            note: "",
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
        this.setState({ showModal: false, date: "", shortNote: "", note: "", dialogError: undefined });
    }

    open() {
        this.setState({ showModal: true });
    }

    create() {
        const loggedUser = this.props.loggedUser;
        const appOnValueChanged = this.props.appOnValueChanged;

        const { date, createDate, shortNote, note } = this.state;
        const data = { date, createDate, shortNote, note };
        const call = {
            action: "createNote",
            arguments: data
        };
        const callStr = JSON.stringify(call);
        console.log("CreateNote", callStr);

        const newNotes = [...loggedUser.notes];
        newNotes.push({
            date,
            createDate,
            shortNote,
            note

        });
        loggedUser.notes = newNotes;
        appOnValueChanged("loggedUser", loggedUser);
        this.close();
    }

    render() {
        const id = "create";
        return (
            <>
                <Button onClick={this.open} variant="contained" color="primary"><span className="my-button">Create new Note</span></Button>
                <Dialog open={this.state.showModal}
                    onClose={this.close}
                    aria-labelledby={id + "-modal"}
                    maxWidth={'sm'}
                    fullWidth
                >
                    <DialogTitle id={id + "-modal-title"}>Create New Note</DialogTitle>
                    <DialogContent>
                        <Box m={1} component="span" display="block">
                            <TextField id={id + "-shortNote"}
                                label="Short Note about full note"
                                value={this.state.shortNote}
                                onChange={e => this.onValueChanged("shortNote", e.target.value)}
                                fullWidth
                            />
                        </Box>
                        <Box m={1} component="span" display="block">
                            <TextField id={id + "-note"}
                                label="Note"
                                value={this.state.note}
                                onChange={e => this.onValueChanged("note", e.target.value)}
                                fullWidth
                            />
                        </Box>
                        <Box m={1} component="span" display="block">
                            <TextField id={id + "-date"}
                                label="Date"
                                value={this.state.date}
                                onChange={e => this.onValueChanged("date", e.target.value)}
                                fullWidth
                            />
                        </Box>

                        <span style={{ color: "red" }}>
                            {this.state.errorMessage && (<br />)}
                            {this.state.errorMessage}
                        </span>
                    </DialogContent>
                    <DialogActions>
                        <Button id={id + "-action-close"} onClick={this.close} color="default">
                            <span className="my-button">
                                Close - don't save
                            </span>
                        </Button>
                        <Button id={id + "-action-create"} onClick={this.create} color="primary">
                            <span className="my-button">
                                Save
                            </span>
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export default class Notes extends React.Component {
    constructor(props) {
        super(props);
        console.log("this.state");
        this.onValueChanged = this.onValueChanged.bind(this);
    }

    onValueChanged(key, value) {
        this.setState({ [key]: value });
    }

    render() {
        const day = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const date = day + "-" + month + "-" + year;
        console.log(date);
        //  console.log("sdaf");
        const NotesPanel = (note) => {
            return (
                <ExpansionPanel key={note.shortNote}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                        classes={{ layout: "grid", gridTemplateColumns: "100px 100px 100px" }}
                    >
                        <span style={{ width: "15.1em", marginLeft: "1em" }}>{note.shortNote}</span>
                        <span style={note.date === date ? { marginLeft: "20em", color: "red" } : { marginLeft: "20em" }}>{"Date:  "}</span>
                        <span style={note.date === date ? { marginLeft: "0.3em", color: "red" } : { marginLeft: "0.3em" }}>{note.date}</span>


                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <table id="my-table">
                            <tbody>
                                <tr>
                                    <th></th>
                                </tr>
                                <tr>
                                    <td><b>CreateDate:</b> {note.createDate}</td>
                                    <td><b>Note:</b> {note.note}</td>

                                </tr>
                            </tbody>
                        </table>
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                        <DeleteNote note={note} loggedUser={this.props.loggedUser} appOnValueChanged={this.props.appOnValueChanged} />

                    </ExpansionPanelActions>
                </ExpansionPanel >
            );
        };

        const body = this.props.notes.map(note => NotesPanel(note));
        //console.log("sdaf");
        return (
            <Grid container spacing={3} >
                {
                    this.props.loggedUser &&
                    <Grid item xs={12}>
                        <Box display="flex" css={{ float: "right" }}>
                            <CreateNote loggedUser={this.props.loggedUser} appOnValueChanged={this.props.appOnValueChanged} />
                        </Box>
                    </Grid>
                }
                < Grid item xs={12} >
                    {body}

                </Grid>
            </Grid >
        );
    };
}

