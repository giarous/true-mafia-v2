import { RoleCard, Action } from "./ui/components";

import React, { Component } from "react";

type Props = {};
export default class ConfirmCheck extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      players: this.props.navigation.state.params.players_data,
      counter: this.props.navigation.state.params.temp_counter,
      kill_choice: this.props.navigation.state.params.temp_kill_choice,
      check_option: this.props.navigation.state.params.temp_check,
      confirm: "role_checked",
      error: false,
      message: "",
      generic_role: "Default",
      button_text: "Confirm and pass",
      image_source_arr: [
        require("./resources/citizen.png"),
        require("./resources/mafia.png"),
        require("./resources/sheriff_2.png"),
        require("./resources/true_story.jpg")
      ],
      image_source: require("./resources/true_story.jpg")
    };
  }
  componentDidMount() {
    console.log(this.state.players[this.state.check_option].role);
    if (this.state.players[this.state.check_option].role == "Citizen") {
      this.setState({ image_source: this.state.image_source_arr[0] });
      this.setState({ generic_role: "Citizen" });
    } else if (this.state.players[this.state.check_option].role == "Sheriff") {
      this.setState({ image_source: this.state.image_source_arr[2] });
      this.setState({ generic_role: "Sheriff" });
    } else if (
      this.state.players[this.state.check_option].role == "Mafia" ||
      this.state.players[this.state.check_option].role == "Don"
    ) {
      this.setState({ image_source: this.state.image_source_arr[1] });
      this.setState({ generic_role: "Mafia" });
    } else {
      this.setState({ image_source: this.state.image_source_arr[3] });
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
      console.log("2nd Day");
      this.props.navigation.replace("Second_Day", {
        players_data: this.state.players,
        temp_kill_choice: this.state.kill_choice
      });
    }
  };

  render() {
    return (
      <RoleCard
        eyebrow={`INVESTIGATION · PLAYER ${this.state.check_option + 1}`}
        name={this.state.players[this.state.check_option].name}
        role={this.state.generic_role}
        image={this.state.image_source}
      >
        <Action onPress={this.nextPlayer}>
          {this.state.counter == 9 ? "Confirm" : "Confirm and pass"}
        </Action>
      </RoleCard>
    );
  }
}
