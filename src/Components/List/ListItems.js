import React from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ListItems(props) {
  const items = props.items;
  const listItems = items.map(item => {
    return (
      <div className="items-in-list" id={item.key} >
       
          <input className="input" type="text" id={item.key} value={item.text} 
          onChange={(e)=>{
              props.setUpdate(e.target.value, item.key)
          }}
          />
          <span>
            <FontAwesomeIcon
              className="faicon"
              icon="trash"
              onClick={() => props.deleteItem(item.key)}
            />
          </span>
        
      </div>
    );
  });
  return <div>{listItems}</div>;
}
export default ListItems;
