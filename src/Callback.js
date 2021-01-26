import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function Callback(props) {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const resp = props.location.hash;
        let authToken = resp.substring(resp.indexOf('=')+1, resp.indexOf('&'));
        console.log("resp: "+resp);
        localStorage.setItem('authToken', authToken);
        setToken(authToken);
    }, [props.location.hash]);

    if (token) {
        return (
            <Redirect to={{pathname: '/', state: {token: token}}}/>
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

export default Callback;