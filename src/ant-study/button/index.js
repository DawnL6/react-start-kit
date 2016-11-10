/**
 * Created by Administrator on 2016/10/31.
 */
import React from 'react';
import './index.css'
var Button = React.createClass({
    render : function(){
        return(
            <button className={this.props.type}>{this.props.children}</button>
        )
    }
});
export default Button;