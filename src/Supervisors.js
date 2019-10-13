// Author: Simon Kobyda, xkobyd00
import React from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './styles.css';

export default class Supervisors extends React.Component {
    constructor(props) {
        super(props);

        this.onValueChanged = this.onValueChanged.bind(this);
    }

    onValueChanged(key, value) {
        this.setState({ [key]: value });
    }

    render() {
        const SupervisorPanel = (supervisor) => {
            return (
                <ExpansionPanel key={supervisor.surname + supervisor.name}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                  >
                      { supervisor.name + " " + supervisor.surname }
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
                              <td><b>Name:</b> { supervisor.name }</td>
                              <td><b>Surname:</b> { supervisor.surname }</td>
                            </tr>
                            <tr>
                              <td><b>Email:</b> { supervisor.mail }</td>
                              <td><b>Phone number:</b> { supervisor.phoneNumber }</td>
                            </tr>
                        </tbody>
                      </table>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
            );
        };

        const body = this.props.supervisors.map(supervisor => SupervisorPanel(supervisor));

        return(
            <>
                { body }
            </>
        );
    };
}
