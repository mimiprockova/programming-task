import React from "react";
import { colorsList } from "./index.js";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: ""
    };
  }

  onTextChange = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = colorsList.filter((v) => regex.test(v));
      for (let i = 0; i < suggestions.length; i++) {
        suggestions[i] = suggestions[i].replace(regex, (v) => v.bold());
      }
    }

    this.setState(() => ({
      suggestions,
      text: value
    }));
  };

  selectedText(value) {
    this.setState(() => ({
      text: value,
      listBold: []
    }));
  }

  renderSuggestions = () => {
    let { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((item, index) => (
          <li
            tabIndex="0"
            className="focusable"
            key={index}
            onClick={() => this.selectedText(item)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === "Backspace") {
                return this.selectedText(item);
              } else if (event.key === "Escape") {
                return this.setState(() => ({
                  suggestions: []
                }));
              }
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { text } = this.state;
    return (
      <div
        id="component"
        onClick={() =>
          this.setState(() => ({
            suggestions: []
          }))
        }
      >
        <input
          id="query"
          type="text"
          onChange={this.onTextChange}
          value={text}
          placeholder="Type your color here"
          className="input"
        />
        {this.renderSuggestions()}
      </div>
    );
  }
}

export default App;
