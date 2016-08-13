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
    render : function(){
       return(
           <div className="list-group">
               {
                   this.state.todoList.map(function(task){
                       return (
                           <button key={task.id} id={task.id} type="button" className= { "list-group-item " + (task.status || "active")  }>{ task.desc }</button>
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
                {id : this.generateId(), desc: "I am so and so", status : false},
                {id : this.generateId(), desc: "I am so and sooo", status : true},
                {id : this.generateId(), desc: "I am so can't sooo", status : false},
                {id : this.generateId(), desc: "I am so can sooo", status : true},
                {id : this.generateId(), desc: "I am so only sooo", status : false},
                {id : this.generateId(), desc: "I am so but sooo", status : true}
            ],
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
    render : function () {
        return (
            <div className="container-fluid">
                <AddComponent addTodoTask={this.addTodoTask} />
                <hr />
                <FilterComponent addTodoFilter={this.addTodoFilter}/>
                <hr />
                <ListComponent list={ this.state.filteredList } />
            </div>
        );
    }
});

ReactDOM.render( <TodoAppComponent />, document.getElementById('block'));
