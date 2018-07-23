import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Tasks} from '../api/tasks.js';
import ReactDOM from 'react-dom';
import AccountUIWrapper from './AccountsUIWrapper';
import {Meteor} from 'meteor/meteor';



import Task from './Task.js';

//App 组件 —— 用来展示整个应用
class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            hideCompleted:false,
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        //通过React的ref来寻找到文本域
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Meteor.call('tasks.insert', text);

        //插入数据
        Tasks.insert({
            text,
            createdAt:new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });

        //清空表单
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    toggleHideCompleted() {
        this.setState(
            {
                hideCompleted: !this.state.hideCompleted,
            }
        );
    }

    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }

        return filteredTasks.map(
            (task) => {
                //<Task key={task._id} task={task}/>
                const currentUserId = this.props.currentUser && this.props.currentUser._id;
                const showPrivateButton = task.owner === currentUserId;

                return(
                    <Task
                        key={task._id}
                        task={task}
                        showPrivateButton={showPrivateButton}
                    />
                );
            });
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List ({this.props.incompleteCount})</h1>
                    <label className="hide-completed">
                        <input
                            type="checkbox"
                            readOnly
                           onClick={this.toggleHideCompleted.bind(this)}
                        />
                        Hide Completed Tasks
                    </label>
                    <AccountUIWrapper/>
                    {
                        this.props.currentUser ?
                            <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                                <input
                                    type="text"
                                    ref="textInput"
                                    placeholder="Type to add new tasks"
                                />
                            </form> : ''
                    }
                </header>
                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

export default withTracker(
    ()=> {
        Meteor.subscribe('tasks');
        return {
            tasks:Tasks.find({},{sort: {createdAt:-1}}).fetch(),
            incompleteCount: Tasks.find({checked: {$ne:true}}).count(),
            currentUser: Meteor.user(),
        };
    }
)(App);
