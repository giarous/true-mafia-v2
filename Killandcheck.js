import { RoleCard, Action } from "./ui/components";

import React, { Component } from "react";

type Props = {};
export default class KillandCheck extends Component<Props> {
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
      button_function: this.nextPlayer,
      image_source_arr: [
        require("./resources/citizen.png"),
        require("./resources/mafia.png"),
        require("./resources/don.png"),
        require("./resources/sheriff_2.png"),
        require("./resources/true_story.jpg")
      ],
      image_source: require("./resources/true_story.jpg")
    };
  }
  componentDidMount() {
    console.log("Kill and Check page");
    console.log(this.state.players[this.state.counter].role);
    if (this.state.players[this.state.counter].role == "Citizen") {
      this.setState({ image_source: this.state.image_source_arr[0] });
      this.setState({ button_function: this.nextPlayer });

      if (this.state.counter == 9) {
        this.setState({ message: "You are last" });
        this.setState({ button_text: "2nd DAY" });
      } else {
        this.setState({ message: "CONFIRM" });
        this.setState({ button_text: "CONFIRM and PASS" });
      }
    } else if (this.state.players[this.state.counter].role == "Mafia") {
      this.setState({ image_source: this.state.image_source_arr[1] });
      this.setState({ message: "You are Mafia" });
      this.setState({ button_text: "KILL SOMEONE" });
      this.setState({ button_function: this.kill_someone });
    } else if (this.state.players[this.state.counter].role == "Don") {
      this.setState({ image_source: this.state.image_source_arr[2] });
      this.setState({ message: "You are Don" });
      this.setState({ button_text: "KILL SOMEONE" });
      this.setState({ button_function: this.kill_someone });
    } else if (this.state.players[this.state.counter].role == "Sheriff") {
      this.setState({ image_source: this.state.image_source_arr[3] });
      this.setState({ message: "You are Sheriff" });
      this.setState({ button_text: "CHECK SOMEONE" });
      this.setState({ button_function: this.check_someone });
    } else {
      this.setState({ image_source: this.state.image_source_arr[4] });
    }
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
      console.log("Mafia time Kill and Check");
      this.props.navigation.replace("Second_Day", {
        players_data: this.state.players,
        temp_kill_choice: this.state.kill_choice
      });
    }
  };

  kill_someone = () => {
    console.log("Open killing options");
    this.props.navigation.navigate("Kill", {
      players_data: this.state.players,
      temp_counter: this.state.counter,
      temp_kill_choice: this.state.kill_choice
    });
  };
  check_someone = () => {
    console.log("Search for someone");
    this.props.navigation.navigate("Check", {
      players_data: this.state.players,
      temp_counter: this.state.counter,
      temp_kill_choice: this.state.kill_choice
    });
  };

  render() {
    return (
      <RoleCard
        eyebrow={`PRIVATE REVEAL · PLAYER ${this.state.counter + 1}`}
        name={this.state.players[this.state.counter].name}
        role={this.state.players[this.state.counter].role}
        image={this.state.image_source}
      >
        <Action onPress={this.state.button_function}>
          {this.state.button_text}
        </Action>
      </RoleCard>
    );
  }
}
