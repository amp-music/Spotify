import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

function Artist(props) {
    let { id } = useParams();


    const [name, setName] = useState("");
    const [followers, setFollowers] = useState();
    const [popularity, setPopularity] = useState(0);
    const [albums, setAlbums] = useState([]);


    const authToken = localStorage.getItem("authToken");

    async function getArtist() {
        const resp = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });
        const respjson = await resp.json();
        setName(respjson?.name);
        setFollowers(respjson?.followers?.total);
        setPopularity(respjson?.popularity);
    }

    async function getAlbums() {
        const resp = await fetch(`https://api.spotify.com/v1/artists/${id}/albums`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });
        const respjson = await resp.json();
        console.dir(respjson);
    }

    useEffect( () => {

        if (id.length === 22) {
            getArtist()
                .then(() => getAlbums())
                .catch(err => {
                    console.error(err);
                });
        }
    }, [authToken]);

    if (id.length !== 22) {
        return (
            <div>
                <h2>Error: Artist IDs should be 22 characters long. Yours is {id.length}.</h2>
            </div>
        );
    }

    return (
        <div>
            <h2>name: {name}</h2>
            <h4>Has {followers} followers</h4>
            <h4>Popularity rating: {popularity}</h4>
        </div>
    );
}

export default Artist