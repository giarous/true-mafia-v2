import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from './screens/SplashScreen';
import PlayerSetupScreen from './screens/PlayerSetupScreen';
import SeatingScreen from './screens/SeatingScreen';
import RoleRevealScreen from './screens/RoleRevealScreen';
import RoleScreen from './screens/RoleScreen';
import MafiaPhaseScreen from './screens/MafiaPhaseScreen';
import FirstDayScreen from './screens/FirstDayScreen';
import NightScreen from './screens/NightScreen';
import NightActionScreen from './screens/NightActionScreen';
import VictimSelectionScreen from './screens/VictimSelectionScreen';
import InvestigationScreen from './screens/InvestigationScreen';
import InvestigationResultScreen from './screens/InvestigationResultScreen';
import DaybreakScreen from './screens/DaybreakScreen';

// Route names and parameter keys stay stable throughout the pass-the-phone flow.
const routes = {
  Start: {screen: SplashScreen},
  Home: {screen: PlayerSetupScreen},
  List: {screen: SeatingScreen},
  Details: {screen: RoleRevealScreen},
  Role: {screen: RoleScreen},
  MafiaTime: {screen: MafiaPhaseScreen},
  Day: {screen: FirstDayScreen},
  Night: {screen: NightScreen},
  Second_Night: {screen: NightActionScreen},
  Kill: {screen: VictimSelectionScreen},
  Check: {screen: InvestigationScreen},
  Confirm: {screen: InvestigationResultScreen},
  Second_Day: {screen: DaybreakScreen},
};

export default createAppContainer(
  createStackNavigator(routes, {
    initialRouteName: 'Start',
    mode: 'modal',
    headerMode: 'none',
  }),
);
