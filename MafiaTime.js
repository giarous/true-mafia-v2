import { Phase, Action, Card } from "./ui/components";
import { colors } from "./ui/theme";

import React, { Component } from "react";
import { Text } from "react-native";
import KeepAwake from "react-native-keep-awake";
var Sound = require("react-native-sound");

type Props = {};
export default class MafiaTimeComponent extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      players: this.props.navigation.state.params.players_data,
      error: false
    };
  }
  componentDidMount() {
    this.noch = new Sound("noch.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
    });
    this.day = new Sound("day.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
    });

    this.mafia_deal = new Sound("mafia_deal.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
    });

    this.mafia_sleeps = new Sound(
      "mafia_sleeps.mp3",
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log("failed to load the sound", error);
          return;
        }
      }
    );
    this.ten_seconds = new Sound(
      "ten_seconds.mp3",
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log("failed to load the sound", error);
          return;
        }
      }
    );

    this.play_song();
  }
  play_song = () => {
    setTimeout(() => {
      this.noch.play(success => {
        if (!success) {
          console.log("Sound did not stopped properly");
        }
      });
    }, 14000);

    setTimeout(() => {
      this.mafia_deal.play(success => {
        if (!success) {
          console.log("Sound did not stopped properly");
        }
      });
      KeepAwake.activate();
    }, 1000);

    setTimeout(() => {
      this.ten_seconds.play(success => {
        if (!success) {
          console.log("Sound did not stopped properly");
        }
      });
    }, 71000);

    setTimeout(() => {
      this.day.play(success => {
        if (!success) {
          console.log("Sound did not stopped properly");
        }
      });
      this.props.navigation.replace("Day", {
        players_data: this.state.players
      });
    }, 90000);

    setTimeout(() => {
      this.mafia_sleeps.play(success => {
        if (!success) {
          console.log("Sound did not stopped properly");
        }
      });
      KeepAwake.deactivate();
    }, 83000);
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
          <Text style={{ color: colors.text, fontSize: 16, lineHeight: 24 }}>
            Listen closely. The next day starts automatically.
          </Text>
        </Card>
      </Phase>
    );
  }
}
