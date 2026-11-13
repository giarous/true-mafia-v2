import React from "react";
import renderer, { act } from "react-test-renderer";
import { TextInput, TouchableHighlight } from "react-native";
import { Action, PlayerPicker } from "../ui/components";
import Home from "../HomePage";
import Checking from "../CheckSomeone";
import Killing from "../KillingOptions";

jest.mock("react-native-sound", () => jest.fn());

const players = Array.from({ length: 10 }, (_, index) => ({
  name: `Guest ${index + 1}`,
  role: index === 0 ? "Don" : "Citizen"
}));
const navigation = params => ({
  state: { params },
  replace: jest.fn(),
  navigate: jest.fn()
});

it("edits all ten player names and preserves both seating actions", () => {
  const nav = navigation({});
  const tree = renderer.create(<Home navigation={nav} />);
  const inputs = tree.root.findAllByType(TextInput);
  expect(inputs).toHaveLength(10);
  act(() => inputs[9].props.onChangeText("Alex"));
  const actions = tree.root.findAllByType(Action);
  actions[0].props.onPress();
  expect(nav.replace).toHaveBeenLastCalledWith("List", {
    listings: expect.arrayContaining(["Alex"]),
    randomize: false
  });
  actions[1].props.onPress();
  expect(nav.replace).toHaveBeenLastCalledWith("List", {
    listings: expect.arrayContaining(["Alex"]),
    randomize: true
  });
});

it("shows ten accessible seats and reports the displayed player number", () => {
  const select = jest.fn();
  const tree = renderer.create(
    <PlayerPicker players={players} selected={10} onSelect={select} />
  );
  const seats = tree.root.findAllByType(TouchableHighlight);
  expect(seats).toHaveLength(10);
  expect(
    seats.filter(seat => seat.props.accessibilityState.selected)
  ).toHaveLength(1);
  expect(seats[1].props.accessibilityState.selected).toBe(true);
  seats[1].props.onPress();
  expect(select).toHaveBeenCalledWith(10);
});

it("keeps investigation choices zero based in navigation parameters", () => {
  const nav = navigation({
    players_data: players,
    temp_counter: 0,
    temp_kill_choice: "true"
  });
  const tree = renderer.create(<Checking navigation={nav} />);
  act(() => tree.root.findByType(PlayerPicker).props.onSelect(10));
  tree.root.findByType(Action).props.onPress();
  expect(nav.replace).toHaveBeenCalledWith(
    "Confirm",
    expect.objectContaining({ temp_check: 9 })
  );
});

it("keeps Mafia choices as strings and preserves the Don investigation route", () => {
  const nav = navigation({
    players_data: players,
    temp_counter: 0,
    temp_kill_choice: "true"
  });
  const tree = renderer.create(<Killing navigation={nav} />);
  act(() => tree.root.findByType(PlayerPicker).props.onSelect(10));
  tree.root.findByType(Action).props.onPress();
  expect(nav.replace).toHaveBeenCalledWith(
    "Check",
    expect.objectContaining({ temp_kill_choice: "10" })
  );
});
