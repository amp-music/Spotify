import React, {useState, useEffect} from 'react';
import { Accordion, Card, Button } from "react-bootstrap";
import PropTypes from 'prop-types';


function TopTracks(props) {

    const [topTracks, setTopTracks] = useState([]);
    const [ready, setReady] = useState(false);

    async function getTopTracks() {
        const resp = await fetch(`https://api.spotify.com/v1/artists/${props.artistID}/top-tracks?market=US`, {
            headers: {
                "Authorization": `Bearer ${props.authToken}`
            }
        });
        const respjson = await resp.json();
        setTopTracks(respjson?.tracks);
        setReady(true);

    }

    useEffect(() => {
        getTopTracks();
    }, [props.artistID, props.authToken]);

    function displayTopTracks() {
        let ret = [];
        if (topTracks.length > 0) {
            topTracks.forEach((track, index) => {
                ret.push(
                    <Card.Body key={index}>{track.name}</Card.Body>
                );
            });
            return ret;
        }
        else {
            return [];
        }
    }

    if (ready) {
        return (
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Top Tracks
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <div>
                            {displayTopTracks()}
                        </div>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        );
    }
    else {
        return null;
    }
}

TopTracks.propTypes = {
    artistID: PropTypes.string.isRequired,
    authToken: PropTypes.string.isRequired,
}

export default TopTracks;

