import { Phase } from "./ui/components";
import { colors } from "./ui/theme";

import React, { Component } from "react";
import { Text } from "react-native";

type Props = {};
export default class StartScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.replace("Home");
    }, 3000);
  }

  render() {
    return (
      <Phase
        eyebrow="WELCOME TO"
        title="True Mafia."
        subtitle="Friends at the table. Secrets in the shadows."
        symbol="♦"
      >
        <Text style={{ color: colors.muted, fontSize: 12, letterSpacing: 2 }}>
          THE GAME IS ABOUT TO BEGIN
        </Text>
      </Phase>
    );
  }
}
