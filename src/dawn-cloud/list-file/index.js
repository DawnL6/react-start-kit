import React from 'react';
import './iconfont.css';
import './index.css'
var FileItem = React.createClass({
    render(){
        const {name,path} = this.props;
        return(
            <li className="file-item">
                <i className="iconfont">&#xe600;</i>
                <p>{name}</p>
            </li>
        )
    }
});
var FileList = React.createClass({
    render(){
        const {path,file} = this.props;
        var nodes = file.map(function (obj) {
            return (
                <FileItem
                    name={obj.name}
                    path={obj.path}
                    key={path+"-"+obj.name}
                />
            )
        });
        return(
            <div className="file-content">
                <ul className="file-list">
                    {nodes}
                </ul>
            </div>
        )
    }
});
export default FileList;
