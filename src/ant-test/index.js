import React from 'react';
import {Table,Button,Modal,Form,Input,Radio,Row,Col,message} from 'antd';
import 'antd/dist/antd.css';
import request from 'superagent';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

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
            name:'dawn',
            age:'22',
            sex:'boy',
            single:true,
            selectedRowKeys: []
        }
    },
    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys });
    },
    render:function(){
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length !== 1;
        return(
            <div>
                <h3>动脑学院学员管理系统</h3>
                <div>
                    <Button type="primary" icon="plus" onClick={()=>this.setState({showAdd:true})}>增加</Button>
                    <Button type="edit" icon="edit" disabled={hasSelected}>修改</Button>
                    <Button icon="delete" onClick={this.handelDelete} disabled={hasSelected}>删除</Button>
                    <Table rowSelection={rowSelection} loading={this.state.loading} columns={header} dataSource={this.state.items}/>
                </div>
                <Modal
                    visible={this.state.showAdd}
                    onCancel={()=>this.setState({showAdd:false})}
                    onOk={this.handleSave}
                    title="增加学生信息"
                >
                    <Form>
                        <FormItem
                            label="名字"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span:16 }}
                        >
                            <Input value={this.state.name} onChange={(e)=>this.handleChange(e,'name')}/>
                        </FormItem>
                        <FormItem
                            label="年龄"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span:16 }}
                        >
                            <Input value={this.state.age} onChange={(e)=>this.handleChange(e,'age')}/>
                        </FormItem>
                        <FormItem
                            label="性别"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span:16 }}
                        >
                            <RadioGroup value={this.state.sex} onChange={(e)=>this.handleChange(e,'sex')}>
                                <Radio key="boy" value={'boy'}>小鲜肉</Radio>
                                <Radio key="girl" value={'girl'}>小萝莉</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem
                            label="单身狗"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span:16 }}
                        >
                            <RadioGroup value={this.state.single} onChange={(e)=>this.handleChange(e,'single')}>
                                <RadioButton key="boy" value={true}>单身狗</RadioButton>
                                <RadioButton key="girl" value={false}>恩爱狗</RadioButton>
                            </RadioGroup>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    },
    handelDelete(){
        var that=this;
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
                            items:items
                        });
                        message.success('成功删除数据'+id)
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
                    showAdd:false
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