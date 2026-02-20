import { useEffect, useMemo, useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function Habits() {
  const [currentMonth, setCurrentMonth] = useState("");
  const [daysInMonth, setDaysInMonth] = useState(0);
  const [habits, setHabits] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [habitDraft, setHabitDraft] = useState("");
  const [checks, setChecks] = useState<Record<number, Record<number, boolean>>>(
    {},
  );

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

  const toggleCheck = (day: number, habitIndex: number) => {
    setChecks((prev) => {
      const dayMap = prev[day] ?? {};
      return {
        ...prev,
        [day]: {
          ...dayMap,
          [habitIndex]: !dayMap[habitIndex],
        },
      };
    });
  };

  const openAddHabit = () => {
    setHabitDraft("");
    setIsAdding(true);
  };

  const openEditHabit = (index: number) => {
    setHabitDraft(habits[index] ?? "");
    setEditingIndex(index);
  };

  const closeHabitModal = () => {
    setIsAdding(false);
    setEditingIndex(null);
  };

  const saveHabit = () => {
    const trimmed = habitDraft.trim();
    if (!trimmed) {
      return;
    }
    if (editingIndex === null) {
      setHabits((prev) => [...prev, trimmed]);
    } else {
      setHabits((prev) =>
        prev.map((habit, index) => (index === editingIndex ? trimmed : habit)),
      );
    }
    setHabitDraft("");
    setIsAdding(false);
    setEditingIndex(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.monthTitle}>{currentMonth}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <View style={styles.headerRow}>
            <Text style={styles.dayHeader}>Day</Text>
            {habits.map((habit, index) => (
              <Pressable
                key={`${habit}-${index}`}
                style={styles.habitHeaderCell}
                onPress={() => openEditHabit(index)}
              >
                <Text style={styles.habitHeaderText}>{habit}</Text>
              </Pressable>
            ))}
            <Pressable style={styles.addHabitCell} onPress={openAddHabit}>
              <Text style={styles.addHabitText}>+</Text>
            </Pressable>
          </View>
          <ScrollView style={styles.scrollView}>
            {days.map((day) => (
              <View key={day} style={styles.dayRow}>
                <Text style={styles.dayNumber}>{day}</Text>
                {habits.map((_, habitIndex) => {
                  const isChecked = !!checks[day]?.[habitIndex];
                  return (
                    <Pressable
                      key={`${day}-${habitIndex}`}
                      style={styles.rowCell}
                      onPress={() => toggleCheck(day, habitIndex)}
                    >
                      <Text style={styles.checkText}>
                        {isChecked ? "X" : ""}
                      </Text>
                    </Pressable>
                  );
                })}
                <View style={styles.addHabitSpacer} />
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <Modal
        transparent
        animationType="fade"
        visible={isAdding || editingIndex !== null}
        onRequestClose={closeHabitModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {editingIndex === null ? "New habit" : "Edit habit"}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Habit name"
              placeholderTextColor="#666"
              value={habitDraft}
              onChangeText={setHabitDraft}
              onSubmitEditing={saveHabit}
              returnKeyType="done"
              autoFocus
            />
            <View style={styles.modalActions}>
              <Pressable style={styles.modalButton} onPress={closeHabitModal}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.modalButtonPrimary]}
                onPress={saveHabit}
              >
                <Text
                  style={[
                    styles.modalButtonText,
                    styles.modalButtonPrimaryText,
                  ]}
                >
                  {editingIndex === null ? "Add" : "Save"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  dayHeader: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    width: 40,
    textAlign: "center",
  },
  habitHeaderCell: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  habitHeaderText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    width: 40,
    textAlign: "center",
  },
  addHabitCell: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  addHabitText: {
    color: "#ffd33d",
    fontSize: 18,
    fontWeight: "bold",
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
  rowCell: {
    width: 40,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  addHabitSpacer: {
    width: 40,
    marginLeft: 6,
  },
  checkText: {
    color: "#ffd33d",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCard: {
    width: "85%",
    backgroundColor: "#2f333b",
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  modalInput: {
    color: "#fff",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    marginLeft: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalButtonPrimary: {
    backgroundColor: "#ffd33d",
    borderColor: "#ffd33d",
  },
  modalButtonPrimaryText: {
    color: "#25292F",
  },
});
