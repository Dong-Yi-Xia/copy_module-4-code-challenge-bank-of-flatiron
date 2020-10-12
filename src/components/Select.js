import React from "react";

const Select = (props) => {


    let handleSelect = (evt) => {
        props.selectFun(evt.target.value)
    }

     

  return (
   <div>
     <select value={props.select} onChange={handleSelect}>
        <option value={"all"}>All</option>
        <option value={"descriptionUP"}>Sort by description (ASC)</option>
        <option value={"descriptionDOWN"}>Sort by description (DESC)</option>
        <option value={"categoryUP"}>Sort by category (ASC)</option>
        <option value={"categoryDOWN"}>Sort by category (DESC)</option>
     </select>
   </div>
  )
}

export default Select;