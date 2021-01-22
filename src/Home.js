import React, { Component } from 'react';
import logo from './logo.svg';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.authorize = this.authorize.bind(this);
        this.request = "https://accounts.spotify.com/authorize?client_id=8095d382e8214dc5b5e54f7f6cf9c8ef&redirect_uri=http:%2F%2Flocalhost:3000%2Fcallback&scope=user-read-private%20user-read-email%20user-top-read%20playlist-read-private%20user-read-recently-played%20user-library-read%20playlist-modify-public%20playlist-modify-private&response_type=token"
    }



    authorize() {
        fetch("https://accounts.spotify.com/authorize?client_id=8095d382e8214dc5b5e54f7f6cf9c8ef&response_type=code&redirect_uri=http://localhost:3000/callback&scope=user-read-private%20user-read-email&state=34fFs29kd09", {mode: "no-cors"})
            .then(resp => console.dir(resp));

    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    <a href={this.request}>Click to authorize</a>
                </header>
            </div>
        );
    }
}