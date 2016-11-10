import React from 'react';
import Todolsit from './to-do'
function id() {
    return Math.random().toString().replace(/\./,'')+'-'+Math.random().toString().replace(/\./,'')
}
var Todo = React.createClass({
    getInitialState:function(){
      return{
          items : [
              {test:"aaa",id:id(),type:'active'},
              {test:"bbb",id:id(),type:'complete'},
              {test:"ccc",id:id(),type:'active'}
          ],
          value:"dawn",
          type:'active'

      }
    },
    render:function(){
     var items = this.state.items;
     var type = this.state.type;
     var json =[];
        items.map(function (obj) {
            if(obj.type === type||type === "all"){
                json.push(obj)
            }
        });
     return(
         <div className="items">
             <h3>hello</h3>
             <p>
                 <input value={this.state.value} onChange={this.handleChange}/>
                 <button onClick={this.handel}>提交</button>
             </p>
             <Todolsit
                 items={json}
                 onDelete={this.handelDelete}
                 onEdit={this.handleEdit}
                 onType={this.handleType}
             />
             <p>
                 <button onClick={(e)=>this.setState({type:"all"})}>all</button>
                 <button onClick={(e)=>this.setState({type:"active"})}>active</button>
                 <button onClick={(e)=>this.setState({type:"complete"})}>completed</button>
             </p>
         </div>
     )
    },
    handleType:function(obj,type){
        console.log(obj,type)
    },
    handleEdit : function (obj) {
        var items = this.state.items;
        items.map(function (o) {
            if(o.id==obj.id){
                o.test=obj.test
            }
            return o;
        });
        this.setState({items:items})
    },
    handelDelete:function(obj){
        var items = this.state.items;
        var json = [];
        for(let i=0;i<items.length;i++){
            if(items[i].id!=obj.id){
                json.push(items[i])
            }
        }
        this.setState({items:json})
    },
    handel : function(){
        var items = this.state.items;
        var test = this.state.value;
        items.push({
            test : test,
            id :id()
        });
        this.setState({
            items : items,
            value:''
        });
    },
    handleChange : function(e){
        this.setState({
            value:e.target.value
        })
    }
});
export default Todo;
