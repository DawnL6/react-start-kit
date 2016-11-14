import React from 'react';
import './index.css'
var Menu = React.createClass({
    render(){
        const {display,x,y} = this.props;
        return(
            <ul
                className="menu"
                style={{display:display ? 'block' : 'none',
                    left:x+'px',top:y+'px'}}
                onClick={this.handleClick}
            >
                <li className="items" onMouseDown={(e)=>this.mousedown(e,'newFolder')}>新建文件夹</li>
                <li className="items" onMouseDown={(e)=>this.mousedown(e,'rename')}>重命名</li>
                <li className="items" onMouseDown={(e)=>this.mousedown(e,'delete')}>删除</li>
                <li className="items" onMouseDown={(e)=>this.mousedown(e,'copy')}>复制</li>
                <li className="items" onMouseDown={(e)=>this.mousedown(e,'paste')}>粘贴</li>
            </ul>
        )
    },
    mousedown(e,type){
        const {onAction}=this.props;
        e.preventDefault();
        e.stopPropagation();
        onAction(type);

    }
});
export default Menu;