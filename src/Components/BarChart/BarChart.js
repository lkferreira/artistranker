import React from 'react';
import BarGroup from '../BarGroup/BarGroup';

class BarChart extends React.Component {

    compareArtist = (a, b) => {
        const artistA = this.props.switchIsLeft ? a.popularity : a.followers.total;
        const artistB = this.props.switchIsLeft ? b.popularity : b.followers.total;

        let comparison = 0;
        if (artistA > artistB) {
            comparison = 1;
        } else if (artistA < artistB) {
            comparison = -1;
        }
        return -comparison;
    }

    render() {
        let maxFollowers = 0;
        this.props.rankedArtists.map((artist) => maxFollowers = artist.followers.total > maxFollowers ? artist.followers.total : maxFollowers);

        let barHeight = 70;
        let barGroups = this.props.rankedArtists.sort(this.compareArtist).map((d, i) => <g key={i} transform={`translate(0, ${i * barHeight})`}>
            <BarGroup d={d} position={i} barHeight={barHeight} maxFollowers={maxFollowers} switchIsLeft={this.props.switchIsLeft}/>
        </g>)
        return <div className='tl'>
            <svg width='100%' height={`${barHeight * this.props.rankedArtists.length}`} >
                <g>
                    {barGroups}
                </g>
            </svg>
        </div>
    }
}

export default BarChart;