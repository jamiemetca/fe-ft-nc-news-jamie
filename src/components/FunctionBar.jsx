import React from 'react'

const FunctionBar = () => {
  return <div>
    <div>NC> News
    <input />Search
    <select>
        <option selected='selected'>Sort</option>
        <option>Number of votes</option>
        <option>Users</option>
      </select>
    </div>
    <div>{'____________________________________________________________________'}</div>
    Articles -- Show
    <select>
      <option selected='selected' >All</option>
      <option>Topics</option>
    </select>
    <select>
      <option selected='selected'>Select topics</option>
      <option>Topic 1</option>
      <option>Topic 2</option>
      <option>Topic 3</option>
    </select>
    <div> Secondary function bar. Comments-(Next- got to next article by that user. Will either be next highest/lowest votes or Date | HOME - goes back to the main articles page)  </div>
    <div>{'____________________________________________________________________'}</div>
  </div>
}

export default FunctionBar;