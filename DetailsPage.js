import { Phase, Action, Card } from "./ui/components";
import { colors } from "./ui/theme";

import React, { Component } from "react";
import { Text } from "react-native";

type Props = {};

export default class DetailsComponent extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      players: this.props.navigation.state.params.players_data,
      confirm: this.props.navigation.state.params.temp_confirm,
      error2: false,
      message: "",
      counter: this.props.navigation.state.params.temp_counter
    };
  }
  componentDidMount() {
    if (this.state.confirm == "role_checked") {
      this.setState({ counter: this.state.counter + 1 });
    }
    console.log("Detail Page: counter is " + this.state.counter);
  }

  confirmRole = () => {
    this.props.navigation.replace("Role", {
      players_data: this.state.players,
      temp_counter: this.state.counter
    });
  };

  render() {
    return (
      <Phase
        eyebrow="ROLE REVEAL"
        title="Your secret awaits."
        subtitle="Read your role privately, then pass the phone."
        symbol="◇"
      >
        <Card>
          <Text style={{ color: colors.text, fontSize: 22, fontWeight: "700" }}>
            #{this.state.counter + 1} ·{" "}
            {this.state.players[this.state.counter].name}
          </Text>
        </Card>
        <Action onPress={this.confirmRole}>Reveal my role</Action>
      </Phase>
    );
  }
}
