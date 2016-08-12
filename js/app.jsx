var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
window.$ = $;
global.jQuery = $;

var FilterComponent =React.createClass({
    render : function(){
        return(
            <ul className="nav nav-pills">
                <li role="presentation" className="active"><a href="#" id="display">
                    All Tasks
                </a></li>
                <li role="presentation"><a href="#" id="complete">
                    Completed Tasks
                </a></li>
                <li role="presentation"><a href="#" id="uncomplete">
                    UnCompleted Tasks
                </a></li>
            </ul>
        );
    }
});
var AddComponent = React.createClass({
   render:function(){
       return(
           <div className="container-fluid">
               <button className="btn btn-success" data-toggle="collapse" data-target="#new-task">New Task</button>

               <div id="new-task" className="collapse">
                   <div className="panel-body">
                       <div className="input-group">
                           <input type="text" className="form-control" placeholder="Enter the task..." />
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button">Add!</button>
                            </span>
                       </div>
                   </div>
               </div>
           </div>
       );
   }
});
var ListComponent=React.createClass({
   render : function(){
       return(
           <div className="list-group">
               <button type="button" className="list-group-item">Eat food regularly</button>
               <button type="button" className="list-group-item">Brush uour teeth daily</button>
               <button type="button" className="list-group-item">speack truth </button>
           </div>
       );

   }
});

var TodoAppComponent = React.createClass({
    getInitialState: function () {
        return {
            todoList : []
        };
    },
    render : function () {
        return (
            <div className="container-fluid">
                <AddComponent />
                <hr />
                <FilterComponent />
                <hr />
                <ListComponent />
            </div>
        );
    }
});

ReactDOM.render( <TodoAppComponent />, document.getElementById('block'));

