import React from 'react'

import {Table,Button,Modal,Form,Input,Radio,Row,Col,message} from 'antd'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
import 'antd/dist/antd.css'
import request from 'superagent';

var Action = React.createClass({
    render(){
        const {name,age,sex,single,onChange,onAdd,onEdit,visible,action,title,onCancel} = this.props;
        return(
            <div>
                <Modal
                    visible={visible}
                    onCancel={onCancel}
                    onOk={action=="add"?onAdd:onEdit}
                    title={action=="add"?"增加学生信息":"编辑学生信息"}
                >
                    <Form>
                        <FormItem
                            label="名字"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span:16 }}
                        >
                            <Input value={name} onChange={(e)=>onChange(e,'name')}/>
                        </FormItem>
                        <FormItem
                            label="年龄"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span:16 }}
                        >
                            <Input value={age} onChange={(e)=>onChange(e,'age')}/>
                        </FormItem>
                        <FormItem
                            label="性别"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span:16 }}
                        >
                            <RadioGroup value={sex} onChange={(e)=>onChange(e,'sex')}>
                                <Radio key="boy" value={'boy'}>小鲜肉</Radio>
                                <Radio key="girl" value={'girl'}>小萝莉</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem
                            label="单身狗"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span:16 }}
                        >
                            <RadioGroup value={single} onChange={(e)=>onChange(e,'single')}>
                                <RadioButton key="boy" value={true}>单身狗</RadioButton>
                                <RadioButton key="girl" value={false}>恩爱狗</RadioButton>
                            </RadioGroup>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
});
export default Action;