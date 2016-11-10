import React from 'react';
var TodoItems = React.createClass({
    getInitialState(){
      return{
          value : this.props.test
      }
    },
    render(){
        return(
            <li>
                {this.props.test}
                <button onClick={()=>this.props.delete(this.props.o)}>删除</button>
                <button onClick={()=>this.props.toggle((this.props.o,this.props.type == 'active' ? 'complete':'active'))}>toggle-->{this.props.type}</button>
                <br/>
                <input value={this.state.value} onChange={this.handleChange}/>
                <button onClick={this.handleEdit}>确定</button>
                <button onClick={this.handeCancel}>取消</button>
            </li>
        )
    },
    handleChange : function(e){
        this.setState({
            value:e.target.value
        })
    },

    handeCancel:function () {
        this.setState({
            value:this.props.test
        })
    },
    handleEdit : function(){
        var obj = {
            id:this.props.o.id,
            test:this.state.value
        };
        this.props.edit(obj)
    }
});
var Todolsit = React.createClass({
    render:function(){
        var that = this;
        var nodes = that.props.items.map(function (o) {
            return(
                <TodoItems
                    type={o.type}
                    id={o.id}
                    o ={o}
                    key={o.id}
                    test={o.test}
                    delete={that.props.onDelete}
                    edit={that.props.onEdit}
                    toggle={that.props.onType}
                />
            )
        });
        return(
            <div>
               <ul>{nodes}</ul>
            </div>
        )
    }
});
export default Todolsit;
