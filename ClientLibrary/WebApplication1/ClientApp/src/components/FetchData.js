import React, { Component } from 'react';

export class FetchData extends Component {
  displayName = FetchData.name

  constructor(props) {
    super(props);
    this.state = { phrases: [], loading: true };

      fetch('api/KeyPhrase/GetKeyPhrases')
      .then(response => response.json())
      .then(data => {
          this.setState({ phrases: data, loading: false });
      });
  }

    static renderTable(phrases) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Phrase</th>
          </tr>
        </thead>
        <tbody>
                {phrases.map(phrases =>
                    <tr key={phrases}>
                        <td>{phrases}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
        : FetchData.renderTable(this.state.phrases);

    return (
      <div>
        <h1>Phases found</h1>
        <p>This component demonstrates getting phrases from documents.</p>
        {contents}
      </div>
    );
  }
}
