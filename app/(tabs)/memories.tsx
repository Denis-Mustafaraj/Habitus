import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Memories() {
  const [memories, setMemories] = useState<{ [key: number]: string }>({});
  const [currentMonth, setCurrentMonth] = useState("");
  const [daysInMonth, setDaysInMonth] = useState(0);

  useEffect(() => {
    const now = new Date();
    const month = now.toLocaleString("default", { month: "long" });
    const year = now.getFullYear();
    const days = new Date(year, now.getMonth() + 1, 0).getDate();

    setCurrentMonth(`${month} ${year}`);
    setDaysInMonth(days);
  }, []);

  const handleMemoryChange = (day: number, text: string) => {
    setMemories((prev) => ({ ...prev, [day]: text }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.monthTitle}>{currentMonth}</Text>
      <ScrollView style={styles.scrollView}>
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <View key={day} style={styles.dayRow}>
            <Text style={styles.dayNumber}>{day}</Text>
            <TextInput
              style={styles.memoryInput}
              placeholder="Write your memory..."
              placeholderTextColor="#666"
              value={memories[day] || ""}
              onChangeText={(text) => handleMemoryChange(day, text)}
              multiline
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25292F",
    flex: 1,
    paddingTop: 20,
  },
  monthTitle: {
    color: "#ffd33d",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dayRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    paddingBottom: 10,
  },
  dayNumber: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    width: 40,
    textAlign: "center",
  },
  memoryInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 10,
    minHeight: 30,
  },
});
