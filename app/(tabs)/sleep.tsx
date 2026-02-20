import { StyleSheet, Text, View } from "react-native";

export default function Sleep() {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Track Your Sleep</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25292F",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  textStyle: {
    color: "#fff",
    fontSize: 20,
  },
});
