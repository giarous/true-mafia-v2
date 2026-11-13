import { Phase, Action, Card } from "./ui/components";
import { colors } from "./ui/theme";

import React, { Component } from "react";
import { Text } from "react-native";

type Props = {};
export default class NightComponent extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      players: this.props.navigation.state.params.players_data,
      confirm: this.props.navigation.state.params.temp_confirm,
      error2: false,
      message: "",
      counter: this.props.navigation.state.params.temp_counter,
      kill_choice: this.props.navigation.state.params.temp_kill_choice
    };
  }
  componentDidMount() {
    console.log("Regular Night and Counter is " + this.state.counter);
    if (this.state.confirm == "role_checked") {
      this.setState({ counter: this.state.counter + 1 });
    }
  }

  confirmRole = () => {
    this.props.navigation.replace("Second_Night", {
      players_data: this.state.players,
      temp_counter: this.state.counter,
      temp_kill_choice: this.state.kill_choice
    });
  };

  render() {
    return (
      <Phase
        eyebrow="NIGHT ROUND"
        title="The town is asleep."
        subtitle="Confirm your identity privately to continue."
        symbol="☾"
      >
        <Card>
          <Text style={{ color: colors.text, fontSize: 22, fontWeight: "700" }}>
            #{this.state.counter + 1} ·{" "}
            {this.state.players[this.state.counter].name}
          </Text>
        </Card>
        <Action onPress={this.confirmRole}>Confirm my role</Action>
      </Phase>
    );
  }
}
