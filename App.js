// In App.js in a new project

import React from "react";
import { View, 
  ActivityIndicator,
  AsyncStorage,
  StatusBar } from "react-native";
import { Button, Text } from "native-base";
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title:"Home111",
    headerRight: (
      <Button transparent  onPress={() => alert('安安')} >
        <Text>button</Text>
      </Button>
    )
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button transparent  style={{alignSelf: 'center'}}
          onPress={() => this.props.navigation.navigate('Details',{title: "Home go to details"})}>
          <Text>Go to Details</Text>
        </Button>
        <Button transparent  onPress={this._signOutAsync}>
          <Text>Sign Out</Text>
        </Button>
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Details Screen'),
    };
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Button transparent  onPress={() => this.props.navigation.setParams({title: 'Updated!'})}>
          <Text>Update the title</Text>
        </Button>
        <Button transparent  onPress={() => this.props.navigation.push('Details')}>
          <Text>Go to Details... push</Text>
        </Button>
        <Button transparent  onPress={() => this.props.navigation.navigate('Home')}>
          <Text>Navigate Home</Text>
        </Button>
        <Button transparent  onPress={() => this.props.navigation.navigate('Login')}>
          <Text>Navigate Login</Text>
        </Button>
        <Button transparent  onPress={() => this.props.navigation.popToTop()}>
          <Text>Go popToTop</Text>
        </Button>
      </View>
    );
  }
}

class SignInScreen extends React.Component{
  static navigationOptions = {
    title: 'Please sign in',
  };

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };

  render(){
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>SignInScreen</Text>  
        <Button transparent  onPress={this._signInAsync}>
          <Text>Sign In</Text>
        </Button>
      </View>
    )
  }
}

const AppStack = createStackNavigator({ Home: HomeScreen, Details: DetailsScreen },{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
});
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));


