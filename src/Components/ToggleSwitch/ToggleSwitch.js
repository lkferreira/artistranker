import React from 'react';
import './ToggleSwitch.scss';

class ToggleSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchIsLeft: true,
        }
    }

    render() {
        return (<div className='toggle normal'>
            <span style={this.props.switchIsLeft ? {color: '#cef9ce'} : {color: '#49754e'}}>Popularity</span>
            <input id="normal" type="checkbox"></input>
            <label className="toggle-item" htmlFor="normal" onClick={() => this.props.onSwitchChange(this)}></label>
            <span style={!this.props.switchIsLeft ? {color: '#cef9ce'} : {color: '#49754e'}}>Followers</span>
        </div>
        )
    }
} 

export default ToggleSwitch;