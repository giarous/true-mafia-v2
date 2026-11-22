import React from 'react';
import renderer, {act} from 'react-test-renderer';
import KeepAwake from 'react-native-keep-awake';
import MafiaPhaseScreen from '../screens/MafiaPhaseScreen';
import DaybreakScreen from '../screens/DaybreakScreen';
import {playSound} from '../game/audio';

jest.mock('../game/audio', () => ({
  loadSound: jest.fn(filename => ({filename})),
  playSound: jest.fn(),
}));

const players = [{name: 'Alex', role: 'Mafia'}];
const navigation = params => ({state: {params}, replace: jest.fn()});
const played = () => playSound.mock.calls.map(([sound]) => sound.filename);

beforeEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

it('preserves the first Mafia phase audio cues and ninety-second transition', () => {
  const nav = navigation({players_data: players});
  const tree = renderer.create(<MafiaPhaseScreen navigation={nav} />);
  act(() => jest.advanceTimersByTime(1000));
  expect(played()).toEqual(['mafia_deal.mp3']);
  expect(KeepAwake.activate).toHaveBeenCalledTimes(1);
  act(() => jest.advanceTimersByTime(13000));
  expect(played()).toContain('noch.mp3');
  act(() => jest.advanceTimersByTime(57000));
  expect(played()).toContain('ten_seconds.mp3');
  act(() => jest.advanceTimersByTime(12000));
  expect(played()).toContain('mafia_sleeps.mp3');
  expect(KeepAwake.deactivate).toHaveBeenCalledTimes(1);
  expect(nav.replace).not.toHaveBeenCalled();
  act(() => jest.advanceTimersByTime(7000));
  expect(played()).toEqual([
    'mafia_deal.mp3',
    'noch.mp3',
    'ten_seconds.mp3',
    'mafia_sleeps.mp3',
    'day.mp3',
  ]);
  expect(nav.replace).toHaveBeenCalledWith('Day', {players_data: players});
  tree.unmount();
});

it.each(['1', '9', '10'])(
  'announces victim %s after the existing narration delay',
  choice => {
    const tree = renderer.create(
      <DaybreakScreen
        navigation={navigation({
          players_data: players,
          temp_kill_choice: choice,
        })}
      />,
    );
    act(() => jest.advanceTimersByTime(1000));
    expect(played()).toEqual(['killed.mp3']);
    act(() => jest.advanceTimersByTime(6000));
    expect(played()).toEqual(['killed.mp3', `num${choice}.mp3`]);
    tree.unmount();
  },
);

it('announces a miss when Mafia choices disagree', () => {
  const tree = renderer.create(
    <DaybreakScreen
      navigation={navigation({
        players_data: players,
        temp_kill_choice: 'false',
      })}
    />,
  );
  act(() => jest.advanceTimersByTime(1000));
  expect(played()).toEqual(['miss.mp3']);
  tree.unmount();
});
