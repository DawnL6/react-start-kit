/**
 * Created by Administrator on 2016/10/31.
 */
import React from 'react';
import Button from './button';
import Input from './input';
import Table from './Table';
import FormItem from './form-item';
const dataSource = [{
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
}, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
}];

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
}, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
}];
var AntStudy = React.createClass({
    getInitialState :function(){
        return{
            value : "aaa",
            val : "请输入用户名",
            error : false
        }
    },
    render : function(){
        return(
            <div>
                <h3>ant-study</h3>
                <Button type="info">我是按钮</Button>
                <Input
                    value={this.state.value}
                    onChange={(e)=>this.setState({value:e.target.value})}
                    onPressEnter={this.enter}
                />
                <Table onRowClick={this.handel} columns={columns} dataSource={dataSource}/>
                <FormItem
                    label='姓名'
                    value={this.state.val}
                    onChange={this.handleChange}
                    error ={this.state.error}
                    errmsg="阿卡莎杀"
                />
            </div>
        )
    },
    enter : function(e){
        console.log(e.target.value)
    },
    handel:function(obj){
        console.log(JSON.stringify(obj))
    },
    handleChange:function (e) {
        if(e.target.value == "abc"){
            this.setState({
                val:e.target.value,
                error:true
            })
        }else{
            this.setState({
                val:e.target.value,
                error:false
            })
        }

    }
});
export default AntStudy;