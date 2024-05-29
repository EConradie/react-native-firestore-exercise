import { Button, StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import { markItemAsCompleted, deleteBucketItem } from '../services/DbService';

const DetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;

  const handleMarkAsCompleted = async () => {
    const success = await markItemAsCompleted(item.id);
    if (success) {
      // Optionally refresh the item data or navigate back
      navigation.goBack(); // Go back to the ListScreen which will trigger data reload
    }
  };

  const handleDeleteItem = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: async () => {
          const success = await deleteBucketItem(item.id);
          if (success) {
            navigation.goBack();
          }
        }}
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, textDecorationLine: item.isCompleted ? 'line-through' : 'none' }}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>Due date: {item.due}</Text>
      <Text>Priority: {item.priority ? "Yes" : "No"}</Text>

      <Button
        title={item.isCompleted ? "Already Done" : "Mark Completed / Already Done"}
        color="red"
        onPress={handleMarkAsCompleted}
        disabled={item.isCompleted}
      />
      <Button
        title="Delete Item"
        color="blue"
        onPress={handleDeleteItem}
      />
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 15,
        marginTop: 20,
    }
})