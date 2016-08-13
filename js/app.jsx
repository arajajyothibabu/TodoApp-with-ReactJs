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
                    All Tasks
                </a></li>
                <li role="presentation" className={ Boolean(this.state.activeArray[1])? "active" : "" } ><a href="#" id="1" onClick={this.handleFilter }>
                    Completed Tasks
                </a></li>
                <li role="presentation" className={ Boolean(this.state.activeArray[2]) ? "active" : ""} ><a href="#" id="2" onClick={this.handleFilter}>
                    InCompleted Tasks
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
    handleSubmit: function () {
        this.props.addTodoTask(this.state.desc);
        this.setState({ desc : ""});
    },
    handleTask : function (e) {
        if(e.target.value == "") return;
        this.setState({ desc : e.target.value});
    },
   render:function(){
       return(
           <div className="container-fluid">
               <button className="btn btn-success" data-toggle="collapse" data-target="#new-task">New Task</button>
               <div id="new-task" className="collapse">
                   <div className="panel-body">
                       <div className="input-group">
                           <input type="text" onChange={ this.handleTask } value={this.state.desc} className="form-control" placeholder="Enter the task..." />
                           <span className="input-group-btn">
                               <button className="btn btn-default" onClick={ this.handleSubmit} type="button">Add!</button>
                           </span>
                       </div>
                   </div>
               </div>
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
    handleComplete : function(e){
        e.preventDefault();
        this.props.handleComplete(e.target.id);
    },
    removeTask : function(e){
        e.preventDefault();
        this.props.handleRemove(e.target.id);
    },
    render : function() {
        var _this = this;
        return (
            <div className="list-group">
                {
                    this.state.todoList.map(function (task) {
                        var classes = task.status? classes = 'list-group-item clearfix list-group-item-success' : 'list-group-item clearfix';
                        return (
                            <li className={classes} id={task.id}>
                                {
                                    task.desc
                                }
                                <div className="pull-right" role="group">
                                    {
                                        Boolean(task.status) || <button type="button" id={task.id} className="btn btn-xs btn-success img-circle" onClick={_this.handleComplete}>&#x2713;</button>
                                    }
                                     &nbsp;<button type="button" id={task.id} className="btn btn-xs btn-danger img-circle" onClick={_this.removeTask}>&#xff38;</button>
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

ReactDOM.render( <TodoAppComponent />, document.getElementById('block'));
