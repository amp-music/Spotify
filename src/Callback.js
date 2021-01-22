import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class Callback extends Component {
    constructor() {
        super();
        this.state = {
            token: null,
        }
        this.mounted = false;
        this.code = null;
        this.client_id = "8095d382e8214dc5b5e54f7f6cf9c8ef";
    }


    componentDidMount() {
        let resp = this.props.location.hash;
        let token = resp.substring(resp.indexOf('=')+1, resp.indexOf('&'));
        localStorage.setItem('authToken', token);
        this.setState({token: token}) // Force a re-render so we can re-direct back to main screen.
    }

    render() {
        if (this.state.token) {
            return (
                <Redirect to={{pathname: '/', state: {token: this.token}}}/>
            );
        }
        else {
            return (
                <div>
                    <h1>Callback!</h1>
                </div>
            );
        }
    }
}

export default Callback;