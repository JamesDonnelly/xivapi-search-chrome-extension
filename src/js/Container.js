import React from "react";

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      query: '',
      results: undefined,
      searching: false
    }

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleQueryChange(event) {
    this.setState({
      query: event.target.value
    })
  }

  handleSearchClick(event) {
    event.preventDefault();
    const { query, searching } = this.state;

    if (!query || searching)
      return;

    this.setState({
      results: undefined,
      searching: true
    }, () => {
      fetch((
        `http://xivapi.com/Search?string=${encodeURIComponent(query)}&string_algo=multi_match`
      ), {
        method: 'GET',
        mode: 'cors'
      })
        .then(response => response.json())
        .then(data => {
          const results = {};

          data.results.forEach(entry => {
            const {
              GameType,
              Icon,
              ID,
              Name,
              Url
            } = entry;

            if (!results[GameType])
            results[GameType] = [];

            results[GameType].push({
              Name,
              Icon,
              ID,
              Url
            })
          }),

          this.setState({
            results,
            searching: false
          })
        })
    })
  }

  render() {
    const { query, results, searching } = this.state;

    return (
      <section>
        <header>XIVAPI Quick Search</header>
        <form>
          <div>
            <label for="search">Search</label>
            <input
              type="text"
              id="search"
              placeholder="Search XIVAPI..."
              autoFocus
              autoComplete="off"
              onInput={this.handleQueryChange}
              value={query}
              disabled={searching}
            />
          </div>
          <button
            type="submit"
            onClick={this.handleSearchClick}
            disabled={!query}
          >
            <span class={searching ? "fas fa-spinner fa-spin" : "fas fa-search"} /> {searching ? 'Searching' : 'Search'}
          </button>
        </form>
        {
          results
          ? (
            <article>
              {
                Object.keys(results).length
                ? Object.keys(results).map(k => {
                  const data = results[k];
                  console.info(k, results);

                  return (
                    <nav key={k}>
                      <h2>{k}</h2>
                      <ul>
                        {
                          data.map(entry => (
                            <li key={entry.ID}>
                              {
                                <a href={`https://xivapi.com${entry.Url}`} target="_newtab" title={entry.Name}>
                                  <span>{entry.Name}</span>
                                  <small><span>xivapi.com</span>{entry.Url}</small>
                                  {
                                    entry.Icon
                                    ? <img src={`https://xivapi.com${entry.Icon}`} alt="Icon" />
                                    : undefined
                                  }
                                </a>
                              }
                            </li>
                          ))
                        }
                      </ul>
                    </nav>
                  )
                }) : (
                  <p>No results found.</p>
                )
              }
            </article>
          ) : undefined
        }
      </section>
    )
  }
}