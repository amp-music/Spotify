import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

function AlbumTracks(props) {

    const [tracks, setTracks] = useState([]);
    const [setupDone, setSetupDone] = useState(false);

    async function getTracks() {
        const ret = [];
        const resp = await fetch(`https://api.spotify.com/v1/albums/${props.albumID}/tracks`, {
            headers: {
                "Authorization": `Bearer ${props.authToken}`
            }
        });
        const respjson = await resp.json();
        const tracks = respjson?.items;
        tracks.forEach((track, index) => {
            ret.push(
                <Card.Body key={index}>{track.name}</Card.Body>
            );
        });
        setTracks(ret);
        setSetupDone(true);
    }

    useEffect(() => {
        getTracks();
    }, [setupDone]);

    if (setupDone) {
        return (
            <div>
                {tracks}
            </div>
        );
    }
    else {
        return null;
    }


}

AlbumTracks.propTypes = {
    albumID: PropTypes.string.isRequired,
    authToken: PropTypes.string.isRequired,
}

export default AlbumTracks;