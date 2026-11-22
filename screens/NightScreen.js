import {Phase, Action, Card} from '../ui/components';
import {colors} from '../ui/theme';
import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
/** Hand-off between night actions; route counters remain zero-based. */

export default class NightScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.navigation.state.params.players_data,
      confirm: this.props.navigation.state.params.temp_confirm,
      counter: this.props.navigation.state.params.temp_counter,
      kill_choice: this.props.navigation.state.params.temp_kill_choice,
    };
  }

  componentDidMount() {
    if (this.state.confirm == 'role_checked') {
      this.setState({
        counter: this.state.counter + 1,
      });
    }
  }

  confirmIdentity = () => {
    this.props.navigation.replace('Second_Night', {
      players_data: this.state.players,
      temp_counter: this.state.counter,
      temp_kill_choice: this.state.kill_choice,
    });
  };

  render() {
    return (
      <Phase
        eyebrow="NIGHT ROUND"
        title="The town is asleep."
        subtitle="Confirm your identity privately to continue."
        symbol="☾"
      >
        <Card>
          <Text style={styles.playerName}>
            #{this.state.counter + 1} ·{' '}
            {this.state.players[this.state.counter].name}
          </Text>
        </Card>
        <Action onPress={this.confirmIdentity}>Confirm my role</Action>
      </Phase>
    );
  }
}
const styles = StyleSheet.create({
  playerName: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
});
