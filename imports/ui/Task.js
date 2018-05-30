import React, {Component} from 'react';
//import {Tasks} from "../api/tasks";
import {Meteor} from 'meteor/meteor';
import classnames from 'classnames';

//task组件 —— 展示一个单独的todo任务
export default class Task extends Component{

    toggleCheckd() {
        Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
        /*
        Tasks.update(this.props.task._id, {
            $set: {checked : !this.props.task.checked},
        });*/
    }

    deleteThisTask() {
        //Tasks.remove(this.props.task._id);
        Meteor.call('tasks.remove', this.props.task._id);
    }

    togglePrivate() {
        Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.private);
    }



    render() {

        //const taskClassName = this.props.task.checked ? 'checked' : '';

        const taskClassName = classnames(
            {
                checked: this.props.task.checked,
                private:this.props.task.private,
            }
        );


        return (

            <li className={taskClassName}>
                <button className="delete" onClick={this.deleteThisTask.bind(this)}>
                    &times;
                </button>
                <input
                    type="checkbox"
                    readOnly
                    checked={!!this.props.task.checked}
                    onClick={this.toggleCheckd.bind(this)}
                />
                {
                    this.props.showPrivateButton ? (
                        <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
                            {this.props.task.private ? 'Private' : 'public'}
                        </button>
                    ) : ''
                }
                <span className="text">
                    <strong>{this.props.task.username}</strong> : {this.props.task.text}
                </span>
            </li>
        );
    }
}
