import React from 'react';
import renderer from 'react-test-renderer';
import NightActionScreen from '../screens/NightActionScreen';
import {Action} from '../ui/components';

it.each([
  ['Citizen', 'replace', 'Night'],
  ['Mafia', 'navigate', 'Kill'],
  ['Don', 'navigate', 'Kill'],
  ['Sheriff', 'navigate', 'Check'],
])('preserves the %s night action', (role, method, route) => {
  const players = [{name: 'Alex', role}];
  const navigation = {
    state: {
      params: {
        players_data: players,
        temp_counter: 0,
        temp_kill_choice: 'true',
      },
    },
    replace: jest.fn(),
    navigate: jest.fn(),
  };
  const tree = renderer.create(<NightActionScreen navigation={navigation} />);
  tree.root.findByType(Action).props.onPress();
  expect(navigation[method]).toHaveBeenCalledWith(
    route,
    expect.objectContaining({players_data: players, temp_counter: 0}),
  );
  tree.unmount();
});

it('moves the last Citizen to daybreak with the current vote result', () => {
  const players = Array.from({length: 10}, (_, index) => ({
    name: `Player ${index + 1}`,
    role: 'Citizen',
  }));
  const navigation = {
    state: {
      params: {
        players_data: players,
        temp_counter: 9,
        temp_kill_choice: 'false',
      },
    },
    replace: jest.fn(),
  };
  const tree = renderer.create(<NightActionScreen navigation={navigation} />);
  tree.root.findByType(Action).props.onPress();
  expect(navigation.replace).toHaveBeenCalledWith('Second_Day', {
    players_data: players,
    temp_kill_choice: 'false',
  });
  tree.unmount();
});
