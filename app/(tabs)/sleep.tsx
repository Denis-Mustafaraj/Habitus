import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Sleep() {
  const [currentMonth, setCurrentMonth] = useState("");
  const [daysInMonth, setDaysInMonth] = useState(0);
  const [sleepData, setSleepData] = useState<Record<number, number>>({});

  useEffect(() => {
    const now = new Date();
    const month = now.toLocaleString("default", { month: "long" });
    const year = now.getFullYear();
    const days = new Date(year, now.getMonth() + 1, 0).getDate();

    setCurrentMonth(`${month} ${year}`);
    setDaysInMonth(days);
  }, []);

  const days = useMemo(
    () => Array.from({ length: daysInMonth }, (_, i) => i + 1),
    [daysInMonth],
  );

  const handleInputChange = (day: number, text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    if (numericText === "" || parseInt(numericText) <= 24) {
      if (numericText === "") {
        setSleepData((prev) => {
          const newData = { ...prev };
          delete newData[day];
          return newData;
        });
      } else {
        const hours = parseInt(numericText);
        if (hours > 0 && hours <= 24) {
          setSleepData((prev) => ({ ...prev, [day]: hours }));
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.monthTitle}>{currentMonth}</Text>

      <ScrollView style={styles.contentSection}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.dayHeader}>Day</Text>
          <Text style={styles.hoursHeader}>Hours</Text>
        </View>

        {/* Days with inputs */}
        {days.map((day) => (
          <View key={day} style={styles.dayRow}>
            <Text style={styles.dayNumber}>{day}</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#666"
              value={sleepData[day]?.toString() ?? ""}
              onChangeText={(text) => handleInputChange(day, text)}
              keyboardType="numeric"
              maxLength={2}
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
    marginBlock: 35,
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dayHeader: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    width: 40,
    textAlign: "center",
  },
  hoursHeader: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
    marginLeft: 10,
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
    fontSize: 16,
    fontWeight: "bold",
    width: 40,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#2f333b",
    color: "#fff",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginLeft: 10,
  },
});
