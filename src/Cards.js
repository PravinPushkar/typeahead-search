import React, { Component } from 'react';

function Card({card,userInput,className,onMouseEnter,dataId}) {
  const mouseFocusChange =  (e) => {
    onMouseEnter(e.currentTarget.dataset.id);
  }
  return (
    <li className={className} onMouseEnter={mouseFocusChange} data-id={dataId}>
          <div className="card">
              <div>{card.id}</div>
              <div>{card.name}</div>
              <div><ul>
                {
                  card.items.map((c,index) => {
                    if(c.toLowerCase().indexOf(userInput.toLowerCase()) > -1) {
                      return (
                        <li key={index}>{userInput} found in items</li>
                      )
                    }
                  })
                }
              </ul></div>
              <div>{card.address}</div>
              <div>{card.pincode}</div>
          </div>
    </li>
  );
}
function Cards({filteredSuggestions,activeSuggestion,showSuggestions,userInput,onMouseEnter}) {
  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      return (
        <div className="cards">
          <ul>
            { 
              filteredSuggestions.map( (c,index) => {
                let className;
                if (index === parseInt(activeSuggestion)) {
                  className = "suggestion-active";
                }
                return (
                  <Card card={c} key={index} userInput={userInput} className={className} onMouseEnter={onMouseEnter} dataId={index}/>
                )
              })
            }
          </ul>
        </div>
      );
    }
  }
  else {
    return (
      <div>Nothing to search</div>
    )
  }
}

export default Cards;