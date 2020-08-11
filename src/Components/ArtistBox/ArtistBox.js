import React from 'react';
import './ArtistBox.css';

class ArtistBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOn: true
        }
    }

    onClosing(artist) {
        this.setState({ isOn: false});
        setTimeout(() => this.props.onClosing(artist), 450);
    }

    render() {
        const artist = this.props.artist;
        let box_class = !this.state.isOn ? 'swing-out-top-bck' : 'puff-in-center';

        return (
            <div className={`${box_class} br2 bg-green mw5 pre items-center flex white justify-between artist-box`}>
                <div style={artist ? artist.images.length>0 ? { background: `url("${artist.images[0].url}") center center no-repeat`, backgroundSize: 'cover' } : {} : {}} className='square-logo bg-white mr2' ></div>
                <div className='tl truncate overflow-hidden' style={{ flexGrow: "1" }}>
                    {artist ? artist.name : ''}
                </div>
                <button className='pointer h1 w1 close-button' aria-label="Remove Artist's Name" onClick={() => this.onClosing(artist)}></button>
            </div>
        )
    }
}

export default ArtistBox;