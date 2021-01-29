import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

function Home(props) {
    let request = "https://accounts.spotify.com/authorize?client_id=8095d382e8214dc5b5e54f7f6cf9c8ef&redirect_uri=http:%2F%2Flocalhost:3000%2Fcallback&scope=user-read-private%20user-read-email%20user-top-read%20playlist-read-private%20user-read-recently-played%20user-library-read%20playlist-modify-public%20playlist-modify-private&response_type=token"
    const [authToken, setAuthToken] = useState(null);
    const [artistID, setArtistID] = useState();
    const [searchBarState, setSearchBarState] = useState();

    useEffect(() => {
        let token = localStorage.getItem("authToken");
        if (token) {
            setAuthToken(token);
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent browser reload
        console.dir(event);

        if (searchBarState.includes("spotify.com/artist")) {
            const artistID = searchBarState.substring(searchBarState.indexOf("/artist/")+8, searchBarState.indexOf("?"));
            setArtistID(artistID);
        }
        else {
            setArtistID(searchBarState);
        }

    }

    const handleChange = (event) => {
        setSearchBarState(event.target.value);
    }

    if (artistID) {
        return <Redirect to={{pathname: `/${artistID}`}} />
    }

    if (authToken) {
        return (
            <div className="App">
                <header className="App-header">
                    <Form onSubmit={handleSubmit}>
                        <Form.Control size="lg" type="text" placeholder="Artist ID here" value={searchBarState} onChange={handleChange}/>
                    </Form>
                </header>
            </div>
        );
    }
    else {
        return (
            <div className="App">
                <header className="App-header">
                    <Button variant="primary" href={request}>Click to authorize</Button>
                </header>
            </div>
        );
    }
}

export default Home;