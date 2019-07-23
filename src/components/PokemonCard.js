import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    frontImage: true
  }

  changePic = () => {
    this.setState({
      frontImage: !this.state.frontImage
    })
  }
  render() {
    const pokemon = this.props.pokemon
    const hp = this.props.pokemon.stats.find(s => s.name === 'hp').value
    return (
      <Card>
        <div>
          <div className="image" onClick={() => this.changePic()}>
          {this.state.frontImage ? <img alt="oh no!" src={pokemon.sprites.front}/> : <img alt="oh no!" src={pokemon.sprites.back}/>
          }
          </div>
          <div className="content">
            <div className="header">{pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {hp} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
