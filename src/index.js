import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Game } from './game/Game'

const App = () => {
    return <Game />
}

ReactDOM.render(<App />, document.getElementById('root'));
