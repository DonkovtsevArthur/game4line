import React, { Component } from "react";

import "./App.css";

import Row from "./components/Row";

class App extends Component {
  constructor() {
    super();
    this.play = this.play.bind(this);
  }

  state = {
    pl1: 1,
    pl2: 2,
    table: [],
    rows: 6,
    cols: 7,
    next: true,
    active: true,
  };

  //запуск чистого table и сброс
  componentWillMount() {
    let table = [];
    for (let i = 0; i < this.state.rows; i++) {
      let row = [];
      for (let i = 0; i < this.state.cols; i++) {
        row.push(null);
      }
      table.push(row);
    }
    this.setState({ table, next: true, active: !this.state.active});
  }

  //отрисовка ячейки выбраной колонки
  play(i) {
    let table = this.state.table;
    for (let r = this.state.rows - 1; r >= 0; r--) {
      if (!table[r][i]) {
        table[r][i] = this.state.next ? this.state.pl1 : this.state.pl2;
        this.setState({ next: !this.state.next });
        break;
      }
    }

    this.setState({
      table
    });
  }

  render() {
    return <div className="App">
        <h1>Четыре в ряд</h1>
        <div className="playerInfo">
          {" "}
          Сейчас ходит: <div
            className={this.state.next ? "now red" : "now green"}
          >
            {this.state.next ? "1" : "2"}
          </div>
        </div>
        <table className={this.state.active ? "act" : ""}>
          <thead />
          <tbody>
            {this.state.table.map((row, i) => (
              <Row key={i} row={row} play={this.play} />
            ))}
          </tbody>
        </table>
        <button className="reset" onClick={() => {
            this.componentWillMount();
          }}>
          reset
        </button>
      </div>;
  }
}

export default App;
