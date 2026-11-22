import {Screen, Heading, Action, PlayerPicker} from '../ui/components';
import React, {Component} from 'react';
import {Alert} from 'react-native';
/** Display one-based seat numbers while passing zero-based investigation indices. */

export default class InvestigationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.navigation.state.params.players_data,
      counter: this.props.navigation.state.params.temp_counter,
      kill_choice: this.props.navigation.state.params.temp_kill_choice,
      confirm: 'role_checked',
      check_option: 10,
      value: 'Nothing',
    };
  }

  confirmInvestigation = () => {
    if (this.state.check_option != 10) {
      this.props.navigation.replace('Confirm', {
        players_data: this.state.players,
        temp_confirm: this.state.confirm,
        temp_counter: this.state.counter,
        temp_kill_choice: this.state.kill_choice,
        temp_check: this.state.check_option,
      });
    } else {
      Alert.alert('You need to choose someone');
    }
  };
  selectPlayer = choice => {
    this.setState({
      check_option: choice,
    });
    this.setState({
      value: (choice + 1).toString(),
    });
  };

  render() {
    return (
      <Screen>
        <Heading
          eyebrow="INVESTIGATION"
          title="Who do you suspect?"
          subtitle={`Player ${this.state.counter + 1} · ${
            this.state.players[this.state.counter].name
          } — select a number below.`}
        />
        <PlayerPicker
          players={this.state.players}
          selected={this.state.check_option + 1}
          onSelect={number => this.selectPlayer(number - 1)}
        />
        <Action onPress={this.confirmInvestigation}>
          {this.state.value === 'Nothing'
            ? 'Select a player'
            : `Check #${this.state.value}`}
        </Action>
      </Screen>
    );
  }
}
