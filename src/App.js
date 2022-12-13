import React from 'react';
import {CompleteSudoku} from './Components/CompleteSudoku'
import { ReactNotifications } from 'react-notifications-component';
const App = () => {
    return (
    <div>
        <ReactNotifications />
        <CompleteSudoku />
    </div>
    )
};

export default App;