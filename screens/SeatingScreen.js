import {createPlayers, INITIAL_ROLES, shuffle, dealRoles} from '../game/setup';
import {loadSound, playSound} from '../game/audio';
import {Screen, Heading, Action, Card} from '../ui/components';
import {colors} from '../ui/theme';
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
/** Prepare seating and deal the fixed role distribution before private reveals. */

export default class SeatingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: this.props.navigation.state.params.listings,
      random: this.props.navigation.state.params.randomize,
      counter: 0,
      players: createPlayers(),
      roles: [...INITIAL_ROLES],
    };
  }

  componentDidMount() {
    this.shuffleRoles();

    if (this.state.random) {
      this.shufflePositions();
    }

    this.night = loadSound('night.mp3');
    this.introduction = loadSound('introduction.mp3');
  }

  playPhaseAudio = () => {
    setTimeout(() => {
      playSound(this.introduction);
    }, 2000);
    playSound(this.night);
  };

  // Shuffle roles independently from seating so both placement modes stay fair.

  shuffleRoles = () =>
    this.setState({
      roles: shuffle(this.state.roles),
    });
  shufflePositions = () =>
    this.setState({
      names: shuffle(this.state.names),
    });
  assignRoles = () => {
    const players = dealRoles(
      this.state.players,
      this.state.names,
      this.state.roles,
    );
    this.setState({players});
    this.playPhaseAudio();
    // Pass the new roster directly: React may not have committed setState yet.
    this.startRoleReveal(players);
  };
  startRoleReveal = players => {
    this.props.navigation.replace('Details', {
      players_data: players,
      temp_counter: this.state.counter,
    });
  };

  render() {
    return (
      <Screen>
        <Heading
          eyebrow="THE TABLE"
          title="Take your seat."
          subtitle="These are your positions for the game. Remember your number."
        />
        <Card fill>
          {this.state.names.map((name, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.number}>
                {String(index + 1).padStart(2, '0')}
              </Text>
              <Text numberOfLines={1} adjustsFontSizeToFit style={styles.name}>
                {name}
              </Text>
            </View>
          ))}
        </Card>
        <Action onPress={this.assignRoles}>Introduce the roles</Action>
      </Screen>
    );
  }
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minHeight: 0,
    paddingVertical: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  number: {
    color: '#FF687B',
    fontSize: 12,
    fontWeight: '700',
    width: 36,
  },
  name: {
    color: colors.text,
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
});
