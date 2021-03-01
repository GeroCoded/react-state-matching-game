import React from 'react'

import './Tile.css'

const Tile = ({ color, id, handleTileClicked, matched, selected, svg: Svg }) => {

  const matchedOrSelected = matched || selected;
  const dynamicColor = matchedOrSelected ? {
    backgroundColor: color
  } : null;

  return (
    <div className='Tile' style={dynamicColor}>
      { matchedOrSelected ? <Svg /> : null }
    </div>
  )
}

export default Tile
