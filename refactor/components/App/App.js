import React, { Component } from 'react';
import OptionsPanel from '../OptionsPanel'
import Board from '../Board'
import { createTiles, indexOfSelected } from '../../misc/utils';
import GameContext from '../../GameContext';
import './App.css';

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      numTiles: 36,
      playing: false,
      previousTileIndex: null,
      tiles: [],
      toBeCleared: null
    };
  }

  startGame() {
    console.log('startGame');
    this.setState((prevState) => ({
      numTiles: prevState.numTiles,
      playing: true,
      previousTileIndex: null,
      tiles: createTiles(prevState.numTiles, this.handleTileClicked.bind(this)),
      toBeCleared: null,
    }));
  }

  handleTileClicked(id, color) {
    this.setState((state) => {
      const tiles = state.tiles;
      let toBeCleared = state.toBeCleared;
      const selectedTileIndex = indexOfSelected(tiles, id, color);
      let previousTileIndex = state.previousTileIndex;

      if (toBeCleared !== null) {
        state.tiles[toBeCleared[0]].selected = false;
        state.tiles[toBeCleared[1]].selected = false;
        toBeCleared = null;
      }

      state.tiles[selectedTileIndex].selected = true;

      if (previousTileIndex !== null) {
        let previousTile = tiles[previousTileIndex];
        let selectedTile = tiles[selectedTileIndex];
        if (selectedTile.id !== previousTile.id && previousTile.color === color) {
          selectedTile.matched = true;
          previousTile.matched = true;
          previousTileIndex = null;
        } else {
          toBeCleared = [previousTileIndex, selectedTileIndex];
          previousTileIndex = null;
        }

      } else {
        previousTileIndex = selectedTileIndex;
      }

      return { tiles, toBeCleared, previousTileIndex };
    })
  }

  handleNumTileChange(num) {
    console.log('handleNumTileChange:', num);
    this.setState({
      numTiles: num,
      playing: false,
      tiles: []
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Turbo-Matcher
        </header>
        <GameContext.Provider value={this.state}>
          <OptionsPanel playing={this.state.playing} numTiles={this.state.numTiles} startGame={this.startGame.bind(this)} handleNumTileChange={this.handleNumTileChange.bind(this)} />
          <Board numTiles={this.state.numTiles} tiles={this.state.tiles} />
        </GameContext.Provider>
      </div>
    );

  }
}

export default App;
