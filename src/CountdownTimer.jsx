import React from 'react';
class CountdownTimer extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {timeLeft:5, count:30};
        this.startTimer = this.startTimer.bind(this);
        this.clearTimer = this.clearTimer.bind(this);
    }

    componentDidMount(){
        let me = this;
        me.setState(state => ({count: me.props.count, timeLeft: me.props.count}));
    }

    startTimer(){
        let me = this;
        me.setState(state => ({timeLeft: me.state.count}));

        me.handla = window.setInterval(function(){
            if(me.state.timeLeft == 0){
                me.props.onTimeout();
                window.clearInterval(me.handla);
                return;
            }
            me.setState(state => ({timeLeft: me.state.timeLeft--}));
        },1000);
    }

    clearTimer(){
        let me = this;
        window.clearInterval(me.handla);
    }

    render(){
        return <span>{this.state.timeLeft}s remain.</span>
    }

}
export default CountdownTimer;
