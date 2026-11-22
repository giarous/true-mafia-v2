import {getRoleImage, fallbackRoleImage} from '../game/roles';
import {RoleCard, Action} from '../ui/components';
import React, {Component} from 'react';
/** Choose the available night action from the current player's role. */

export default class NightActionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.navigation.state.params.players_data,
      counter: this.props.navigation.state.params.temp_counter,
      kill_choice: this.props.navigation.state.params.temp_kill_choice,
      confirm: 'role_checked',
      button_text: 'Confirm and pass',
      button_function: this.advanceTurn,
      image_source: fallbackRoleImage,
    };
  }

  componentDidMount() {
    const role = this.state.players[this.state.counter].role;
    const actions = {
      Citizen: {
        button_text: this.state.counter == 9 ? '2nd DAY' : 'CONFIRM and PASS',
        button_function: this.advanceTurn,
      },
      Mafia: {
        button_text: 'KILL SOMEONE',
        button_function: this.chooseVictim,
      },
      Don: {
        button_text: 'KILL SOMEONE',
        button_function: this.chooseVictim,
      },
      Sheriff: {
        button_text: 'CHECK SOMEONE',
        button_function: this.investigateOrPass,
      },
    };
    this.setState({
      image_source: getRoleImage(role),
      ...actions[role],
    });
  }

  advanceTurn = () => {
    if (this.state.counter < 9) {
      this.props.navigation.replace('Night', {
        players_data: this.state.players,
        temp_confirm: this.state.confirm,
        temp_counter: this.state.counter,
        temp_kill_choice: this.state.kill_choice,
      });
    } else {
      this.props.navigation.replace('Second_Day', {
        players_data: this.state.players,
        temp_kill_choice: this.state.kill_choice,
      });
    }
  };
  chooseVictim = () => {
    this.props.navigation.navigate('Kill', {
      players_data: this.state.players,
      temp_counter: this.state.counter,
      temp_kill_choice: this.state.kill_choice,
    });
  };
  investigateOrPass = () => {
    this.props.navigation.navigate('Check', {
      players_data: this.state.players,
      temp_counter: this.state.counter,
      temp_kill_choice: this.state.kill_choice,
    });
  };

  render() {
    return (
      <RoleCard
        eyebrow={`PRIVATE REVEAL · PLAYER ${this.state.counter + 1}`}
        name={this.state.players[this.state.counter].name}
        role={this.state.players[this.state.counter].role}
        image={this.state.image_source}
      >
        <Action onPress={this.state.button_function}>
          {this.state.button_text}
        </Action>
      </RoleCard>
    );
  }
}
