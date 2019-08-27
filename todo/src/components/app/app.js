import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';


import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData : [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')

            // { label: 'Drink Coffee', important: false, id: 1 },
            // { label: 'Make Awesome App', important: true, id: 2 },
            // { label: 'Have a lunch', important: false, id: 3 }
        ],
        term: ''
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {

        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            //  [a, b, c, d, e]
            //  [a, b,    d, e] 
            // const before = todoData.slice(0, idx); метод slice не изменяет эл-т
            // const after = todoData.slice(idx + 1);

            // const newArray = [...before, ...after];
            //объединим :

            const newArray = [
                ...todoData.slice(0, idx), 
                ...todoData.slice(idx + 1)
            ];
            //формула: oldArr не изменяется
            // newArr = [...oldArr.slice(0, idx),
            //           ...oldArr.slice(idx + 1)];
            //используем данные из старого массива, и снова данные из старого массива
            //для того, чтобы сделать новый массив, но уже без удаленного элемента


            return {
              todoData: newArray  
            }; 
        });
    };

    addItem = (text) => {
        // console.log('Added', text);
        // 1. generate id ?
        const newItem = this.createTodoItem(text);
        // const newItem = {
        //     label: text,
        //     important: false,
        //     id: this.maxId++
        // };

        // 2. add element in array?

        this.setState(({todoData}) => {
            // todoData.push(newItem); изменится уже существующий массив state 
            //- так нельзя категорически !!!!

            const newArr = [
                ...todoData,
                newItem
            ];

            return {
                todoData: newArr
            };       
        });   
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

           
            const oldItem = arr[idx];
            const newItem = {...oldItem, 
                            [propName]: !oldItem[propName]};

            return [
                ...arr.slice(0, idx),
                newItem, 
                ...arr.slice(idx + 1)
            ];
            
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {

            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
            //дальнейший код перенесем в общую функцию toggleProperty (выше)
            // const idx = todoData.findIndex((el) => el.id === id);

            // //1.update object
            // const oldItem = todoData[idx];
            // const newItem = {...oldItem, 
            //                 done: !oldItem.done};

            // //2.construct new array
            // const newArray = [
            //     ...todoData.slice(0, idx),
            //     newItem, 
            //     ...todoData.slice(idx + 1)
            // ];
            // return {
            //     todoData: newArray
            // };
        });
        // console.log('Toggle Done', id);
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    onSearchChange = (term) => {
        this.setState({term});
}

    search(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1;
        });
    };
    
    
    render () {

        const { todoData, term } = this.state;
        
        const visibleItems = this.search(todoData, term);

        const doneCount = todoData
                        .filter((el) => el.done).length;

        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">        
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel 
                    onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter/>
                </div>
                <TodoList 
                    // todos={todoData}
                    todos = {visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                 /> 
                 <ItemAddForm onItemAdded={this.addItem} />  
            </div>
        );
    }
   
};


