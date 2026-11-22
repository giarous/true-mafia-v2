import {loadSound, playSound} from '../game/audio';
import {Phase, Action, Card} from '../ui/components';
import {colors} from '../ui/theme';
import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
/** Announce the previous night's result, then reset voting for the next round. */

export default class DaybreakScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.navigation.state.params.players_data,
      kill_choice: this.props.navigation.state.params.temp_kill_choice,
      killed_person: 'NO ONE',
    };
  }

  componentDidMount() {
    this.regular_night = loadSound('regular_night.mp3');

    if (this.state.kill_choice != 'false') {
      this.setState({
        killed_person: this.state.kill_choice,
      });
    }

    this.numberSounds = Array.from(
      {
        length: 10,
      },
      (_, index) => loadSound(`num${index + 1}.mp3`),
    );
    this.miss = loadSound('miss.mp3');
    this.killed = loadSound('killed.mp3');
    this.playPhaseAudio();
  }

  playPhaseAudio = () => {
    setTimeout(() => {
      if (this.state.kill_choice != 'false') {
        playSound(this.killed);
        setTimeout(() => {
          // Route parameters use string seat numbers; unknown values retain the
          // original player-ten fallback rather than changing round behavior.
          const index = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].findIndex(
            number => this.state.kill_choice == number,
          );
          playSound(this.numberSounds[index === -1 ? 9 : index]);
        }, 6000);
      } else {
        playSound(this.miss);
      }
    }, 1000);
  };
  playNightAudio = () => {
    playSound(this.regular_night);
  };
  beginNight = () => {
    this.playNightAudio(); // Reset consensus before handing the phone to the first player.

    this.setState({
      kill_choice: 'true',
    });
    setTimeout(() => {
      this.props.navigation.replace('Night', {
        players_data: this.state.players,
        temp_counter: 0,
        temp_kill_choice: this.state.kill_choice,
      });
    }, 500);
  };

  render() {
    return (
      <Phase
        eyebrow="DAYBREAK"
        title="A new day begins."
        subtitle="The night is over. Let the discussions begin."
        symbol="☀"
      >
        <Card>
          <Text style={styles.caption}>NIGHT RESULT</Text>
          <Text style={styles.result}>
            Mafia killed: {this.state.killed_person}
          </Text>
        </Card>
        <Action onPress={this.beginNight}>Begin next night</Action>
      </Phase>
    );
  }
}
const styles = StyleSheet.create({
  caption: {
    color: colors.muted,
    fontSize: 12,
    marginBottom: 8,
  },
  result: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
  },
});
