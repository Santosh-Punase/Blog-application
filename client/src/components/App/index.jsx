import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { Home, Nav } from '../../components'
import { Form, FullArticle } from '../Article';

class App extends Component {
    render() {
        return (
            <div>
                <Nav />
                <div className="container">
                <Route exact path="/" component={Home} />
                <Route exact path="/blog/:id" component={FullArticle} />  
                <Route exact path="/add-blog" component={Form} />  
                </div>              
            </div>
        );
    }
}

export default App;