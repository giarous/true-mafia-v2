import { Screen, Heading, Action, PlayerPicker } from "./ui/components";

import React, { Component } from "react";
import { Alert } from "react-native";

type Props = {};
export default class Killing extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      players: this.props.navigation.state.params.players_data,
      counter: this.props.navigation.state.params.temp_counter,
      kill_choice: this.props.navigation.state.params.temp_kill_choice,
      confirm: "role_checked",
      error: false,
      message: "",
      button_text: "Confirm and pass",
      button_function: this.check_someone,
      value: "Nothing"
    };
  }
  componentDidMount() {
    console.log(this.state.value);
  }

  nextPlayer = () => {
    if (this.state.counter < 9) {
      this.props.navigation.replace("Night", {
        players_data: this.state.players,
        temp_confirm: this.state.confirm,
        temp_counter: this.state.counter,
        temp_kill_choice: this.state.kill_choice
      });
    } else {
      console.log("2nd Day");
      this.props.navigation.replace("Second_Day", {
        players_data: this.state.players,
        temp_kill_choice: this.state.kill_choice
      });
    }
  };

  buttonPressed = choice => {
    console.log(choice);
    if (this.state.kill_choice == "true" || this.state.kill_choice == choice) {
      this.setState({ kill_choice: choice });
    } else {
      this.setState({ kill_choice: "false" });
    }

    this.setState({ value: choice });
    console.log(this.state.value);
  };

  check_someone = () => {
    console.log("Search for someone");

    if (this.state.value != "Nothing") {
      if (this.state.players[this.state.counter].role == "Don") {
        this.props.navigation.replace("Check", {
          players_data: this.state.players,
          temp_counter: this.state.counter,
          temp_kill_choice: this.state.kill_choice
        });
      } else {
        this.nextPlayer();
      }
    } else {
      Alert.alert("You need to choose someone");
    }
  };

  render() {
    return (
      <Screen>
        <Heading
          eyebrow="MAFIA DECISION"
          title="Choose your victim."
          subtitle={`Player ${this.state.counter + 1} · ${
            this.state.players[this.state.counter].name
          } — select a number below.`}
        />
        <PlayerPicker
          players={this.state.players}
          selected={Number(this.state.value)}
          onSelect={number => this.buttonPressed(String(number))}
        />
        <Action onPress={this.check_someone}>
          {this.state.value === "Nothing"
            ? "Select a player"
            : `Shoot at #${this.state.value}`}
        </Action>
      </Screen>
    );
  }
}
