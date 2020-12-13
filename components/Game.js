import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import axios from "axios";

export default function Game({route}) {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isCorrekt, setIsCorrekt] = useState(null);
  const {diff} = route.params
  const questionApi = async () => {
    let current = [];
    
    try {
        console.log(diff);
      const data = await axios.get(
        `https://opentdb.com/api.php?amount=1&category=9&difficulty=${diff}&type=boolean`
      );
      current = data.data.results;
    } catch (error) {
      console.log(error);
    }
    try {
      setQuestion(current[0].question);
      console.log(current[0].question);
      setCorrectAnswer(current[0].correct_answer);
      console.log(current[0].correct_answer);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    questionApi();
  }, []);
  function answer(value) {
    console.log(value);
    if (value === correctAnswer) {
      console.log("Correct");
      setIsCorrekt(true)
    } else {
      console.log("Incorrect");
      setIsCorrekt(false)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.questionBox}>
        <Text style={styles.questionText}>{question}</Text>
      </View>
      {isCorrekt !== null &&
        (isCorrekt ? (
          <Text style={styles.isCorrekt}>Correct</Text>
        ) : (
          <Text style={styles.isNotCorrekt}>Incorrect</Text>
        ))}
      <Button title="Klicka här" onPress={questionApi}></Button>
      <Button title="True" onPress={answer.bind(this, "True")}></Button>
      <Button title="False" onPress={answer.bind(this, "False")}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '90%',
    backgroundColor: "#fff",
    flexDirection:'column',
  },

  questionBox: {
    marginBottom: "10%",
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "red",
  },
  questionText:{
      textAlign: 'center'
  },
  isCorrekt:{
    color: 'green',
    fontSize: 25
  },
  isNotCorrekt:{
    color: 'red',
    fontSize: 25
  }
});
