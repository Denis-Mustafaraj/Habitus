import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { useMemory } from "../MemoryContext";

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
  const [showModal, setShowModal] = useState(false);
  const { getFavoriteMemory } = useMemory();

  const handleMonthPress = (month: string) => {
    setSelectedMonth(month);
    setShowModal(true);
  };

  const favoriteMemory = selectedMonth ? getFavoriteMemory(`${selectedMonth} ${new Date().getFullYear()}`) : null;

  return (
    <>
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

      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedMonth}</Text>
            {favoriteMemory ? (
              <>
                <Text style={styles.favoriteLabel}>Your Favorite Memory:</Text>
                <Text style={styles.favoriteMemoryText}>{favoriteMemory}</Text>
              </>
            ) : (
              <Text style={styles.noMemoryText}>
                No favorite memory yet. Add one in the Memories tab!
              </Text>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#3D424A",
    borderRadius: 12,
    padding: 24,
    width: "85%",
    maxHeight: "80%",
  },
  modalTitle: {
    color: "#ffd33d",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  favoriteLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 12,
  },
  favoriteMemoryText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    backgroundColor: "#25292F",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  noMemoryText: {
    color: "#999",
    fontSize: 14,
    fontStyle: "italic",
    marginVertical: 16,
  },
  closeButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
