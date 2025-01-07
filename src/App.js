import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import ReadingGoals from './components/ReadingGoals';
import { StyleSheet, View } from 'react-native';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator initialRouteName="BookList">
          <Stack.Screen name="BookList" component={BookList} />
          <Stack.Screen name="BookDetails" component={BookDetails} />
          <Stack.Screen name="AddBook" component={AddBook} />
          <Stack.Screen name="EditBook" component={EditBook} />
          <Stack.Screen name="ReadingGoals" component={ReadingGoals} />
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
