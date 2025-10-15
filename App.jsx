import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import YonkersPanel from './YonkersPanel';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/yonkers" component={YonkersPanel} />
                {/* Other routes */}
            </Switch>
        </Router>
    );
};

export default App;