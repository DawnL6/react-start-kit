import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import './index.css';
var Nav = React.createClass({
    render(){
        const {value} = this.props;
        var nodes = value.map(function (o,i) {
            return(
                <Breadcrumb.Item key={i}>
                    <Icon type="user" />
                    <span className="size">
                        {o}
                    </span>
                </Breadcrumb.Item>
            )
        });
        return(
           <div className="nav">
               <Breadcrumb>
                   <Breadcrumb.Item href="">
                       <Icon type="home" />
                   </Breadcrumb.Item>
                   {nodes}
               </Breadcrumb>
           </div>
        )
    }
});
export default Nav