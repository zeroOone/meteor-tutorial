import React, {Component} from 'react';
import {Tasks} from "../api/tasks";

//task组件 —— 展示一个单独的todo任务
export default class Task extends Component{

    toggleCheckd() {
        Tasks.update(this.props.task._id, {
            $set: {checked : !this.props.task.checked},
        });
    }

    deleteThisTask() {
        Tasks.remove(this.props.task._id);
    }



    render() {

        const taskClassName = this.props.task.checked ? 'checked' : '';


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
                <span className="text">
                    <strong>{this.props.task.username}</strong> : {this.props.task.text}
                </span>
            </li>
        );
    }
}
