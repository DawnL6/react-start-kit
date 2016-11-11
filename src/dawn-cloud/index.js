import React from 'react';
import FileList from './list-file';
import {getFileList} from './api';
import './index.css';
var Cloud = React.createClass({
    getInitialState(){
      return{
          file:[],
          path:''
      }
    },
    render(){
        return(
            <div className="wrapper">
                <h3>步惊云</h3>
                <FileList
                    file={this.state.file}
                    path={this.state.path}
                />
            </div>
        )
    },
    componentDidMount(){
        var that =this;
        getFileList("/",function (res) {
            that.setState({
                file:res.file,
                path:res.path
            })
        },function (err) {
            console.log("失败");
        })
    }
});
export default Cloud;