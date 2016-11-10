import React from 'react';

var Table = React.createClass({
    render : function () {
        var that = this;
        var header = this.props.columns,
            data = this.props.dataSource;
        var arr = [];
        var headerNodes = header.map(function (obj) {
            arr.push(obj.dataIndex)
            return(
                <td key={obj.key}>{obj.title}</td>
            )
        });
        var nodes = data.map(function (th,i) {
            var cols = arr.map(function (o,j) {
                return(
                    <td key={j}>{th[o]}</td>
                )
            });
            return(
                <tr onClick={(e)=>that.props.onRowClick(th)} key={i}>{cols}</tr>
            )
        });
        return(
            <div>
                <table>
                    <thead>
                        <tr>
                            {headerNodes}
                        </tr>
                    </thead>
                    <tbody>
                        {nodes}
                    </tbody>
                </table>
            </div>
        )
    }
});
export default Table;