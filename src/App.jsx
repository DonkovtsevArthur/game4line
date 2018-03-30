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
    run: false,
    text: ""
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
    this.setState({
      table,
      next: true,
      active: !this.state.active,
      text: "",
      run: false
    });
  }

  //отрисовка ячейки выбраной колонки
  play(i) {
    if (!this.state.run) {
      let table = this.state.table;
      for (let r = this.state.rows - 1; r >= 0; r--) {
        if (!table[r][i]) {
          table[r][i] = this.state.next ? this.state.pl1 : this.state.pl2;
          this.setState({ next: !this.state.next });
          break;
        }
      }

      //узнаем кто же выиграл
      let who = this.getWinOrDraw(table);
      if (who === "all") {
        this.setState({ text: "Ничья" });
      } else if (who === this.state.pl1) {
        this.setState({ table, text: "Выиграл 1 игрок", run: true });
      } else if (who === this.state.pl2) {
        this.setState({ table, text: "Выиграл 2 игрок", run: true });
      }
      this.setState({ table });
    }
  }
  //определяем кто победил или ничья
  getWinOrDraw(table) {
    return (
      this.checkDiagRight(table) ||
      this.checkDiagLeft(table) ||
      this.checkHoriz(table) ||
      this.checkVert(table) ||
      this.checkDraw(table)
    );
  }
  //проверка по диагонале ход к правой стороне
  checkDiagRight(table) {
    for (let r = 3; r < this.state.rows; r++) {
      for (let c = 0; c < this.state.cols; c++) {
        if (table[r][c]) {
          if (
            table[r][c] === table[r - 1][c + 1] &&
            table[r][c] === table[r - 2][c + 2] &&
            table[r][c] === table[r - 3][c + 3]
          ) {
            return table[r][c];
          }
        }
      }
    }
  }
  //проверка по диагонале ход к левой стороне
  checkDiagLeft(table) {
    for (let r = 3; r < this.state.rows; r++) {
      for (let c = 3; c < this.state.cols; c++) {
        if (table[r][c]) {
          if (
            table[r][c] === table[r - 1][c - 1] &&
            table[r][c] === table[r - 2][c - 2] &&
            table[r][c] === table[r - 3][c - 3]
          ) {
            return table[r][c];
          }
        }
      }
    }
  }
  //проверка по горизонтале
  checkHoriz(table) {
    for (let r = this.state.rows - 1; r >= 0; r--) {
      for (let c = 3; c < this.state.cols; c++) {
        if (table[r][c]) {
          if (
            table[r][c] === table[r][c - 1] &&
            table[r][c] === table[r][c - 2] &&
            table[r][c] === table[r][c - 3]
          ) {
            return table[r][c];
          }
        }
      }
    }
  }
  //проверка по вертикале
  checkVert(table) {
    for (let r = this.state.rows / 2; r < this.state.rows; r++) {
      for (let c = 0; c < this.state.cols; c++) {
        if (table[r][c]) {
          if (
            table[r][c] === table[r - 1][c] &&
            table[r][c] === table[r - 2][c] &&
            table[r][c] === table[r - 3][c]
          ) {
            return table[r][c];
          }
        }
      }
    }
  }
  //проверка на ничью
  checkDraw(table) {
    for (let r = 0; r <= this.state.rows; r++) {
      for (let c = 0; c <= this.state.cols; c++) {
        if (table[r][c] === null) {
          return null;
        }
      }
      return "all";
    }
  }

  go() {
    return (
      <div>
        <h1>Четыре в ряд</h1>
        <div className="playerInfo">
          {" "}
          Сейчас ходит:{" "}
          <div className={this.state.next ? "now red" : "now green"}>
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
        <button
          className="reset"
          onClick={() => {
            this.componentWillMount();
          }}
        >
          Сброс
        </button>
        <span
          className={this.state.text === "Выиграл 2 игрок" ? "greens" : "reds"}
        >
          {" "}
          {this.state.text}{" "}
        </span>
      </div>
    );
  }

  render() {
    return <div className="App">{this.go()}</div>;
  }
}

export default App;
