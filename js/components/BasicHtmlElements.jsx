var todo = React.createClass({
    edit : function() {
        alert("edited successfully");
    },
    remove :function() {
        alert("removed successfully")
    },
    render: function () {
        return(
            <div>
                {
                    this.props.children
                }
                <button onClick={this.edit()} >Edit </button>
                <button onclick={this.remove()} >Remove</button>
            </div>
        );
    }
});
