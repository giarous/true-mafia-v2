import {Screen, Heading, Action, PlayerPicker} from '../ui/components';
import React, {Component} from 'react';
import {Alert} from 'react-native';
/** Collect Mafia votes. A Don investigates after submitting a victim choice. */

export default class VictimSelectionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.navigation.state.params.players_data,
      counter: this.props.navigation.state.params.temp_counter,
      kill_choice: this.props.navigation.state.params.temp_kill_choice,
      confirm: 'role_checked',
      value: 'Nothing',
    };
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
  }; // "true" means no vote yet; "false" means Mafia choices disagreed.
  // Keep these string sentinels: subsequent screens receive them via navigation.

  selectPlayer = choice => {
    if (this.state.kill_choice == 'true' || this.state.kill_choice == choice) {
      this.setState({
        kill_choice: choice,
      });
    } else {
      this.setState({
        kill_choice: 'false',
      });
    }

    this.setState({
      value: choice,
    });
  };
  investigateOrPass = () => {
    if (this.state.value != 'Nothing') {
      if (this.state.players[this.state.counter].role == 'Don') {
        this.props.navigation.replace('Check', {
          players_data: this.state.players,
          temp_counter: this.state.counter,
          temp_kill_choice: this.state.kill_choice,
        });
      } else {
        this.advanceTurn();
      }
    } else {
      Alert.alert('You need to choose someone');
    }
  };

  render() {
    return (
      <Screen>
        <Heading
          eyebrow="MAFIA DECISION"
          title="Choose your victim."
          subtitle={`Player ${this.state.counter + 1} · ${
            this.state.players[this.state.counter].name
          } — select a number below.`}
        />
        <PlayerPicker
          players={this.state.players}
          selected={Number(this.state.value)}
          onSelect={number => this.selectPlayer(String(number))}
        />
        <Action onPress={this.investigateOrPass}>
          {this.state.value === 'Nothing'
            ? 'Select a player'
            : `Shoot at #${this.state.value}`}
        </Action>
      </Screen>
    );
  }
}
