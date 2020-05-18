import React from 'react';
import './App.css';
import Aux from './hoc/aux-div.js';
import Board from './containers/Board/Board';

class App extends React.Component {
  state = {
    board: {
      name: 'My sticky note board',
      lists: [{name: 'This is the first list!',
              notes: [{title: 'Note 1',
                      description: 'Despription for Note 1.....'},
                      {title: 'Note 2',
                      description: 'Despription for Note 2.....'},
                      {title: 'Note 3',
                      description: 'Despription for Note 3.....'}
            ]}]
    }
  }
  render (){
    return (    
    <Aux>
      <div>This works!!!</div> 
      <Board board={this.state.board}></Board>
      </Aux>
    );
  }
}

export default App;
