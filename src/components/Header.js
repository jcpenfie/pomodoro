import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"];

export default function Header({ currentTime, setCurrentTime, setTime, playSound }) {
  function handlePress(index) {
    playSound();
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentTime(index);
    setTime(newTime * 60);
  }

  return (
    <View style={{ flexDirection: "row" }}>
      {options.map((item, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => {
            handlePress(i);
          }}
          style={[
            styles.itemStyle,
            currentTime !== i && { borderColor: "transparent" },
          ]}
        >
          <Text style={{fontWeight: "bold"}}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    width: "33%",
    alignItems: "center",
    borderWidth: 3,
    padding: 5,
    borderRadius:10,
    borderColor: "white",
    marginVertical: 20,
  },
});
