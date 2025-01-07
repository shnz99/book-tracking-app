import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';

const ReadingGoals = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [progress, setProgress] = useState({});

  const handleNewGoalChange = (text) => {
    setNewGoal(text);
  };

  const handleAddGoal = () => {
    if (newGoal.trim() !== '') {
      setGoals([...goals, newGoal]);
      setNewGoal('');
    }
  };

  const handleProgressChange = (goal, text) => {
    setProgress({
      ...progress,
      [goal]: text,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reading Goals</Text>
      <View style={styles.addGoal}>
        <TextInput
          style={styles.input}
          value={newGoal}
          onChangeText={handleNewGoalChange}
          placeholder="Enter a new goal"
        />
        <Button title="Add Goal" onPress={handleAddGoal} />
      </View>
      <FlatList
        data={goals}
        renderItem={({ item }) => (
          <View style={styles.goalItem}>
            <Text style={styles.goalText}>{item}</Text>
            <TextInput
              style={styles.progressInput}
              value={progress[item] || '0'}
              onChangeText={(text) => handleProgressChange(item, text)}
              keyboardType="numeric"
              maxLength={3}
            />
            <Text style={styles.percentage}>%</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addGoal: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalText: {
    flex: 1,
    fontSize: 18,
  },
  progressInput: {
    width: 50,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  percentage: {
    fontSize: 18,
    marginLeft: 5,
  },
});

export default ReadingGoals;
