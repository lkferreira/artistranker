import React, { Component } from 'react';
import ArtistBox from './Components/ArtistBox/ArtistBox';
import AutoCompleteText from './Components/AutoCompleteText/AutoCompleteText';
import './App.css';
import BarChart from './Components/BarChart/BarChart';
import GenerateButton from './Components/GenerateButton/GenerateButton';

class App extends Component {

  constructor() {
    super();
    this.state = {
      artists: [],
      rankedArtists: [],
      switchIsLeft: true,
      switchIsLeftOnClick: true,
    }

    this.access_token = fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + new Buffer('a7ba8ee5564f45b2a4ab95efbdec61b5:4555730a41614abd89a9bdec6f5f62c7').toString('base64')
      },
      body: 'grant_type=client_credentials'
    })
      .then(response => response.json())
      .then(response => response.access_token);
  }

  onClosing = (artist) => {
    this.setState(state => {
      const artists = state.artists.filter((item) => item.name !== artist.name);

      return {
        artists,
      };
    });
  }

  onSelectArtist = (artist) => {
    if (!this.state.artists.some(item => item.name === artist.name)) {
      this.setState(state => {
        const artists = state.artists.concat(artist);
        return {
          artists,
        };
      });
    }
  };

  onButtonClick = () => {
    let listCopy = [...this.state.artists];
    this.setState({
      rankedArtists: listCopy,
      switchIsLeftOnClick: this.state.switchIsLeft,
    });
  }

  onSwitchChange = (switchObj) => {
    if (this.state.switchIsLeft === true) {
      this.setState({ switchIsLeft: false })
    } else {
      this.setState({ switchIsLeft: true })
    }
  }

  render() {
    return (
      <div className="App">
        <div >
          <h1 className='f1'>ARTIST RANKER</h1>
          <h2>Rank your favorite artists based on their Spotify popularity.</h2>
          <AutoCompleteText onSwitchChange={this.onSwitchChange} switchIsLeft={this.state.switchIsLeft} access_token={this.access_token} onSelectArtist={this.onSelectArtist} className='App-Component' />
          <div className='flex mt2'>
            {
              this.state.artists.map((artist) =>
                <ArtistBox artist={artist} key={artist.name} onClosing={this.onClosing} />)
            }
          </div>
          <GenerateButton onButtonClick={this.onButtonClick}/>

          {this.state.rankedArtists.length > 0 ? <BarChart key={this.state.rankedArtists} rankedArtists={this.state.rankedArtists} switchIsLeft={this.state.switchIsLeftOnClick} /> : null}
        </div>
        <footer>
            ©2020 Lucas Ferreira
        </footer>
      </div>
    );
  }
}

export default App;
