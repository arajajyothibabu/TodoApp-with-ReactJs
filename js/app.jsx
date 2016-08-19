var React = require('react');
var ReactDOM = require('react-dom');

var SampleComponent = React.createClass({
    getInitialState : function(){
        return {
            editing:false
        };
    },
    edit : function() {
        //alert("edited successfully");
        this.setState({editing: true})
    },
    remove :function() {
        //alert("removed successfully")
        console.log('Removing comment');
    },
    render: function () {
        return(
            <div className="block-body">

                    {this.props.children}
            </div>

        );
    }
});
ReactDOM.render(
    <SampleComponent>indu</SampleComponent>, document.getElementById('block')
);

