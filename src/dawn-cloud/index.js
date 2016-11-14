import React from 'react';
import {Modal,message} from 'antd';
import FileList from './list-file';
import Nav from './nav';
import Menu from './r-menu';
import Action from './action';
import {getFileList,newFolder,rename,remove} from './api'
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
          loading:true,
          copyItem:[],
          menu:{
              display:false,
              x:0,
              y:0
          },
          active:'',
          actionType:null,
          newValue:'',
          showAction:false
      }
    },
    render(){
        return(
            <div
                className="wrapper"
                onContextMenu={(e)=>e.preventDefault()}
                onMouseDown={this.mouseDown}
            >
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
                    onPick={this.pickItem}
                    active={this.state.active}
                />
                <Menu
                    display={this.state.menu.display}
                    x={this.state.menu.x}
                    y={this.state.menu.y}
                    onAction={(type)=>this.handelAction(type)}
                />
                <Action
                    visible={this.state.showAction}
                    type={this.state.actionType}
                    newValue={this.state.newValue}
                    oldValue={this.state.active}
                    onChange={(e)=>this.setState({newValue:e.target.value})}
                    onCancel={(e)=>this.hideAction()}

                    onRename={this.handleRename}
                    onNewFolder={this.handleNewFolder}
                />
            </div>
        )
    },
    deleteFile(){
        var that=this;
        var path = this.state.path.join('/') +'/' +  this.state.active;
        var query = {
            path:path
        };
        Modal.confirm({
            title:'是否想删除这个文件',
            content:'该操作很危险，请小心',
            onOk:function () {
                remove(query,function (res) {
                    var file = that.state.file;
                    var json=[];
                    for(let i=0;i<file.length;i++){
                        if(file[i].name != that.state.active){
                            json.push(file[i])
                        }
                    }
                    that.setState({
                        file:json
                    });
                    that.hideAction();
                    message.success('成功删除文件'+name);
                })
            },
            onCancel:function(){
                console.log("333")
            }
        })

    },
    handleRename(name){
        var path = this.state.path.join('/')+'/'+this.state.active;
        var query = {
            name:name,
            path:path
        };
        var that = this;
        rename(query,function (res) {
            var file = that.state.file;
            var json=[];
            file.map(function (obj) {
                if(obj.name==that.state.active){
                    json.push(res);
                }else{
                    json.push(obj)
                }
            });
            that.setState({
                file:json
            });
            that.hideAction();
            message.success('成功重命名文件'+name);
            that.pickItem(name);

        })
    },
    handleNewFolder(name){
        var that =this;
        var path = this.state.path.join('/');
        newFolder({
            name:name,
            path:path
        },function (res) {
            console.log(res);
            var file = that.state.file;
            file.push(res);
            that.setState({file:file});
            message.success('成功新建文件'+name);
            that.hideAction();
        })
    },
    handelAction(type){
        var that=this;
        this.hideMenu();
        this.setState({
            actionType:type
        });
        if(type =='delete' && !this.state.active){
            Modal.error({
                title:'操作错误',
                content:'删除时请选中某个文件'
            });
            return
        }
        if(type =='copy' && !this.state.active){
            Modal.error({
                title:'操作错误',
                content:'复制时时请选中某个文件'
            });
            return
        }

        if(type =='rename' && !this.state.active){
            Modal.error({
                title:'操作错误',
                content:'重命名时请选中某个文件'
            });
            return
        }
        if(type==="rename" && !this.state.active){
            Modal.error({
                title:"操作失误",
                content:"重命名请选择中文件夹"
            });
            return
        }
        if(type==="newFolder"){
            var times=0;
            this.state.file.map(function (obj) {
                if(/^test/.test(obj.name)){
                    times++
                }
            });
            this.setState({
                newValue:'test'+times
            });
            this.showAction()
        }
        if(type==="rename"){
            this.setState({
                newValue:this.state.active
            });
            this.showAction()
        }
        if(type == 'delete'){
            this.deleteFile()
        }
        if(type=="copy"){
            var file = this.state.file;
            var item = [];
            file.map(function (obj) {
                if(obj.name===that.state.active){
                   item=obj
                }
            });
            that.setState({
                copyItem:item
            });
            message.success('成功复制文件'+that.state.active);
        }
        if(type=="paste"){
            var file = this.state.file;
            var item = this.state.copyItem;
            var flag = false;
            console.log(file);
            console.log(item);
            for(var i=0;i<file.length;i++){
                if(file[i].name == item.name){
                    flag = true
                }
            }
            if(flag){
                Modal.confirm({
                    title:'警告',
                    content:'当前文件夹内存在同名文件，是否继续？',
                    onOk:function () {
                        file.push(item);
                        that.setState({
                            file:file
                        });
                        message.success('成功复制文件'+that.state.active);
                    },
                    onCancel:function () {
                        message.success('取消操作');
                    }
                })
            }
            file.push(item);
            that.setState({
                file:file
            });
            message.success('成功复制文件'+that.state.active)
        }
    },
    pickItem(name){
        this.setState({active:name,newValue:name})
    },
    unPickItem(name){
        this.setState({active:'',newValue:''})
    },
    showAction(){
        this.setState({showAction:true})
    },
    hideAction(){
        this.setState({showAction:false})
    },
    showMenu(e){
        this.setState({
            menu:{
                x:e.clientX,
                y:e.clientY,
                display:true
            }
        })
    },
    hideMenu(){
        this.setState({
            menu:{
                display:false,
            },
        })
    },
    mouseDown(e){
        if(e.button===2){
            this.showMenu(e)
        }else{
            this.hideMenu();
            this.unPickItem(name)
        }
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