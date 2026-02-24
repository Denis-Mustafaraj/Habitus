import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useMemory } from "../MemoryContext";

export default function Memories() {
  const [currentMonth, setCurrentMonth] = useState("");
  const [daysInMonth, setDaysInMonth] = useState(0);
  const [favoriteDay, setFavoriteDay] = useState<number | null>(null);
  const { monthsData, setMonthMemories, setFavoriteDay: setContextFavoriteDay } = useMemory();

  useEffect(() => {
    const now = new Date();
    const month = now.toLocaleString("default", { month: "long" });
    const year = now.getFullYear();
    const days = new Date(year, now.getMonth() + 1, 0).getDate();

    setCurrentMonth(month);
    setDaysInMonth(days);

    // Load favorite day for current month from context
    const monthKey = `${month} ${year}`;
    if (monthsData[monthKey]) {
      setFavoriteDay(monthsData[monthKey].favoriteDay);
    }
  }, [monthsData]);

  const handleMemoryChange = (day: number, text: string) => {
    const year = new Date().getFullYear();
    const monthKey = `${currentMonth} ${year}`;
    setMonthMemories(monthKey, day, text);
  };

  const handleFavoriteDay = (day: number) => {
    const year = new Date().getFullYear();
    const monthKey = `${currentMonth} ${year}`;
    const newFavoriteDay = favoriteDay === day ? null : day;
    setFavoriteDay(newFavoriteDay);
    setContextFavoriteDay(monthKey, newFavoriteDay);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.monthTitle}>{currentMonth} {new Date().getFullYear()}</Text>
      <ScrollView style={styles.scrollView}>
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const year = new Date().getFullYear();
          const monthKey = `${currentMonth} ${year}`;
          const memoryText = monthsData[monthKey]?.memories[day] || "";
          return (
            <View
              key={day}
              style={[styles.dayRow, favoriteDay === day && styles.favoritedDay]}
            >
              <Text style={styles.dayNumber}>{day}</Text>
              <TextInput
                style={styles.memoryInput}
                placeholder="Write your memory..."
                placeholderTextColor="#666"
                value={memoryText}
                onChangeText={(text) => handleMemoryChange(day, text)}
                multiline
              />
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => handleFavoriteDay(day)}
              >
                <Text style={styles.favoriteIcon}>
                  {favoriteDay === day ? "★" : "☆"}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
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
    marginBlock: 35,
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
  favoriteButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteIcon: {
    fontSize: 24,
    color: "#ffd33d",
  },
  favoritedDay: {
    backgroundColor: "rgba(255, 211, 61, 0.1)",
    borderBottomColor: "#ffd33d",
  },
});
