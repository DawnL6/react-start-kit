import React from 'react';
var FormItem = React.createClass({
    render(){
       return(
          <div>
              <p>
                  <label>{this.props.label}</label>
                  <input
                      value={this.props.value}
                      onChange={this.props.onChange}
                  />
              </p>
              <p style={{display:this.props.error?"block":"none"}}>
                  {this.props.errmsg}
              </p>
          </div>
       )
    }
});
export default FormItem;