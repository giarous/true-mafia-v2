import { Phase, Action, Card } from "./ui/components";
import { colors } from "./ui/theme";

import React, { Component } from "react";
import { Text } from "react-native";
var Sound = require("react-native-sound");

type Props = {};
export default class SecondDay extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      players: this.props.navigation.state.params.players_data,
      kill_choice: this.props.navigation.state.params.temp_kill_choice,
      error: false,
      killed_person: "NO ONE"
    };
  }
  componentDidMount() {
    console.log("2nd Day");
    console.log(this.state.kill_choice);

    this.regular_night = new Sound(
      "regular_night.mp3",
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log("failed to load the sound", error);
          return;
        }
      }
    );

    if (this.state.kill_choice != "false") {
      this.setState({ killed_person: this.state.kill_choice });
    }

    this.num1 = new Sound("num1.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
    });
    this.num2 = new Sound("num2.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
    });
    this.num3 = new Sound("num3.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
    });
    this.num4 = new Sound("num4.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
    });
    this.num5 = new Sound("num5.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
    });
    this.num6 = new Sound("num6.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
    });
    this.num7 = new Sound("num7.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
    });
    this.num8 = new Sound("num8.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
    });
    this.num9 = new Sound("num9.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
    });
    this.num10 = new Sound("num10.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
    });

    this.day = new Sound("day.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
    });
    this.miss = new Sound("miss.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
    });
    this.killed = new Sound("killed.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
    });

    this.miss = new Sound("miss.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
    });
    this.killed = new Sound("killed.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
    });

    this.play_song();
  }
  play_song = () => {
    setTimeout(() => {
      if (this.state.kill_choice != "false") {
        this.killed.play(success => {
          if (!success) {
            console.log("Sound did not play");
          }
        });

        setTimeout(() => {
          if (this.state.kill_choice == "1") {
            this.num1.play(success => {
              if (!success) {
                console.log("Sound did not play");
              }
            });
          } else if (this.state.kill_choice == "2") {
            this.num2.play(success => {
              if (!success) {
                console.log("Sound did not play");
              }
            });
          } else if (this.state.kill_choice == "3") {
            this.num3.play(success => {
              if (!success) {
                console.log("Sound did not play");
              }
            });
          } else if (this.state.kill_choice == "4") {
            this.num4.play(success => {
              if (!success) {
                console.log("Sound did not play");
              }
            });
          } else if (this.state.kill_choice == "5") {
            this.num5.play(success => {
              if (!success) {
                console.log("Sound did not play");
              }
            });
          } else if (this.state.kill_choice == "6") {
            this.num6.play(success => {
              if (!success) {
                console.log("Sound did not play");
              }
            });
          } else if (this.state.kill_choice == "7") {
            this.num7.play(success => {
              if (!success) {
                console.log("Sound did not play");
              }
            });
          } else if (this.state.kill_choice == "8") {
            this.num8.play(success => {
              if (!success) {
                console.log("Sound did not play");
              }
            });
          } else if (this.state.kill_choice == "9") {
            this.num9.play(success => {
              if (!success) {
                console.log("Sound did not play");
              }
            });
          } else {
            this.num10.play(success => {
              if (!success) {
                console.log("Sound did not play");
              }
            });
          }

          ////
        }, 6000);
      } else {
        this.miss.play(success => {
          if (!success) {
            console.log("Sound did not stopped properly");
          }
        });
      }
    }, 1000);
  };

  play_song_night = () => {
    this.regular_night.play(success => {
      if (!success) {
        console.log("Sound did not play");
      }
    });
  };

  the_night = () => {
    this.play_song_night();
    //Needs Checking
    this.setState({ kill_choice: "true" });

    setTimeout(() => {
      console.log(
        "Second Day ends and the kill choice is: " + this.state.kill_choice
      );
      this.props.navigation.replace("Night", {
        players_data: this.state.players,
        temp_counter: 0,
        temp_kill_choice: this.state.kill_choice
      });
    }, 500);
  };

  render() {
    return (
      <Phase
        eyebrow="DAYBREAK"
        title="A new day begins."
        subtitle="The night is over. Let the discussions begin."
        symbol="☀"
      >
        <Card>
          <Text style={{ color: colors.muted, fontSize: 12, marginBottom: 8 }}>
            NIGHT RESULT
          </Text>
          <Text style={{ color: colors.text, fontSize: 24, fontWeight: "700" }}>
            Mafia killed: {this.state.killed_person}
          </Text>
        </Card>
        <Action onPress={this.the_night}>Begin next night</Action>
      </Phase>
    );
  }
}
