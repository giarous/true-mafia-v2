import { Screen } from "./ui/components";
import { colors } from "./ui/theme";

import React, { Component } from "react";
import { Text, Image, View, StyleSheet } from "react-native";

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
      <Screen branded={false}>
        <View style={styles.content}>
          <Image
            source={require("./resources/mafia_logo.png")}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="True Mafia logo"
          />
          <Text style={styles.version}>TRUE MAFIA</Text>
          <Text style={styles.caption}>THE GAME IS ABOUT TO BEGIN</Text>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  logo: { width: "100%", flex: 1, minHeight: 0, maxHeight: 320 },
  version: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 3,
    marginTop: 24
  },
  caption: {
    color: colors.muted,
    fontSize: 11,
    letterSpacing: 1.5,
    marginTop: 12,
    textAlign: "center"
  }
});
