import {getRoleImage, fallbackRoleImage} from '../game/roles';
import {RoleCard, Action} from '../ui/components';
import React, {Component} from 'react';
/** Show one private identity, then pass the phone or start the Mafia audio phase. */

export default class RoleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.navigation.state.params.players_data,
      counter: this.props.navigation.state.params.temp_counter,
      confirm: 'role_checked',
      image_source: fallbackRoleImage,
    };
  }

  componentDidMount() {
    this.setState({
      image_source: getRoleImage(this.state.players[this.state.counter].role),
    });
  }

  advanceTurn = () => {
    if (this.state.counter < 9) {
      this.props.navigation.replace('Details', {
        players_data: this.state.players,
        temp_confirm: this.state.confirm,
        temp_counter: this.state.counter,
      });
    } else {
      this.props.navigation.replace('MafiaTime', {
        players_data: this.state.players,
      });
    }
  };

  render() {
    return (
      <RoleCard
        eyebrow={`PRIVATE REVEAL · PLAYER ${this.state.counter + 1}`}
        name={this.state.players[this.state.counter].name}
        role={this.state.players[this.state.counter].role}
        image={this.state.image_source}
      >
        <Action onPress={this.advanceTurn}>
          {this.state.counter == 9
            ? "Sleep. It's Mafia time"
            : 'Confirm and pass'}
        </Action>
      </RoleCard>
    );
  }
}
