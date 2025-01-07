import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import ReadingGoals from './components/ReadingGoals';
import Login from './components/Login';
import Signup from './components/Signup';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return <ActivityIndicator size="large" color="#0000ff" />;

  if (!user) {
    Alert.alert(
      "Authentication Error",
      "User is not authenticated. Please log in.",
      [{ text: "OK" }]
    );
  }

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator initialRouteName={user ? "BookList" : "Login"}>
          {user ? (
            <>
              <Stack.Screen name="BookList" component={BookList} />
              <Stack.Screen name="BookDetails" component={BookDetails} />
              <Stack.Screen name="AddBook" component={AddBook} />
              <Stack.Screen name="EditBook" component={EditBook} />
              <Stack.Screen name="ReadingGoals" component={ReadingGoals} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          )}
        </Stack.Navigator>
      </View>
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
});

export default App;
