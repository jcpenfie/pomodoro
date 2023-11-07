import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { randomQuotes } from "../service/apiQuotes";

export default function QuoteCard() {
  const [quote, setQuote] = useState({});
  const [loadingQuote, setLoadingQuote] = useState(true);
  useEffect(() => {
    randomQuotes().then((data) => {
      setQuote(data.data[0]);
      setLoadingQuote(false);
    });
  }, []);
  return (
    <View style={styles.container}>
      {!loadingQuote ? (
        <>
          <Text style={styles.quote}>{quote.q}</Text>
          <Text style={styles.author}>- {quote.a}</Text>
        </>
      ) : (
        <ActivityIndicator size="large" color="#F2F2F2" />
      )}
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
    margin: 10,
  },
  author: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#A3A3A3",
    paddingStart: 30,
    paddingTop: 10,
  },
});
