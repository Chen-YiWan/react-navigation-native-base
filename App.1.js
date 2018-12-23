// In App.js in a new project

import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title:"Home",
    headerRight: (
      <Button
        onPress={() => alert('安安')}
        title="button"
        color="#fff"
      />
    )
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          onPress={() => this.props.navigation.navigate('MyModal')}
          title="Info"
        />
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details',{title: "Home go to details"})} />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
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
        <Button
          title="Update the title"
          onPress={() => this.props.navigation.setParams({title: 'Updated!'})}
        />
        <Button
          title="Go to Details... push"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button
          title="Navigate Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Navigate Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <Button
          title="Go popToTop"
          onPress={() => this.props.navigation.popToTop()}
        />
      </View>
    );
  }
}

class LoginScreen extends React.Component{
  render(){
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Login Page</Text>  
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    )
  }
}

class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

const Main = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Login: LoginScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: Main,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);


export default createAppContainer(RootStack);