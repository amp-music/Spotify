import React, {Component} from 'react';
import { Accordion, Card, Button } from "react-bootstrap";
import PropTypes from 'prop-types';
import AlbumTracks from "./AlbumTracks";

class Albums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: null,
            finishedSettingUp: false,
        }
    }

    displayAlbums() {
        let ret = [];
        if (this.state.albums.length > 0) {
            this.state.albums.forEach((album, index) => {
                ret.push(
                    <Card key={index}>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                                {album.name}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={index}>
                            <AlbumTracks albumID={album.id} authToken={this.props.authToken}/>
                        </Accordion.Collapse>
                    </Card>
                );
            });
            return ret;
        }
        return [];
    }


    async componentDidMount() {
        const resp = await fetch(`https://api.spotify.com/v1/artists/${this.props.artistID}/albums`, {
            headers: {
                "Authorization": `Bearer ${this.props.authToken}`
            }
        });
        const respjson = await resp.json();
        console.dir(respjson?.items);
        this.setState({albums: respjson?.items, finishedSettingUp: true});
    }


    render() {
        if (this.state.finishedSettingUp && this.state.albums.length > 0) {
            return (
                <Accordion>
                    {this.displayAlbums()}
                </Accordion>
            );
        }
        else {
            return null;
        }
    }
}

Albums.defaultProps = {
    visible: true,
}

Albums.propTypes = {
    artistID: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    authToken: PropTypes.string.isRequired,
}

export default Albums;