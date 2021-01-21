import React from 'react'

const Board = ({ layout }) => {
  return (
    <div id='Board'>
      <div id="11" className={layout[11].type}></div>
      <div id="12" className={layout[12].type}></div>
      <div id="13" className={layout[13].type}></div>
      <div id="14" className={layout[14].type}></div>
      <div id="15" className={layout[15].type}></div>
      <div id="16" className={layout[16].type}></div>
      <div id="17" className={layout[17].type}></div>
      <div id="18" className={layout[18].type}></div>

      <div id="21" className={layout[21].type}></div>
      <div id="22" className={layout[22].type}></div>
      <div id="23" className={layout[23].type}></div>
      <div id="24" className={layout[24].type}></div>
      <div id="25" className={layout[25].type}></div>
      <div id="26" className={layout[26].type}></div>
      <div id="27" className={layout[27].type}></div>
      <div id="28" className={layout[28].type}></div>

      <div id="31" className={layout[31].type}></div>
      <div id="32" className={layout[32].type}></div>
      <div id="33" className={layout[33].type}></div>
      <div id="34" className={layout[34].type}></div>
      <div id="35" className={layout[35].type}></div>
      <div id="36" className={layout[36].type}></div>
      <div id="37" className={layout[37].type}></div>
      <div id="38" className={layout[38].type}></div>
    </div>
  )
}

export default Board