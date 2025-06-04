import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/screens/HomeScreen';
import DetailsScreen from './components/screens/DetailsScreen';
import Profile from './components/profile/profile';
import ItemsScreen from './components/screens/ItemsScreen';
import SignUpScreen from './components/screens/SignUpScreen';
import SignInScreen from './components/screens/SignInScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Welcome', headerShown: false }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ title: 'Details' }}
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile} 
          options={{ title: 'Profile' }}
        />
        <Stack.Screen 
          name="Items" 
          component={ItemsScreen} 
          options={{ 
            title: 'My Items',
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen} 
          options={{ 
            title: 'Sign Up',
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="SignIn" 
          component={SignInScreen} 
          options={{ 
            title: 'Sign In',
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#212f3d',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
