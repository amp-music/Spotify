import React, { Component } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import PropTypes from 'prop-types';

class Chart2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            ready: false,
            labels: null,
            popularity: null,
        }
        this.myChart = null;
    }


    async componentDidMount() {
        if (this.props.albumIDs && this.props.albumIDs.length > 0) {
            const resp = await fetch(`https://api.spotify.com/v1/albums?ids=${this.props.albumIDs}`, {
                headers: {
                    "Authorization": `Bearer ${this.props.authToken}`,
                }
            });
            await resp.json().then(respjson => {
                let albums = [];
                if (respjson.albums) {
                    albums = [...respjson.albums];
                }
                let labels = [];
                let popularity = [];

                console.log('albums:');
                console.dir(albums);
                albums.forEach(album => {
                    labels.push(album?.name);
                    popularity.push(album?.popularity);
                });
                this.setState({albums: respjson?.albums, ready: true, labels: labels, popularity: popularity});
            });
        }

    }


    render() {
        if (this.state.ready) {
            this.data = [];
            for (let i = 0; i < this.state.labels.length; ++i) {
                this.data.push({"name": this.state.labels[i], "popularity": this.state.popularity[i]});
            };

            return (
                <BarChart width={730} height={250} data={this.data}>
                    <CartesianGrid strokeDasharray="5 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="popularity" fill="#8884d8" />
                </BarChart>
            );
        }
        else {
            return null;
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        /*
        * Basically, there's a really annoying issue where the props in componentDidMount are in some weird superposition of defined and undefined. I'm putting the logic down here for when React decides to cooperate :/
        * */
        if (this.props.albumIDs.length > prevProps.albumIDs.length) {
            console.log("Updated");
            fetch(`https://api.spotify.com/v1/albums?ids=${this.props.albumIDs}`, {
                headers: {
                    "Authorization": `Bearer ${this.props.authToken}`,
                }
            })
                .then(resp => resp.json())
                .then(respjson => {
                    let albums = [];

                    console.log(`typeof respjson.albums: ${typeof respjson.albums}`);
                    console.log("respjson.albums: ");
                    console.dir(respjson.albums);
                    if (respjson.albums) {
                        albums = [...respjson.albums];
                    }
                    let labels = [];
                    let popularity = [];

                    console.log('albums:');
                    console.dir(albums);
                    albums.forEach(album => {
                        labels.push(album?.name);
                        popularity.push(album?.popularity);
                    });
                    this.setState({albums: respjson?.albums, ready: true, labels: labels, popularity: popularity});
                });
        }
    }

}

Chart2.propTypes = {
    authToken: PropTypes.string.isRequired,
    albumIDs: PropTypes.array.isRequired,
}

export default Chart2;