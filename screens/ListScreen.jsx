import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { getmyBucketList } from "../services/DbService";
import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

const ListScreen = ({ navigation }) => {
  const goToAdd = () => {
    navigation.navigate("Add");
  };

  const [bucketItems, setBucketItems] = useState([]);

  //   useEffect(() => {
  //     handleGetData();
  //   }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleGetData();

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const handleGetData = async () => {
    const data = await getmyBucketList();
    //console.log(data);
    setBucketItems(data);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Pressable style={styles.addButton} onPress={goToAdd}>
          <Text style={styles.addButtonText}>Add</Text>
          <Entypo name="bucket" size={16} color="green" />
        </Pressable>

        {/* THIS WILL LOOP FOR EACH ITEM */}

        {bucketItems != [] ? (
          bucketItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => navigation.navigate("Details", { item })}
            >
              <Text
                style={{
                  textDecorationLine: item.isCompleted
                    ? "line-through"
                    : "none",
                }}
              >
                {item.title}
              </Text>
              {item.priority ? (
                <AntDesign name="star" size={24} color="orange" />
              ) : null}
            </TouchableOpacity>
          ))
        ) : (
          <Text>No items</Text>
        )}

        {/* END LOOP */}
      </View>
    </SafeAreaView>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    padding: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "white",
    borderColor: "green",
    borderWidth: 2,
    padding: 10,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  addButtonText: {
    textAlign: "center",
    color: "green",
    fontWeight: "bold",
  },
});
