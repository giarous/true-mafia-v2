import {loadSound, playSound} from '../game/audio';
import {Phase, Action} from '../ui/components';
import React, {Component} from 'react';
/** Start open discussion before the first regular night. */

export default class FirstDayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.navigation.state.params.players_data,
      kill_choice: 'true',
    };
  }

  componentDidMount() {
    this.regular_night = loadSound('regular_night.mp3');
  }

  playPhaseAudio = () => {
    playSound(this.regular_night);
  };
  beginNight = () => {
    this.playPhaseAudio();
    this.props.navigation.replace('Night', {
      players_data: this.state.players,
      temp_counter: 0,
      temp_kill_choice: this.state.kill_choice,
    });
  };

  render() {
    return (
      <Phase
        eyebrow="DAY ONE"
        title="The town wakes."
        subtitle="Share your suspicions. Discuss, listen, and decide who you can trust."
        symbol="☀"
      >
        <Action onPress={this.beginNight}>Night falls</Action>
      </Phase>
    );
  }
}
