import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { View, StyleSheet,Text, Button } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function start({navigation}){
  const [diff, setDiff] = useState("")
  const [categorysList, setCategorys] = useState([])

  const categorysApi = async () => {
    
    try {
      const categorys = await axios.get("https://opentdb.com/api_category.php");
      
      
      setCategorys(categorys.data.trivia_categories);
      console.log(categorysList)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    categorysApi();
  }, []);

    return (
      <View style={styles.container}>
        <Text>Hello World!</Text>
        <Button
          title="Go to game"
          onPress={() => navigation.navigate("Game", { diff: diff })}
        />
        <RNPickerSelect
          onValueChange={(value) => setDiff(value)}
          value={diff}
          items={[
            { label: "Easy", value: "easy" },
            { label: "Medium", value: "medium" },
            { label: "Hard", value: "hard" },
          ]}
        />
        <RNPickerSelect
          onValueChange={(name) => console.log(name)}
         items = {categorysList}
        />
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});