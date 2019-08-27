import React, { Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
       term: '' 
    };

    onSearchChange = (e) => {
        const term = e.target.value;//получили текущее значение инпута
        this.setState({ term });
        this.props.onSearchChange(term);
    };

    render() {
        return (
            <input type="text"
                className="form-control search-input"
                placeholder='type to search' 
                value = {this.state.term}
                onChange={this.onSearchChange} />
            ); 
    
        };
    };
 