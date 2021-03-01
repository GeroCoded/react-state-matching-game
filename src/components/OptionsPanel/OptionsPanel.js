import React from 'react'

import Button from '../Button'
import TileSelector from '../TileSelector'

const OptionsPanel = ({ playing, numTiles, startGame }) => (
  <div>
    <TileSelector playing={playing} numTiles={numTiles} />
    <Button startGame={startGame} playing={playing} />
  </div>
)
  
  

export default OptionsPanel
