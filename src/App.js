import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import ReadingGoals from './components/ReadingGoals';
import { StyleSheet, View, Switch, Text } from 'react-native';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onFinish={() => setIsReady(true)}
        onError={handleLoadingError}
      />
    );
  }

  return (
    <NavigationContainer>
      <View style={isDarkMode ? styles.darkContainer : styles.container}>
        <View style={styles.switchContainer}>
          <Text style={isDarkMode ? styles.darkText : styles.text}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isDarkMode}
          />
        </View>
        <Stack.Navigator initialRouteName="BookList">
          <Stack.Screen name="BookList" component={BookList} />
          <Stack.Screen name="BookDetails" component={BookDetails} />
          <Stack.Screen name="AddBook" component={AddBook} />
          <Stack.Screen name="EditBook" component={EditBook} />
          <Stack.Screen name="ReadingGoals" component={ReadingGoals} />
        </Stack.Navigator>
      </View>
      <StatusBar style="auto" />
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
  darkContainer: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
  darkText: {
    fontSize: 18,
    color: '#fff',
  },
});

async function loadResourcesAsync() {
  // Load any resources or data that we need prior to rendering the app
}

function handleLoadingError(error) {
  // Handle the loading error
  console.warn(error);
}

export default App;
