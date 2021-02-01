import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import TopTracks from './TopTracks';
import Albums from "./Albums";
import ChartjsBar from "./ChartjsBar";
import TracksPerAlbumChart from "./TracksPerAlbumChart";

function Artist(props) {
    let { id } = useParams();


    const [name, setName] = useState("");
    const [followers, setFollowers] = useState();
    const [popularity, setPopularity] = useState(0);
    const [albums, setAlbums] = useState([]);
    const [albumIDs, setAlbumIDs] = useState([]);
    const [avgSongsPerAlbum, setAvgSongsPerAlbum] = useState(0);
    const [avgAlbumPopularity, setAvgAlbumPopularity] = useState(0);


    const authToken = sessionStorage.getItem("authToken");

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
        setAlbums(respjson?.items);
        const ids = [];
        respjson.items.forEach(album => {
            ids.push(album.id);
        });
        setAlbumIDs(ids);
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
    else if (albumIDs) {
        return (
            <div>
                <h2>name: {name}</h2>
                <h4>Has {followers} followers</h4>
                <h4>Popularity rating: {popularity}</h4>
                <h4>Average number of songs per album: {avgSongsPerAlbum}</h4>
                <h4>Average album popularity: {avgAlbumPopularity}</h4>
                <TopTracks artistID={id} authToken={authToken}/>
                <Albums artistID={id} authToken={authToken} avgSongsPerAlbumCallback={setAvgSongsPerAlbum}/>
                <br/>
                <ChartjsBar authToken={authToken} albumIDs={albumIDs} avgAlbumPopularityCallback={setAvgAlbumPopularity}/>
                <TracksPerAlbumChart albums={albums}/>

            </div>
        );
    }
    else {
        return null;
    }

}

export default Artist