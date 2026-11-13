import { Screen, Heading, Action } from "./ui/components";
import { colors } from "./ui/theme";

import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
var Sound = require("react-native-sound");

type Props = {};

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      error: false,
      names: [
        "Player 1",
        "Player 2",
        "Player 3",
        "Player 4",
        "Player 5",
        "Player 6",
        "Player 7",
        "Player 8",
        "Player 9",
        "Player 10"
      ]
    };

    this._updatePlayers = this._updatePlayers.bind(this);
  }

  stop_song = () => {
    this.hello.stop();
  };

  play_song = () => {
    this.noch.play(success => {
      if (!success) {
        console.log("Sound did not play");
      }
    });

    setTimeout(() => {
      this.hello.play(success => {
        if (!success) {
          console.log("Sound did not stopped properly");
        }
      });
    }, 10000);

    setTimeout(() => {
      this.noch.stop(success => {
        if (!success) {
          console.log("Sound did not stopped properly");
        }
      });
    }, 15000);
  };

  showList = () => {
    this.props.navigation.replace("List", {
      listings: this.state.names,
      randomize: false
    });
  };

  showList_2 = () => {
    this.props.navigation.replace("List", {
      listings: this.state.names,
      randomize: true
    });
  };

  _updatePlayers = (text, index) => {
    const newArray = [...this.state.names];
    newArray[index] = text;
    this.setState({ names: newArray });
    console.log(this.state.names);
  };

  handleChangeText(newText) {
    this.setState({ value: newText });
  }

  componentDidMount() {}

  render() {
    return (
      <Screen>
        <Heading
          eyebrow="NEW GAME · 10 PLAYERS"
          title="Gather the town."
          subtitle="Add your players, choose your seating, and let the secrets begin."
        />
        <View style={styles.players}>
          {[0, 5].map(start => (
            <View key={start} style={styles.column}>
              {this.state.names.slice(start, start + 5).map((name, offset) => {
                const index = start + offset;
                return (
                  <View key={index} style={styles.playerRow}>
                    <Text style={styles.number}>
                      {String(index + 1).padStart(2, "0")}
                    </Text>
                    <TextInput
                      style={styles.input}
                      accessibilityLabel={`Player ${index + 1} name`}
                      placeholder={`Player ${index + 1}`}
                      placeholderTextColor={colors.muted}
                      selectionColor={colors.red}
                      defaultValue={name}
                      returnKeyType="done"
                      blurOnSubmit
                      onChangeText={text => this._updatePlayers(text, index)}
                    />
                  </View>
                );
              })}
            </View>
          ))}
        </View>
        <Action onPress={this.showList}>Keep positions</Action>
        <Action secondary onPress={this.showList_2}>
          Randomize positions
        </Action>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  players: {
    flex: 1,
    minHeight: 0,
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 8
  },
  column: { flex: 1, marginHorizontal: 4 },
  playerRow: {
    flex: 1,
    minHeight: 0,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border
  },
  number: { color: "#FF687B", fontSize: 12, fontWeight: "700", width: 24 },
  input: {
    flex: 1,
    height: "100%",
    minHeight: 0,
    color: colors.text,
    fontSize: 15,
    paddingVertical: 0
  }
});
