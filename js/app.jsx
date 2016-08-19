var React = require('react');
var ReactDOM = require('react-dom');

var SampleComponent = React.createClass({
    getInitialState : function(){
        return {
            editing:false
        };
    },
    handleFilter : function(e){
        this.setState({activeArray : this.state.activeArray.map(function(arrayElement, i){
                return e.target.id == i;
            })
    },
    remove :function() {
        //alert("removed successfully")
        console.log('Removing comment');
    },
    render: function () {
        return(
            <ul className="nav nav-pills">
                <li role="presentation" className={ Boolean(this.state.activeArray[0]) ? "active" : "" } ><a href="#" id="0" onClick={this.handleFilter} >
                    All Tasks
                    OnGoing Tasks
                    Completed Tasks
    handleSubmit: function (e) {
        e.preventDefault();
        this.setState({ desc : e.target.value});

    render:function(){
        return(
            <div className="container-fluid">
                <button className="btn btn-success" data-toggle="collapse" data-target="#new-task">New Task</button>
                    <form onSubmit={this.handleSubmit}>
                        <div id="new-task" className="collapse">
                            <div className="panel-body">
                                <div className="input-group">
                                    <input type="text" onChange={ this.handleTask } value={this.state.desc} className="form-control" placeholder="Enter the task..." />
                                        <span className="input-group-btn">
                                            <button className="btn btn-default" type="submit">Add!</button>
                                        </span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
        );
    }
    handleNew : function(e){
        e.preventDefault();
        this.props.handleNew(e.target.id);
    },
    handleRemove : function(e){
        e.preventDefault();
        this.props.handleRemove(e.target.id);
    },
    handleOnGoing : function(e)
    {
        this.props.handleOnGoing(e.target.id);
                        var classes = task.status == 0? classes = 'list-group-item clearfix list-group-item-success' : 'list-group-item clearfix';
                                        (task.status == 0||task.status == 2) || <button type="button" id={task.id} className="btn btn-xs btn-success" onClick={_this.handleNew}>Suspend</button>
                                    }
                                    &nbsp;
                                    {
                                        task.status == 1 || <button type="button" id={task.id} className="btn btn-xs btn-danger " onClick={_this.handleOnGoing}>OnGoing</button>
                                    }
                                    &nbsp;
                                    {
                                        (task.status == 2||task.status == 0) || <button type="button" id={task.id} className="btn btn-xs btn-warning " onClick={_this.handleComplete}>Completed</button>
                                    }
                                    &nbsp;
                                    {
                                        <button type="button" id={task.id} className="btn btn-xs btn-primary" onClick={_this.handleRemove}>Delete</button>

                    {this.props.children}
            </div>

var TodoAppComponent = React.createClass({
    generateId : function(){
        return Math.floor(Math.random()*90000) + 10000;
    },
    getInitialState: function () {
        return {
            todoList : [],
            filteredList : [],
            currentFilter : 0
        };
    },
   
    componentWillMount : function () {
        this.setState({
            filteredList : this.state.todoList
        });
    },
    addTodoTask : function (task) {
        var newTask = { id : this.generateId(), desc: task, status : false};
        this.setState({ todoList : this.state.todoList.concat([newTask])}, function(){
            this.addTodoFilter(this.state.currentFilter);
        });
    },
    addTodoFilter : function(filter) {
        this.setState({
            currentFilter : filter,
            filteredList : this.state.todoList.filter(function (task, i) {
                return filter == 0 || (filter == 1 && task.status) || (filter == 2 && !task.status);
            })
        });
    },
    handleRemove: function (taskId) {
        this.setState({
            todoList : this.state.todoList.filter(function (task, i) {
                return taskId != task.id;
            })
        }, function(){
            this.addTodoFilter(this.state.currentFilter);
        });
    },
    handleComplete: function(taskId) {
        this.setState({
            todoList : this.state.todoList.map(function (task, i) {
                if(taskId == task.id){
                    return {id : task.id, desc : task.desc, status : true };
                }else{
                    return task;
                }
            })
        }, function(){
            this.addTodoFilter(this.state.currentFilter);
        });
    },
    render : function () {
        return (
            <div className="container-fluid">
                <AddComponent addTodoTask={this.addTodoTask} />
                <hr />
                <FilterComponent addTodoFilter={this.addTodoFilter} />
                <hr />
                <ListComponent list={ this.state.filteredList } handleRemove={this.handleRemove} handleComplete={this.handleComplete}/>
            </div>
        );
    }
});
ReactDOM.render(
    <SampleComponent>indu</SampleComponent>, document.getElementById('block')
);

