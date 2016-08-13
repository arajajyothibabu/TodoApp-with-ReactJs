var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
window.$ = $;
global.jQuery = $;

var FilterComponent =React.createClass({
    getInitialState : function() {
        return {
            allState : "active",
            cState : "",
            unCState : ""
        };
    },
    handleAll : function(e){
        this.setState({
            allState : "active",
            cState : "",
            unCState : ""
        })
    },
    handleCompleted : function(e){
        this.setState({
            allState : "",
            cState : "active",
            unCState : ""
        })
    },
    handleUnCompleted : function(e){
        this.setState({
            allState : "",
            cState : "",
            unCState : "active"
        })
    },
    render : function(){
        return(
            <ul className="nav nav-pills">
                <li role="presentation" className={ this.state.allState}  onClick={this.handleAll} ><a href="#" id="display" >
                    All Tasks
                </a></li>
                <li role="presentation" className={ this.state.cState} onClick={this.handleCompleted } ><a href="#" id="complete">
                    Completed Tasks
                </a></li>
                <li role="presentation" className={ this.state.unCState} onClick={this.handleUnCompleted} ><a href="#" id="incomplete">
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
                {id : this.generateId(), desc: "I am so and sooo", status : true}
            ]
        };
    },
    addTodoTask : function (task) {
        var newTask = { id : this.generateId(), desc: task, status : false};
        var newList = this.state.todoList.concat([newTask]);
        this.setState({ todoList : newList});
    },
    addTodoFilter : function(filter) {
        var sel = {desc: filter, status: false};
    },
    render : function () {
        return (
            <div className="container-fluid">
                <AddComponent addTodoTask={this.addTodoTask} />
                <hr />
                <FilterComponent addTodofilter={this.addTodoFilter}/>
                <hr />
                <ListComponent list={ this.state.todoList } />
            </div>
        );
    }
});

ReactDOM.render( <TodoAppComponent />, document.getElementById('block'));

