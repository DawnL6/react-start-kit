import React from 'react';
import FileList from './list-file';
import Nav from './nav';
import {getFileList} from './api';
import './index.css';
import Loading from './loading';
import {Router, Route, hashHistory} from 'react-router';



var R = React.createClass({
    render(){
        return(
            <Router history={hashHistory}>
                <Route path="*" component={Cloud}/>
            </Router>
        )
    }
});
var Cloud = React.createClass({
    getInitialState(){
      return{
          file:[],
          path:[],
          loading:true
      }
    },
    render(){
        return(
            <div className="wrapper">
                <div style={{display:this.state.loading?'none':'block'}}>
                    <Loading/>
                </div>
                <h3>步惊云</h3>
                <Nav
                    value={this.state.path}
                />
                <FileList
                    file={this.state.file}
                    path={this.state.path}
                />
            </div>
        )
    },
    getFile(path){
        var that =this;
        that.setState({
            loading:false
        });
        getFileList(path,function (res) {
            that.setState({
                file:res.file,
                path:res.path.split("/"),
                loading:true
            })
        },function (err) {
            console.log(err);
        })
    },
    componentDidMount(){
        const{params} = this.props;
        const{splat} = params;
        this.getFile(splat)
    },
    componentWillReceiveProps(nextProps){
        const{params} = nextProps;
        const{splat} = params;
        this.getFile(splat)
    }
});
export default R;