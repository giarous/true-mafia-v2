import { RoleCard, Action } from "./ui/components";

import React, { Component } from "react";
var Sound = require("react-native-sound");

type Props = {};
export default class CheckRole extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      players: this.props.navigation.state.params.players_data,
      counter: this.props.navigation.state.params.temp_counter,
      confirm: "role_checked",
      error: false,
      message: "",
      button_text: "Confirm and pass",
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
    console.log(this.state.players[this.state.counter].role);
    if (this.state.players[this.state.counter].role == "Citizen") {
      this.setState({ image_source: this.state.image_source_arr[0] });
    } else if (this.state.players[this.state.counter].role == "Mafia") {
      this.setState({ image_source: this.state.image_source_arr[1] });
    } else if (this.state.players[this.state.counter].role == "Don") {
      this.setState({ image_source: this.state.image_source_arr[2] });
    } else if (this.state.players[this.state.counter].role == "Sheriff") {
      this.setState({ image_source: this.state.image_source_arr[3] });
    } else {
      this.setState({ image_source: this.state.image_source_arr[4] });
    }
  }

  top_song = () => {
    this.noch.stop();
  };
  play_song = () => {};

  nextPlayer = () => {
    if (this.state.counter < 9) {
      this.props.navigation.replace("Details", {
        players_data: this.state.players,
        temp_confirm: this.state.confirm,
        temp_counter: this.state.counter
      });
    } else {
      console.log("Mafia time Roles");
      this.props.navigation.replace("MafiaTime", {
        players_data: this.state.players
      });
    }
  };

  render() {
    return (
      <RoleCard
        eyebrow={`PRIVATE REVEAL · PLAYER ${this.state.counter + 1}`}
        name={this.state.players[this.state.counter].name}
        role={this.state.players[this.state.counter].role}
        image={this.state.image_source}
      >
        <Action onPress={this.nextPlayer}>
          {this.state.counter == 9
            ? "Sleep. It's Mafia time"
            : "Confirm and pass"}
        </Action>
      </RoleCard>
    );
  }
}
