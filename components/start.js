import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, StyleSheet, Text,ToastAndroid } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import AppButton from "./AppButton";

export default function start({ navigation }) {
  const [diff, setDiff] = useState("");
  const [categorysList, setCategorys] = useState([]);
  const [categoryId, setCategoryId] = useState(0);

  const categorysApi = async () => {
    try {
      await axios.get("https://opentdb.com/api_category.php").then((items) => {
        let x = [items.data.trivia_categories];
        x[0].forEach((element) => {
          let obj = {
            label: element.name,
            value: element.id,
          };
          setCategorys((prev) => {
            return [...prev, obj];
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    categorysApi();
  }, []);
  const showToast = (T) => {
    ToastAndroid.show(T, ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Choose difficulty</Text>

        <RNPickerSelect
          onValueChange={(value) => {
            showToast(value)
            setDiff(value);
          }}
          value={diff}
          items={[
            { label: "Easy", value: "easy" },
            { label: "Medium", value: "medium" },
            { label: "Hard", value: "hard" },
          ]}
        />
        <Text style={styles.text}>Choose category</Text>
        <RNPickerSelect
          onValueChange={(id) => setCategoryId(id)}
          items={categorysList}
          style={styles.picker}
        />
        <AppButton
          text="Start game"
          onPress={() =>
            navigation.navigate("Game", {
              diff: diff,
              categoryId: categoryId,
            })
          }
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#42606e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginBottom: 2,
    marginTop: 2,
    color: "white",
    fontSize: 20,
  },
  innerContainer: {
    width: "100%",
    alignItems: "stretch",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#284f41",
  },
});
