
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './src/screens/Home';
import Detail from './src/screens/DetailScreen'


const FadeTrans = (index, position) => {
  const sceneRange = [index - 1, index];
  const outOpacity = [0, 1];
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outOpacity,
    extrapolate: 'clamp'
  })
  transition.set

  return {
    opacity: transition
  }

}

const navConfig = () => {
  return {
    screenInterpolator: (sceneProps) => {
      const position = sceneProps.position;
      const scene = sceneProps.scene;
      const index = sceneProps.index;

      return FadeTrans(index, position)
    }
  }
}
const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  Detail: {
    screen: Detail
  }
}, {
  initialRouteName: 'Home',
  // transitionConfig: navConfig
});

export default createAppContainer(AppNavigator);


