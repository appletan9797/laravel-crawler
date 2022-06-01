import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import Home from './Home';
import ShowHistory from './showhistory';
import Result from './result';

/* import Add from './components/Add';
import Edit from './components/Edit'; */

const App = () => {
    return (
        <Router className='App_container'>
            <Routes> {/* switch changed to routes */}
                <Route exact path="/" element={<Home />}> </Route>
                <Route path="/showhistory" element={<ShowHistory />}> </Route>
                <Route path="/result/:id" element={<Result />}> </Route>
                {/* <Route path="/edit/:id" element={<Edit />}></Route> */}
            </Routes>
        </Router>
    );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
