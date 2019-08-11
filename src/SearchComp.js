import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Cards from "./Cards";

class SearchComp extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(suggestion => {
      let values = Object.values(suggestion);
      let flag = false;
      values.forEach(val=>{
        if(Object.prototype.toString.call(val)=="[object String]") {
          if (val.toLowerCase().indexOf(userInput.toLowerCase()) > -1) {
            flag=true;
            return;
          }
        }
        else {
          val.forEach(item => {
            if(item.toLowerCase().indexOf(userInput.toLowerCase()) > -1) {
              flag=true;
              return;
            }
          });
        }
        });
        if(flag) return suggestion;
    });

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    // User pressed the up arrow
    if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  changeFocus = index => {
    this.setState({ activeSuggestion: index });
  }

  render() {
    const {
      onChange,
      onKeyDown,
      changeFocus,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    return (
      <Fragment>
        <div id="search">
          <span className="search-icon"><FontAwesomeIcon icon={faSearch} /></span>
          <input
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
        </div>
        <Cards filteredSuggestions={filteredSuggestions} activeSuggestion={activeSuggestion} 
          showSuggestions={showSuggestions} userInput={userInput} onMouseEnter={changeFocus}/>
      </Fragment>
    );
  }
}

export default SearchComp;