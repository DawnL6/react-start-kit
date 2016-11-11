import React from 'react';
import FileList from './list-file';
import {getFileList} from './api';
import './index.css';
import Loading from './loading';
import {Router, Route, hashHistory} from 'react-router';


var R = React.createClass({
    render(){
        return(
            <Router history={hashHistory}>
                <Route path="/" component={Cloud}/>
            </Router>
        )
    }
});
var Cloud = React.createClass({
    getInitialState(){
      return{
          file:[],
          path:'',
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
                <FileList
                    file={this.state.file}
                    path={this.state.path}
                    onChange={this.getFile}
                />
            </div>
        )
    },
    getFile(path){
        hashHistory.push(path);
        var that =this;
        that.setState({
            loading:false
        });
        getFileList(path,function (res) {
            that.setState({
                file:res.file,
                path:res.path,
                loading:true
            })
        },function (err) {
            console.log("失败");
        })
    },
    componentDidMount(){
        this.getFile("/")
    }
});
export default R;