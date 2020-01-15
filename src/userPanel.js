import React from 'react';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
//import Card from '@material-ui/core/Card';


class Logout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onValueChanged = this.onValueChanged.bind(this);
        this.logout = this.logout.bind(this);
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

    logout() {
        this.props.appOnValueChanged("loggedUser", undefined);
    }

    render() {
        const id = this.props.id + "-logout";

        return (
            <>
                <Button onClick={this.open}>
                    <span className="my-button">
                        Logout
                    </span>
                </Button>






                <Dialog open={this.state.showModal}
                    onClose={this.close}
                    aria-labelledby={id + "-dialog"}
                    maxWidth={'sm'}
                    fullWidth
                >
                    <DialogTitle id={id + "-dialog-title"}>Logout</DialogTitle>
                    <DialogContent>
                        Do you really wish to logout?
                    </DialogContent>
                    <DialogActions>
                        <Button id={id + "-action-close"} onClick={this.close} color="default">
                            <span className="my-button">
                                Close
                            </span>
                        </Button>
                        <Button id={id + "-action-edit-profile"} onClick={this.logout} color="primary">
                            <span className="my-button">
                                Logout
                            </span>
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "m@m.com",//changed
            password: "123"//changed
        };

        this.onValueChanged = this.onValueChanged.bind(this);
        this.login = this.login.bind(this);
    }

    onValueChanged(key, value) {
        this.setState({ [key]: value });
    }

    login() {
        const onValueChanged = this.onValueChanged;
        const appOnValueChanged = this.props.appOnValueChanged;
        const { email, password } = this.state;
        const data = { email, password };
        /* const call = {
            action: "login",
            arguments: data
        };
        const callStr = JSON.stringify(call); */
        // TODO replace dummy data with backend

        if (data.email === "m@m.com" && password === "123") {
            const loggedUser = {
                name: "Simon Kobyda",
                iban: "SK02602020000000008342",
                balance: 10250,
                transactions: [
                    {
                        dateCreate: "20-10-2019",
                        dateProccess: "22-10-2019",
                        amount: "200",
                        online: "TODO",
                        dateConf: "21-10-2019",
                        incoming: "I",
                        accountId: "SK02602020000000008342",
                        approved: true,
                        approvedBy: "Jurk Murko",
                        iban: "SK32141943292843294",
                    },
                    {
                        dateCreate: "25-10-2019",
                        dateProccess: "26-10-2019",
                        amount: "400",
                        online: "TODO",
                        dateConf: "25-10-2019",
                        incoming: "O",
                        accountId: "SK02602020000000008342",
                        approved: true,
                        approvedBy: "Jurk Murko",
                        iban: "SK32141943292843294"
                    },
                    {
                        dateCreate: "30-10-2019",
                        dateProccess: "2-11-2019",
                        amount: "780",
                        online: "TODO",
                        dateConf: "2-11-2019",
                        incoming: "I",
                        accountId: "SK02602020000000008342",
                        approved: true,
                        approvedBy: "Jurk Murko",
                        iban: "SK32141943292843294"
                    },
                ],
                contacts: [
                    {
                        name: "Michal Zelenak",
                        iban: "SK32141943292843294"
                    },
                    {
                        name: "Jurij Gagarin",
                        iban: "SK98765432100000000"
                    },
                    {
                        name: "Majka Pajka",
                        iban: "SK00000000000000001"
                    },
                ],
                supervisors: [
                    {
                        name: "Michal",
                        surname: "Zelenak",
                        mail: "michalzelenak@gmail.com",
                        phoneNumber: "+420854398148"
                    },
                    {
                        name: "Jurko",
                        surname: "Murko",
                        mail: "juro@gmail.com",
                        phoneNumber: "+420854398148"
                    },
                    {
                        name: "Majka",
                        surname: "Pajka",
                        mail: "whatevermail@gmail.com",
                        phoneNumber: "+420854398148"
                    },
                ],
                notes: [
                    {
                        date: "15-1-2020",
                        createDate: "25-11-2019",
                        shortNote: "Charita prispevok",
                        note: "Prispiet na charitu pre obete snp, zbierka vyhlasena kostolom"

                    },
                    {
                        date: "1-2-2020",
                        createDate: "26-10-2018",
                        shortNote: "Syn narodeniny",
                        note: "Poslat peniaze k narodeninam syna Mateja"

                    },
                    {
                        date: "10-2-2020",
                        createDate: "26-11-2019",
                        shortNote: "Chladnicka splatky",
                        note: "Zaplatit prvu splatku za novu chladnicku kupenu v nay elektro"

                    },

                    {
                        date: "20-2-2020",
                        createDate: "20-12-2019",
                        shortNote: "Vnuk skusky",
                        note: "Poslat peniaze vnukovi za spravene skusky podla vysledkov"

                    },

                ]
            };

            appOnValueChanged("loggedUser", loggedUser);
        } else {
            onValueChanged("errorMessage", "Incorrect email or password");
        }
    }

    render() {
        const id = this.props.id + "-login";
        return (
            <Dialog aria-labelledby={id + "-modal"}
                maxWidth={'sm'}
                fullWidth
                open >
                <DialogTitle id={id + "-modal-title"}>User Login</DialogTitle>
                <DialogContent>
                    <Box m={1} component="span" display="block">
                        <TextField id={id + "-email"}
                            label="Email"
                            value={this.state.email}
                            onChange={e => this.onValueChanged("email", e.target.value)}
                            fullWidth
                        />
                    </Box>
                    <Box m={1} component="span" display="block">
                        <TextField id={id + "-password"}
                            label="Password"
                            value={this.state.password}
                            onChange={e => this.onValueChanged("password", e.target.value)}
                            type="password"
                            fullWidth
                        />
                    </Box>
                    <span style={{ color: "red" }}>
                        {this.state.errorMessage && (<br />)}
                        {this.state.errorMessage}
                    </span>
                </DialogContent>
                <DialogActions>
                    <Button id={id + "-action-login"} onClick={this.login} color="primary">
                        <span className="my-button">
                            Login
                        </span>
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export const UserPanel = ({ appOnValueChanged, loggedUser }) => {
    const id = "user-panel";

    return (
        <Box display="flex" m={1} p={1} bgcolor="background.paper" css={{ float: "right" }}>

            <Logout id={id} appOnValueChanged={appOnValueChanged} />
        </Box>
    );
}

