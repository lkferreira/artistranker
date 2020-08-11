import React from 'react';
import './BarGroup.css';

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const BarGroup = (props) => {
    const barPaddingY = 20;
    const barPaddingX = 55;
    let barColor = ['#036139', ];

    let maxWidth = 100 + barPaddingX;
    let width = props.switchIsLeft ? ((props.d.popularity + barPaddingX)/maxWidth) * 100 : (((props.d.followers.total/props.maxFollowers)*100 + barPaddingX)/maxWidth) * 100;
    let yMid = props.barHeight * 0.5;

    return <g className='bar-group'>
        <rect y={barPaddingY * 0.5} x={`${0}`} width={`${width}%`} height={props.barHeight - barPaddingY} rx='5' fill={barColor[props.position%barColor.length]} />
        <text className='value-label' x={`${barPaddingX/2+5}`} y={yMid} alignmentBaseline='middle'> {`${props.position+1}.`}</text>
        <image y='10' x={`${barPaddingX}`} href={props.d.images.length>0 ? `${props.d.images[0].url}` : ``} height={props.barHeight - barPaddingY} width={props.barHeight - barPaddingY} />
        <foreignObject x={`${barPaddingX + 60}`} y={yMid - barPaddingY/2} width="100" height={props.barHeight - barPaddingY}>
            <div className='truncate'>
            {props.d.name}
            </div>
        </foreignObject>
        <text className='value-label' x={`${width-1}%`} y={yMid} alignmentBaseline='middle'> {props.switchIsLeft ? props.d.popularity : numberWithCommas(props.d.followers.total)}</text>
    </g>
}

export default BarGroup;