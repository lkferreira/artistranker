import React from 'react';
import './AutoCompleteText.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

class AutoCompleteText extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.state = {
            suggestions: [],
            text: '',
            items: [],
            cursor: 0,
        }
    }

    handleKeyDown(e) {
        const { cursor, suggestions, text} = this.state;

        if (e.keyCode === 38 && cursor > 0) {
            this.setState(prevState => ({
                cursor: prevState.cursor - 1,
                text: suggestions[cursor-1].name,
            }))
        } else if (e.keyCode === 40 && cursor < suggestions.length - 1) {
            this.setState(prevState => ({
                cursor: prevState.cursor + 1,
                text: suggestions[cursor+1].name,
            }))
        } else if (suggestions.length>0) {
            if (e.keyCode === 13 && suggestions[cursor].name === text) {
                this.suggestionSelected(suggestions[cursor]);
                this.setState({cursor: 0});
            }
        }
    }

    compareArtist = (a, b) => {
        const artistA = a.artist.toUpperCase();
        const artistB = b.artist.toUpperCase();

        let comparison = 0;
        if (artistA > artistB) {
            comparison = 1;
        } else if (artistA < artistB) {
            comparison = -1;
        }
        return comparison;
    }

    updateItems = async (value) => {
        const result = await fetch(`https://api.spotify.com/v1/search?q=${value}&type=artist&limit=15`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + await this.props.access_token
            }
        })
        const data = await result.json();
        return data.artists.items;
    }

    onTextChanged = async (e) => {
        const value = e.target.value;
        if (value) {
            let items = this.updateItems(value);
            this.setState({ suggestions: await items, text: value,
                            cursor: items.length >= this.state.cursor ? this.state.cursor : 0});
        } else {
            this.setState({ suggestions: [], text: value });
        }
    }

    suggestionSelected = (artist) => {
        this.setState(() => ({
            text: artist.name,
            suggestions: [],
        }))
        this.props.onSelectArtist(artist);
    }

    renderSuggestions() {
        const { cursor, suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item, i) => <li className='flex pa3' key={i} style={cursor===i ? {background: `rgba(128,128,128,0.20)`} : {}} onClick={() => this.suggestionSelected(item)}>
                    <div className='band-logo' style={{ background: `url("${item.images.length > 0 ? item.images[0].url : ''}") center center no-repeat` }}>
                    </div>
                    {item.name}</li>)}
            </ul>
        )
    }

    render() {
        const { text } = this.state;
        return (
            <div className='AutoCompleteText'>
                <input className='inputForm f4 pa2' placeholder="Enter Artist's Name" value={text} onChange={this.onTextChanged} type='text' onKeyDown={ this.handleKeyDown }/>
                <ToggleSwitch switchIsLeft={this.props.switchIsLeft} onSwitchChange={this.props.onSwitchChange} />
                {this.renderSuggestions()}
            </div>
        )
    }
}

export default AutoCompleteText;