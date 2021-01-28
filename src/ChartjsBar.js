import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

/*
* All code directly related to the chart based heavily on https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
*
* The code in this module uses react-rechartjs-2, which is a react wrapper around chart.js
* */


class ChartjsBar extends Component {
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
            this.myChart = {
                labels: this.state.labels,
                datasets: [
                    {
                        label: 'Popularity',
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: this.state.popularity
                    }
                ]
            }

            return (
                <div>
                    <Bar data={this.myChart} options={{
                        title: {
                            display: true,
                            text: 'Popularity per album',
                            fontSize: 20,
                        },
                        legend: {
                            display: true,
                            position: 'right',
                        }
                    }}/>
                </div>
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

ChartjsBar.propTypes = {
    authToken: PropTypes.string.isRequired,
    albumIDs: PropTypes.array.isRequired,
}

export default ChartjsBar;