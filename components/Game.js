import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import AppButton from "./AppButton";

const Game = ({ route, navigation }) => {
  const [question, setQuestion] = useState("");
  const [counter, setCounter] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isCorrekt, setIsCorrekt] = useState(null);
  const { diff, categoryId } = route.params;

  const questionApi = async () => {
    let current = [];

    try {
      console.log(diff);
      const data = await axios.get(
        `https://opentdb.com/api.php?amount=1&category=${categoryId}&difficulty=${diff}&type=boolean`
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
  function createMarkup() {
    let filterdQuestion;
    for (let i = 0; i < question.length; i++) {
      filterdQuestion = question
        .replaceAll(/&quot;/g, '"')
        .replaceAll(/&minus;/g, '-')
        .replaceAll(/&#039;/g, "´")
        .replaceAll(/&rsquo;/g, '´');
    }
    return filterdQuestion;
  }
  const answer = (value) => {
    if (value === correctAnswer) {
      setIsCorrekt(true);
      setCounter((current) => {
        return current + 1;
      });
      questionApi();
    } else {
      setIsCorrekt(false);
      questionApi();
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{counter} Points</Text>
      <View style={styles.questionBox}>
        <Text style={styles.questionText}>{createMarkup()}</Text>
      </View>
      {isCorrekt !== null &&
        (isCorrekt ? (
          <Text style={styles.isCorrekt}>Correct</Text>
        ) : (
          <Text style={styles.isNotCorrekt}>Incorrect</Text>
        ))}

      <AppButton text="True" onPress={answer.bind(this, "True")}></AppButton>
      <AppButton text="False" onPress={answer.bind(this, "False")}></AppButton>
      <AppButton
        text="New game"
        onPress={() => navigation.goBack()}
        buttonBg="red"
      ></AppButton>
      <StatusBar style="auto" />
    </View>
  );
};
export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#42606e",
    alignItems: "center",
    justifyContent: "center",
  },
  questionBox: {
    marginBottom: "10%",
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#284f41",
  },
  questionText: {
    textAlign: "center",
    backgroundColor: "#284f41",
    color: "white",
    fontSize: 13,
  },
  isCorrekt: {
    color: "#009c29",
    fontSize: 25,
    marginBottom: 10,
  },
  isNotCorrekt: {
    color: "red",
    fontSize: 25,
    marginBottom: 10,
  },
  counter: {
    flexDirection: "row-reverse",
    fontSize: 20,
    backgroundColor: "red",
    color: "white",
  },
});
