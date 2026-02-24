import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Profile() {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const handleMonthPress = (month: string) => {
    setSelectedMonth(month);
    // TODO: Implement month details view here
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleStyle}>Year Overview</Text>
      <View style={styles.monthsGrid}>
        {months.map((month) => (
          <TouchableOpacity
            key={month}
            style={[
              styles.monthBox,
              selectedMonth === month && styles.monthBoxSelected,
            ]}
            onPress={() => handleMonthPress(month)}
          >
            <Text style={styles.monthText}>{month}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25292F",
    flex: 1,
    padding: 16,
  },
  titleStyle: {
    color: "#ffd33d",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBlock: 35,
  },
  monthsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  monthBox: {
    width: "48%",
    aspectRatio: 1,
    backgroundColor: "#3D424A",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#3D424A",
  },
  monthBoxSelected: {
    borderColor: "#007AFF",
    backgroundColor: "#454D55",
  },
  monthText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
