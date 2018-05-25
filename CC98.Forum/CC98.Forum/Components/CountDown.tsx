import * as React from 'react'

interface Props { 
    endDate: Date;
}

interface State {
    now: Date;
}

export class CountDown extends React.PureComponent<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            now: new Date
        };

        this.tick = this.tick.bind(this);
    }

    timer: any;

    tick() {
        this.setState({
            now: new Date
        });
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        let betweenTime = getBetweenTime(this.state.now, this.props.endDate);
        if(betweenTime) {
            let spanStyle: React.CSSProperties = {
                display: 'inline-flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                width: '4rem'
            };

            let color: React.CSSProperties = {
                color: 'rgb(255, 20, 147)', 
                fontSize: '1.5rem',
                fontFamily: 'Monaco',
                display: 'inline-flex',
                justifyContent: 'center',
                width: '100%'
            }

            return (
                <p style={{ margin: 0 }}>距离<span style={{ ...color, marginLeft: '.5rem', marginRight: '.5rem', width: 'auto' }}>半夏音乐节</span>还有
                    {betweenTime.days > 0 ? <span style={spanStyle}><span style={color}>{betweenTime.days}</span>天</span> : null}
                    {betweenTime.hours < 0 ? null : <span style={spanStyle}><span style={color}>{betweenTime.hours}</span>时</span>}
                    {betweenTime.minutes < 0 ? null : <span style={spanStyle}><span style={color}>{betweenTime.minutes}</span>分</span>}
                    {betweenTime.seconds < 0 ? null : <span style={spanStyle}><span style={color}>{betweenTime.seconds}</span>秒</span>}
                </p>
            );
        } else {
            return null;
        }
    }
}

function getBetweenTime(startDate: Date, endDate: Date) {
    let second = 1000;
    let minute = second * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let distance = (endDate as any) - (startDate as any);
  
    if (distance < 0) {
      return null;
    }
  
    let days = Math.floor(distance / day);
    let hours = Math.floor((distance % day) / hour);
    let minutes = Math.floor((distance % hour) / minute);
    let seconds = Math.floor((distance % minute) / second);
  
    return {
        days,
        hours,
        minutes,
        seconds
    }
}
