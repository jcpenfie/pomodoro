import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { randomQuotes } from "../service/apiQuotes";

export default function QuoteCard() {
  const [quote, setQuote] = useState({});
  useEffect(() => {
    randomQuotes().then((data) => {
      setQuote(data.data[0]);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.quote}>{quote.q}</Text>
      <Text style={styles.author}>- {quote.a}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: "center",
    backgroundColor: "#333",
    padding: 5,
    borderRadius: 15,
    marginTop: "25%",
  },
  quote: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    color: "#F2F2F2",
    margin: 10
  },
  author: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#A3A3A3",
    paddingStart: 30,
    paddingTop: 10,
  },
});
