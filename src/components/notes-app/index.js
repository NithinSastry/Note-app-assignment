import React, { Component } from 'react';
import './index.css';

export default class NotesApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      status: '',
      sortedNotes: [],
      actualNotes: [],
      activeNotes: [],
      completedNotes: [],
      filter: '',
    };
    this.addNote = this.addNote.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onActiveClick = this.onActiveClick.bind(this);
    this.onAllClick = this.onAllClick.bind(this);
    this.onCompletedClick = this.onCompletedClick.bind(this);
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value,
    });
  }

  addNote() {
    const actualNotes = this.state.actualNotes;
    actualNotes.push({
      name: this.state.name,
      status: this.state.status,
    });
    const sortedNotes = this.state.sortedNotes;
    sortedNotes.push({
      name: this.state.name,
      status: this.state.status,
    });
    sortedNotes.sort((noteA, noteB) => {
      const sa = noteA.status.toLowerCase()[0];
      const sb = noteB.status.toLowerCase()[0];
      // return sa.localeCompare(sb);
      if (sa < sb) {
        return -1;
      }
      if (sa > sb) {
        return 1;
      } else if (sa === sb) {
      }
      if (sa === sb) {
        return 1;
      }
    });

    this.setState({
      sortedNotes: sortedNotes,
      name: '',
      status: '',
      actualNotes: actualNotes,
    });
  }

  onAllClick() {
    this.setState({
      filter: '',
    });
  }

  onActiveClick() {
    const activeNotes = this.state.actualNotes.filter(
      (note) => note.status === 'active'
    );
    const sortedNotes = this.state.sortedNotes;
    this.setState({
      filter: 'active',
      activeNotes: activeNotes,
    });
  }

  onCompletedClick() {
    const completedNotes = this.state.actualNotes.filter(
      (note) => note.status === 'completed'
    );
    const sortedNotes = this.state.sortedNotes;
    this.setState({
      filter: 'completed',
      completedNotes: completedNotes,
    });
  }

  render() {
    return (
      <div className="layout-column align-items-center justify-content-start">
        <section className="layout-row align-items-center justify-content-center mt-30">
          <input
            data-testid="input-note-name"
            type="text"
            className="large mx-8"
            placeholder="Note Title"
            value={this.state.name}
            onChange={this.onChangeName}
          />
          <input
            data-testid="input-note-status"
            type="text"
            className="large mx-8"
            placeholder="Note Status"
            value={this.state.status}
            onChange={this.onChangeStatus}
          />
          <button
            className=""
            data-testid="submit-button"
            onClick={this.addNote}
          >
            Add Note
          </button>
        </section>

        <div className="mt-50">
          <ul className="tabs">
            <li
              className="tab-item slide-up-fade-in"
              data-testid="allButton"
              onClick={this.onAllClick}
            >
              All
            </li>
            <li
              className="tab-item slide-up-fade-in"
              data-testid="activeButton"
              onClick={this.onActiveClick}
            >
              Active
            </li>
            <li
              className="tab-item slide-up-fade-in"
              data-testid="completedButton"
              onClick={this.onCompletedClick}
            >
              Completed
            </li>
          </ul>
        </div>
        <div className="card w-40 pt-30 pb-8">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody data-testid="noteList">
              {this.state.sortedNotes.length > 0 &&
                this.state.filter === '' &&
                this.state.sortedNotes.map((note, index) => (
                  <tr key={Math.random()}>
                    <td>{note.name}</td>
                    <td>{note.status}</td>
                  </tr>
                ))}
              {this.state.activeNotes.length > 0 &&
                this.state.filter === 'active' &&
                this.state.activeNotes.map((note, index) => (
                  <tr key={index}>
                    <td>{note.name}</td>
                    <td>{note.status}</td>
                  </tr>
                ))}
              {this.state.completedNotes.length > 0 &&
                this.state.filter === 'completed' &&
                this.state.completedNotes.map((note, index) => (
                  <tr key={index}>
                    <td>{note.name}</td>
                    <td>{note.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
