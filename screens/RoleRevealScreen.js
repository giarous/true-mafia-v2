import {Phase, Action, Card} from '../ui/components';
import {colors} from '../ui/theme';
import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
/** Hand-off screen: advance only when the previous player confirmed their role. */

export default class RoleRevealScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.navigation.state.params.players_data,
      confirm: this.props.navigation.state.params.temp_confirm,
      counter: this.props.navigation.state.params.temp_counter,
    };
  }

  componentDidMount() {
    // Returning from a reveal increments the counter exactly once.
    if (this.state.confirm == 'role_checked') {
      this.setState({
        counter: this.state.counter + 1,
      });
    }
  }

  confirmIdentity = () => {
    this.props.navigation.replace('Role', {
      players_data: this.state.players,
      temp_counter: this.state.counter,
    });
  };

  render() {
    return (
      <Phase
        eyebrow="ROLE REVEAL"
        title="Your secret awaits."
        subtitle="Read your role privately, then pass the phone."
        symbol={null}
        centered
      >
        <Card>
          <Text style={styles.playerName}>
            #{this.state.counter + 1} ·{' '}
            {this.state.players[this.state.counter].name}
          </Text>
        </Card>
        <Action centered onPress={this.confirmIdentity}>
          Reveal my role
        </Action>
      </Phase>
    );
  }
}
const styles = StyleSheet.create({
  playerName: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
});
