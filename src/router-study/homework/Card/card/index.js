import React from 'react';
import './index.css';
var Card = React.createClass({
    render(){
        return(
            <div>
                {this.props.children}
            </div>
        )
    },
    getChildContext(){
        return{
            current:this.props.current
        }
    },
    childContextTypes:{
        current:React.PropTypes.number
    }
});
var TitleBar = React.createClass({

    render(){
        return(
            <div className="tab-bar">
                {this.props.children}
            </div>
        )
    }
});
var Title = React.createClass({
    contextTypes:{
        current:React.PropTypes.number
    },
    render(){
        var active = "";
        if(this.props.index==this.context.current){
            active="active"
        }
        return(
            <div className={active} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        )
    }
});
var ContentBar = React.createClass({
    render(){
        return(
            <div className="cont-bar">
                {this.props.children}
            </div>
        )
    }
});
var Content = React.createClass({
    contextTypes:{
        current:React.PropTypes.number
    },
    render(){
        var display = "";
        if(this.props.index==this.context.current){
            display="block"
        }else{
            display="none"
        }
        return(
            <div style={{display:display}}>
                {this.props.children}
            </div>
        )
    }
});
Card.TitleBar = TitleBar;
Card.Title = Title;
Card.ContentBar = ContentBar;
Card.Content = Content;
export default Card;