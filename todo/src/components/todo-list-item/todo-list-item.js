import React, { Component } from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component {

    // constructor() {
    //     super();
    //     this.state = {
    //        done: false 
    //     };
    // } можно заменить кодом ниже

    // state = {
    //     done: false,
    //     important: false
    // };

    // constructor() {
    //   super();

    //   this.onLabelClick = () => {
    //     console.log(`Done: ${this.props.label}`);
    //   }; 
    // } код более консервативен, заменяется кодом ниже, без constructor 

    // onLabelClick = () => {
    //     console/log(`Done: ${this.props.label}`);
    // }

    // onLabelClick = () => {
    //     this.setState({
    //        done: true 
    //     });
    // }; состояние не переключается

//    onLabelClick = () => {
//        this.setState(({done}) => {
//            return {
//                done: !done
//            };
//        });
//    };
   //позволяет переключать состояние
    

    // onMarkImportant = () => {
    //     this.setState({
    //         important: true
    //     });
    // }; состояние не переключается

    // onMarkImportant = () => {
    //     this.setState(({important}) => {
    //        return {
    //           important: !important 
    //        }; 
    //     });
    // }; 
    //этот код позволяет переключать состояния - всегда будет исполняться корректно

  
    render() {

        const { label, onDeleted,
                onToggleImportant,
                onToggleDone, done,
                important } = this.props;

        // const { done, important } = this.state;

        let classNames = 'todo-list-item';

        if (done) {
            classNames += ' done';
        }

       if (important) {
           classNames += ' important';
       }

        return (
            <span className={classNames}>
                <span className="todo-list-item-label"     
                    onClick = { onToggleDone }>
                    
                    {label}
                </span>
    
                <button type="button"
                    className="btn btn-outline-success btn-sm float-right"
                    onClick = { onToggleImportant }>
                    <i className="fa fa-exclamation"></i>
                </button> 
    
                <button type="button"
                    className="btn btn-outline-danger btn-sm float-right"
                    onClick={onDeleted}>
                        <i className="fa fa-trash-o"></i>
    
                </button>
            </span>
        );
    };
}


