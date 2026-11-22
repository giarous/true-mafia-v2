import {loadSound, playSound} from '../game/audio';
import {Phase, Card} from '../ui/components';
import {colors} from '../ui/theme';
import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import KeepAwake from 'react-native-keep-awake';
// Millisecond offsets from the start of the opening narration, not clip lengths.
const CUE = {
  wake: 1000,
  ambience: 14000,
  warning: 71000,
  sleep: 83000,
  day: 90000,
};

/** Coordinate the first Mafia phase using the existing ninety-second audio script. */

export default class MafiaPhaseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.navigation.state.params.players_data,
    };
  }

  componentDidMount() {
    this.noch = loadSound('noch.mp3');
    this.day = loadSound('day.mp3');
    this.mafia_deal = loadSound('mafia_deal.mp3');
    this.mafia_sleeps = loadSound('mafia_sleeps.mp3');
    this.ten_seconds = loadSound('ten_seconds.mp3');
    this.playPhaseAudio();
  }

  playPhaseAudio = () => {
    setTimeout(() => {
      playSound(this.noch);
    }, CUE.ambience);
    setTimeout(() => {
      playSound(this.mafia_deal);
      KeepAwake.activate();
    }, CUE.wake);
    setTimeout(() => {
      playSound(this.ten_seconds);
    }, CUE.warning);
    setTimeout(() => {
      playSound(this.day);
      this.props.navigation.replace('Day', {
        players_data: this.state.players,
      });
    }, CUE.day);
    setTimeout(() => {
      playSound(this.mafia_sleeps);
      KeepAwake.deactivate();
    }, CUE.sleep);
  };

  render() {
    return (
      <Phase
        eyebrow="MAFIA PHASE"
        title="The night belongs to you."
        subtitle="Everyone else: close your eyes. Follow the audio cues while the Mafia makes its plans."
        symbol="☾"
      >
        <Card>
          <Text style={styles.description}>
            Listen closely. The next day starts automatically.
          </Text>
        </Card>
      </Phase>
    );
  }
}
const styles = StyleSheet.create({
  description: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
  },
});
