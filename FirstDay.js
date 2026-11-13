import { Phase, Action, Card } from "./ui/components";

import React, { Component } from "react";
var Sound = require("react-native-sound");

type Props = {};
export default class DayComponent extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      players: this.props.navigation.state.params.players_data,
      error: false,
      kill_choice: "true"
    };
  }
  componentDidMount() {
    console.log("1st Day");
    console.log(this.state.players);
    this.regular_night = new Sound(
      "regular_night.mp3",
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log("failed to load the sound", error);
          return;
        }
      }
    );
  }
  play_song = () => {
    this.regular_night.play(success => {
      if (!success) {
        console.log("Sound did not play");
      }
    });
  };

  the_night = () => {
    this.play_song();
    console.log("Regular Night");
    this.props.navigation.replace("Night", {
      players_data: this.state.players,
      temp_counter: 0,
      temp_kill_choice: this.state.kill_choice
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
        <Action onPress={this.the_night}>Night falls</Action>
      </Phase>
    );
  }
}
