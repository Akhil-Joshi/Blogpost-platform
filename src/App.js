import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NewPostForm from './NewPostForm';
import BlogList from './BlogList';
import BlogPost from './BlogPost';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={BlogList} />
                    <Route path="/new" component={NewPostForm} />
                    <Route path="/blog/:id" component={BlogPost} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
