import React from 'react';
import {Table,Button,Modal,Form,Input,Radio,Row,Col,message} from 'antd';
import 'antd/dist/antd.css';
import Action from './action';
import request from 'superagent';

var api = 'http://101.200.129.112:9527/react1/student/';
var header = [
    {title:"id",dataIndex:"id"},
    {title:"name",dataIndex:"name"},
    {title:"age",dataIndex:"age"},
    {title:"sex",dataIndex:"sex"},
    {
        title:"single",
        dataIndex:"single",
        render:(single)=>(<div>{single?"单身狗":"恩爱狗"}</div>)
    }
];
var ReactTest = React.createClass({
    getInitialState(){
        return{
            loading:false,
            items:[],
            showAdd:false,
            showEdit:false,
            name:'',
            age:'',
            sex:'boy',
            single:true,
            action:null,
            selectedRowKeys: []
        }
    },
    onSelectChange(selectedRowKeys) {
        var id = selectedRowKeys[0];
        var items = this.state.items;
        var obj={};
        for(let i=0;i<items.length;i++){
            if(items[i].id == id){
                obj=items[i]
            }
        }
        this.setState({
            selectedRowKeys:selectedRowKeys,
            name:obj.name,
            age:obj.age,
            sex:obj.sex,
            single:obj.single
        });
    },
    render:function(){
        const {selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        var hasSelected = selectedRowKeys.length !== 1;
        return(
            <div className="items">
                <h3>动脑学院学员管理系统</h3>
                <div>
                    <Button type="primary" icon="plus" onClick={()=>this.setState({action:"add"})}>增加</Button>
                    <Button type="edit" icon="edit" disabled={hasSelected} onClick={()=>this.setState({action:"edit"})}>修改</Button>
                    <Button icon="delete" onClick={this.handelDelete} disabled={hasSelected}>删除</Button>
                    <Table rowSelection={rowSelection} loading={this.state.loading} columns={header} dataSource={this.state.items}/>
                </div>
                <Action
                    name={this.state.name}
                    age={this.state.age}
                    sex={this.state.sex}
                    single={this.state.single}
                    onChange={this.handleChange}
                    onAdd={this.handleSave}
                    onEdit={this.handleEdit}
                    action={this.state.action}
                    visible={!!this.state.action}
                    onCancel={()=>this.setState({action:null})}
                />
            </div>
        )
    },
    handleEdit(){
        var that = this;
        var id = this.state.selectedRowKeys[0];
        var obj = {
            name:this.state.name,
            sex:this.state.sex,
            age:this.state.age,
            single:this.state.single
        };
        var editRequest = api + id + '/';
        request
            .patch(editRequest)
            .send(obj)
            .end(function (err,res) {
                if(err){return console.log(err)}
                var items = that.state.items;
                items=items.map(function (o) {
                    if(o.id == id){
                        obj.id=id;
                        o = obj
                    }
                    return o
                });
                that.setState({
                    items:items,
                    action:null,
                    selectedRowKeys: []
                });
                message.success('成功更新数据'+id)
            })
    },
    handelDelete(){
        var that=this;
        console.log(that.state.selectedRowKeys);
        Modal.confirm({
            title:'删除学生信息',
            content:'你确定要删除这条学生的记录吗',
            onOk:function(){
                message.success("成功的删除了一条信息");
                var id = that.state.selectedRowKeys[0];
                var deleteRequest = api+id+'/';
                request
                    .delete(deleteRequest)
                    .end(function (err, res) {
                        var items = [];
                        var student = that.state.items;
                        for(var i=0;i<student.length;i++){
                            if(student[i].id != id){
                                items.push(student[i])
                            }
                        }
                        that.setState({
                            items:items,
                            selectedRowKeys: []
                        });
                        message.success('成功删除数据'+id);
                        console.log(that.state.selectedRowKeys)
                    })
            }
        })
    },
    handleChange:function (e,type) {
        var value = e.target.value,
            obj = {};
        obj[type] = value;
        this.setState(obj)
    },
    handleSave:function(){
        var that = this;
        var data={
            name : this.state.name,
            age : this.state.age,
            sex : this.state.sex,
            single : this.state.single
        };
        request
            .post(api)
            .send(data)
            .end(function (err,res) {
                if(err){return console.log(err)}
                var item = res.body;
                item.key=item.id;
                var items = that.state.items;
                items.unshift(item);
                that.setState({
                    items:items,
                    action:null
                });
                message.success('成功添加数据'+item.name)
            })
    },
    componentDidMount(){
        var that = this;
        that.setState({
            loading:true
        });
        request
            .get(api)
            .end(function (err,res) {
                if(err){return console.log(err)}
                res.body = res.body.map(function (obj) {
                    obj.key=obj.id;
                    return obj
                });
                that.setState({
                    items:res.body,
                    loading:false
                })
            })
    }
});
export default ReactTest;