import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

const PokemonURL = "http://localhost:3000/pokemon" 

class PokemonIndex extends React.Component {

  state = {
    allPokemon: [],
    searchTerm: ""
  }

  componentDidMount() {
    fetch(PokemonURL)
    .then(res=> res.json())
    .then
    (data => this.setState({
      allPokemon: data
    }))
  }

  updatePokemon = (newPokemon) => {
    console.log(newPokemon)
    return fetch(PokemonURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(({
      name: newPokemon.name,
      stats: [{
        value: newPokemon.hp,
        name: "hp"
      }],
      sprites: {
        front: newPokemon.frontUrl,
        back: newPokemon.backUrl
      }
    }))
    })
    .then(res => res.json())
    .then(this.addNewPokemon)
  }

  addNewPokemon = (pokemon) => {
    this.setState({
      allPokemon: [...this.state.allPokemon, pokemon]
    })
  }

  handleSearch = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  render() {
    const filteredPokemon = this.state.allPokemon.filter(pokemon => pokemon.name.includes(this.state.searchTerm))
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={this.handleSearch} showNoResults={false} />
        <br />
        <PokemonCollection allPokemon={filteredPokemon}/>
        <br />
        <PokemonForm updatePokemon={this.updatePokemon}/>
      </div>
    )
  }
}

export default PokemonIndex
