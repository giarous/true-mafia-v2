import { Screen, Heading, Action, Card } from "./ui/components";
import { colors } from "./ui/theme";

import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
var Sound = require("react-native-sound");

type Props = {};
export default class ListComponent extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      names: this.props.navigation.state.params.listings,
      random: this.props.navigation.state.params.randomize,
      text: "",
      value: "default",
      counter: 0,

      players: [
        { pos: 0, name: "Player 1", role: "Default" },
        { pos: 1, name: "Player 2", role: "Default" },
        { pos: 2, name: "Player 3", role: "Default" },
        { pos: 3, name: "Player 4", role: "Default" },
        { pos: 4, name: "Player 5", role: "Default" },
        { pos: 5, name: "Player 6", role: "Default" },
        { pos: 6, name: "Player 7", role: "Default" },
        { pos: 7, name: "Player 8", role: "Default" },
        { pos: 8, name: "Player 9", role: "Default" },
        { pos: 9, name: "Player 10", role: "Default" }
      ],
      roles: [
        "Sheriff",
        "Don",
        "Mafia",
        "Mafia",
        "Citizen",
        "Citizen",
        "Citizen",
        "Citizen",
        "Citizen",
        "Citizen"
      ]
    };
    this.arrayholder = [];
  }

  componentDidMount() {
    this._shuffleRoles();
    if (this.state.random) {
      this._shufflePossitions();
    }

    this.night = new Sound("night.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
    });
    this.introduction = new Sound(
      "introduction.mp3",
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
    setTimeout(() => {
      this.introduction.play(success => {
        if (!success) {
          console.log("Sound did not stopped properly");
        }
      });
    }, 2000);

    this.night.play(success => {
      if (!success) {
        console.log("Sound did not play");
      }
    });
  };
  _shuffleRoles = () => {
    const newArray = [...this.state.roles];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    this.setState({ roles: newArray });
  };

  _shufflePossitions = () => {
    const newArray = [...this.state.names];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    this.setState({ names: newArray });
  };

  _assignRoles = () => {
    const newArray = [...this.state.players];
    for (let i = 0; i < 10; i++) {
      newArray[i].name = this.state.names[i];
      newArray[i].role = this.state.roles[i];
    }

    this.setState({ players: newArray });
    this.play_song();
    this._nightFalls();
  };

  _nightFalls = () => {
    this.props.navigation.replace("Details", {
      players_data: this.state.players,
      temp_counter: this.state.counter
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
        <Card>
          {this.state.names.map((name, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.number}>
                {String(index + 1).padStart(2, "0")}
              </Text>
              <Text style={styles.name}>{name}</Text>
            </View>
          ))}
        </Card>
        <Action onPress={this._assignRoles}>Introduce the roles</Action>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 46,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border
  },
  number: { color: "#FF687B", fontSize: 12, fontWeight: "700", width: 36 },
  name: { color: colors.text, flex: 1, fontSize: 16, fontWeight: "600" }
});
