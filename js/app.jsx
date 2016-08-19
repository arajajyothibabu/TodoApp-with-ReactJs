var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
window.$ = $;
global.jQuery = $;

var FilterComponent =React.createClass({
    getInitialState : function() {
        return {
            activeArray : [true, false, false]
        };
    },
    handleFilter : function(e){
        this.setState({activeArray : this.state.activeArray.map(function(arrayElement, i){
            return e.target.id == i;
        })
        });
        this.props.addTodoFilter(e.target.id);
    },
    render : function(){
        return(
            <ul className="nav nav-pills">
                <li role="presentation" className={ Boolean(this.state.activeArray[0]) ? "active" : "" } ><a href="#" id="0" onClick={this.handleFilter} >
                    New Tasks
                </a></li>
                <li role="presentation" className={ Boolean(this.state.activeArray[1])? "active" : "" } ><a href="#" id="1" onClick={this.handleFilter }>
                    OnGoing Tasks
                </a></li>
                <li role="presentation" className={ Boolean(this.state.activeArray[2]) ? "active" : ""} ><a href="#" id="2" onClick={this.handleFilter}>
                    Completed Tasks
                </a></li>
            </ul>
        );
    }
});
var AddComponent = React.createClass({
    getInitialState : function () {
        return {
            desc : ""
        };
    },
    handleSubmit: function (e) {
        e.preventDefault();
        this.props.addTodoTask(this.state.desc);
        this.setState({ desc : ""});
    },
    handleTask : function (e) {
        this.setState({ desc : e.target.value});
        if(e.target.value == "") return;

    },
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
});
var ListComponent = React.createClass({
    getInitialState : function () {
        return {
            todoList : []
        };
    },
    componentWillMount : function () {
        this.setState({
            todoList : this.props.list
        });
    },
    componentWillReceiveProps : function (nextProps) {
        this.setState({
            todoList : nextProps.list
        });
    },
    handleNew : function(e){
        e.preventDefault();
        this.props.handleNew(e.target.id);
    },
    handleRemove : function(e){
        e.preventDefault();
        this.props.handleRemove(e.target.id);
    },
    handleComplete : function(e){
        e.preventDefault();
        this.props.handleComplete(e.target.id);
    },
    handleOnGoing : function(e)
    {
        e.preventDefault();
        this.props.handleOnGoing(e.target.id);
    },
    render : function() {
        var _this = this;
        return (
            <div className="list-group">
                {
                    this.state.todoList.map(function (task) {
                        var classes = task.status == 0? classes = 'list-group-item clearfix list-group-item-success' : 'list-group-item clearfix';
                        return (
                            <li className={classes} id={task.id}>
                                {
                                    task.desc
                                }
                                <div className="pull-right" role="group">
                                    {
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
                                    }
                                </div>

                            </li>
                        );
                    })
                }
            </div>
        );
    }
});

var TodoAppComponent = React.createClass({
    generateId : function(){
        return Math.floor(Math.random()*90000) + 10000;
    },
    getInitialState: function () {
        return {
            todoList : [
                {id : this.generateId(), desc: 'eat food', status:0},
                {id : this.generateId(), desc: 'eat food regularly', status :1},
                {id : this.generateId(), desc: 'Drink milk daily', status :2}] ,
            filteredList : [],
            currentFilter : 0,

        };
    },

    componentWillMount : function () {
        this.setState({
            filteredList : this.state.todoList
        });
    },
    addTodoTask : function (task) {
        var newTask = { id : this.generateId(), desc: task, status :0 };
        this.setState({ todoList : this.state.todoList.concat([newTask])}, function(){
            this.addTodoFilter(this.state.currentFilter);
        });
    },
    addTodoFilter : function(filter) {
        this.setState({
            currentFilter : filter,
            filteredList : this.state.todoList.filter(function (task, i) {
                return (filter == 0 && (task.status==0)) || (filter == 1 && (task.status == 1)) || (filter == 2 && (task.status == 2));
            })
        });
    },
    handleRemove : function(taskId){
        this.setState({
            todoList : this.state.todoList.filter(function (task, i) {
                return taskId != task.id;
            })
        }, function(){
            this.addTodoFilter(this.state.currentFilter);
        });
    },
    handleNew: function (taskId) {
        /* this.setState({
         todoList : this.state.todoList.filter(function (task, i) {
         return taskId != task.id;
         })
         }, function(){
         this.addTodoFilter(this.state.currentFilter);
         });*/
        this.setState({
            todoList : this.state.todoList.map(function (task, i) {
                if(taskId == task.id){
                    return {id : task.id, desc : task.desc, status :0  };
                }else{
                    return task;
                }
            })
        }, function(){
            this.addTodoFilter(this.state.currentFilter);
        });
    },
    handleComplete: function(taskId) {
        this.setState({
            todoList : this.state.todoList.map(function (task, i) {
                if(taskId == task.id){
                    return {id : task.id, desc : task.desc, status : 2 };
                }else{
                    return task;
                }
            })
        }, function(){
            this.addTodoFilter(this.state.currentFilter);
        });
    },
    handleOnGoing : function(taskId){
        this.setState({
            todoList : this.state.todoList.map(function (task, i) {
                if(taskId == task.id){
                    return {id : task.id, desc : task.desc, status : 1 };
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
                <ListComponent list={ this.state.filteredList } handleComplete={this.handleComplete} handleNew={this.handleNew} handleOnGoing={this.handleOnGoing} handleRemove={this.handleRemove}/>
            </div>
        );
    }
});

ReactDOM.render( <TodoAppComponent />, document.getElementById('block'));