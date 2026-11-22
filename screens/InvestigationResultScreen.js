import {
  getRoleImage,
  fallbackRoleImage,
  getInvestigationRole,
} from '../game/roles';
import {RoleCard, Action} from '../ui/components';
import React, {Component} from 'react';
/** Reveal an investigation result without exposing the Don's special role. */

export default class InvestigationResultScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.navigation.state.params.players_data,
      counter: this.props.navigation.state.params.temp_counter,
      kill_choice: this.props.navigation.state.params.temp_kill_choice,
      check_option: this.props.navigation.state.params.temp_check,
      confirm: 'role_checked',
      generic_role: 'Default',
      image_source: fallbackRoleImage,
    };
  }

  componentDidMount() {
    // Keep the Don's identity private: investigations show Mafia alignment.
    const role = getInvestigationRole(
      this.state.players[this.state.check_option].role,
    );
    this.setState({
      generic_role: role,
      image_source: getRoleImage(role),
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

  render() {
    return (
      <RoleCard
        eyebrow={`INVESTIGATION · PLAYER ${this.state.check_option + 1}`}
        name={this.state.players[this.state.check_option].name}
        role={this.state.generic_role}
        image={this.state.image_source}
      >
        <Action onPress={this.advanceTurn}>
          {this.state.counter == 9 ? 'Confirm' : 'Confirm and pass'}
        </Action>
      </RoleCard>
    );
  }
}
