import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";
import { Audio } from "expo-av";
import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);
  const [isMusic, setIsMusic] = useState(false);
  const [soundInstance, setSoundInstance] = useState(null);

  async function playSoundFinish() {
    if (soundInstance) {
      try {
        await soundInstance.replayAsync(); // Vuelve a reproducir el sonido existente
      } catch (error) {
        // Maneja el error si ocurriera durante la reproducción
        console.error("Error al reproducir el sonido:", error);
      }
    } else {
      // Si no hay una instancia del sonido, crea una nueva
      const { sound } = await Audio.Sound.createAsync(
        require("./assets/finish.mp3")
      );
      setSoundInstance(sound); // Establece la instancia del sonido
      try {
        await sound.playAsync(); // Reproduce el sonido
      } catch (error) {
        // Maneja el error si ocurriera durante la reproducción
        console.error("Error al reproducir el sonido:", error);
      }
    }
  }

  useEffect(() => {
    let interval = null;

    if (isActive) {
      //Ejecutar el timer
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500);
      playSoundFinish();
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  useEffect(() => {
    if (isMusic) {
      playSoundAmbient();
    } else {
      if (soundInstance) {
        soundInstance.stopAsync();
      }
    }
  }, [isMusic]);

  function handleStarStop() {
    playSound();
    setIsActive(!isActive);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/click.wav")
    );
    await sound.playAsync();
  }
  async function playSoundFinish() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/finish.mp3")
    );
    await sound.setVolumeAsync(1.0);
    await sound.playAsync();
  }

  async function playSoundAmbient() {
    if (soundInstance === null) {
      const { sound } = await Audio.Sound.createAsync(
        require("./assets/ambient.wav"),
        { isMuted: false, isLooping: true }
      );
      setSoundInstance(sound);
      await sound.playAsync();
    } else {
      await soundInstance.replayAsync(); // Reproducir nuevamente el sonido existente
    }
  }

  function handleStarStop() {
    setIsActive(!isActive);
  }

  return (
    //Con la statusbar: En Android el SafeAreaView no funciona por lo que añddimos el View con un padding top, pero con la distinción de plataforma
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS === "android" && 30,
        }}
      >
      <StatusBar/>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.text}>Pomodoro</Text>
          <Entypo
            onPress={() => setIsMusic(!isMusic)}
            name={isMusic ? "sound" : "sound-mute"}
            size={24}
            color={isMusic ? "black" : "#333"}
          />
        </View>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time} isActive={isActive} />
        <TouchableOpacity onPress={handleStarStop} style={styles.button}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  },
});
