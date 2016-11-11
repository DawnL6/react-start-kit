import React from 'react';
import {Router, Route, hashHistory , IndexRoute, Redirect, Link, IndexLink}from 'react-router';
import Todo from './homework/Todomvc';
import AntStudy from './homework/ant-test';
import Table from './homework/Card/index2';
import { Menu, Icon, Switch ,Row ,Col} from 'antd';
import './index.css';
const SubMenu = Menu.SubMenu;

var Sider = React.createClass({
    getInitialState() {
        return {
            theme: 'light',
            current: '2'
        };
    },
    changeTheme(value) {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    },
    handleClick(e) {
        this.setState({
            current: "",
        });
    },
    render() {
        return (
            <div className="sider">
                <Switch onChange={this.changeTheme} checkedChildren="Light" unCheckedChildren="Dark" />
                <br />
                <br />
                <Menu theme={this.state.theme}
                      onClick={this.handleClick}
                      defaultOpenKeys={['sub1']}
                      selectedKeys={[this.state.current]}
                      mode="inline"
                >
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                        <Menu.Item key="1"><Link activeStyle={{color:'#2db7f5'}} to="todomvc">TodoMvc</Link></Menu.Item>
                        <Menu.Item key="2" ><Link activeStyle={{color:'#2db7f5'}} to="student">student</Link></Menu.Item>
                        <Menu.Item key="3"><Link activeStyle={{color:'#2db7f5'}} to="table">table</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    },
});
var Index = React.createClass({
    render(){
        return(
            <div className="router">
                <Sider/>
                {this.props.children}
            </div>
        )
    }
});
var R = React.createClass({
    render:function () {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Index}>
                    <IndexRoute component={AntStudy}/>
                    <Route path="todomvc" component={Todo}/>
                    <Route path="student" component={AntStudy}/>
                    <Route path="table" component={Table}/>
                </Route>
            </Router>
        )
    }
});
var RouterStudy = React.createClass({
   render(){
       return(
           <div>
               <R/>
           </div>
       )
   }
});
export default RouterStudy;
