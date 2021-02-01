import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from "chart.js";

class TracksPerAlbumChart extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.state = {
            labels: this.props.albums.map(x => x.name),
            data: this.props.albums.map(x => x.total_tracks),
        }
    }

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: this.state.labels,
                datasets: [
                    {
                        label: "Number of tracks per album",
                        backgroundColor: 'rgb(57,160,59)',
                        borderColor: 'rgba(0,0,0,1)',
                        data: this.state.data,
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });
    }

    render() {
        return (
            <div>
                <canvas id="myChart" ref={this.chartRef}/>
            </div>
        );
    }

}

TracksPerAlbumChart.propTypes = {
    albums: PropTypes.array.isRequired,
}

export default TracksPerAlbumChart;