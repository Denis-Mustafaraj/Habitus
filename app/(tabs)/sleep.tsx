import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

// SleepChart component handles the right-side visualization
function SleepChart({
  sleepData,
  daysInMonth,
}: {
  sleepData: Record<number, number>;
  daysInMonth: number;
}) {
  const chartWidth = 150;
  const rowHeight = 50; // Must match dayRow height (35) + marginBottom (15)
  const maxHours = 10;
  const columnWidth = chartWidth / maxHours;
  const dotRadius = 4;

  // Calculate position for a data point
  const getPosition = (day: number, hours: number) => {
    const dayIndex = day - 1;
    const x = (hours - 0.5) * columnWidth;
    const y = dayIndex * rowHeight + rowHeight / 2;
    return { x, y };
  };

  // Get consecutive days with values for line rendering
  const getLines = useMemo(() => {
    const lines: Array<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      key: string;
    }> = [];

    const daysWithValues = Object.keys(sleepData)
      .map((d) => parseInt(d))
      .sort((a, b) => a - b);

    for (let i = 0; i < daysWithValues.length - 1; i++) {
      const day1 = daysWithValues[i];
      const day2 = daysWithValues[i + 1];

      // Only connect if consecutive
      if (day2 - day1 === 1) {
        const pos1 = getPosition(day1, sleepData[day1]);
        const pos2 = getPosition(day2, sleepData[day2]);

        lines.push({
          x1: pos1.x,
          y1: pos1.y,
          x2: pos2.x,
          y2: pos2.y,
          key: `line-${day1}-${day2}`,
        });
      }
    }

    return lines;
  }, [sleepData]);

  // Render a line with rotation
  const renderLine = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    key: string,
  ) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    return (
      <View
        key={key}
        style={[
          styles.line,
          {
            width: length,
            left: x1,
            top: y1,
            transform: [{ rotate: `${angle}deg` }],
            transformOrigin: "0 0",
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.chartContainer}>
      {/* Hour numbers at the top (1-10) */}
      <View style={styles.hoursHeader}>
        {Array.from({ length: maxHours }, (_, i) => (
          <Text key={i + 1} style={styles.hourNumber}>
            {i + 1}
          </Text>
        ))}
      </View>

      {/* Chart area with dots and lines */}
      <View
        style={[
          styles.chartArea,
          { width: chartWidth, height: daysInMonth * rowHeight },
        ]}
      >
        {/* Render lines */}
        {getLines.map((line) =>
          renderLine(line.x1, line.y1, line.x2, line.y2, line.key),
        )}

        {/* Render dots */}
        {Object.entries(sleepData).map(([dayStr, hours]) => {
          if (!hours || hours > maxHours) return null;

          const day = parseInt(dayStr);
          const pos = getPosition(day, hours);

          return (
            <View
              key={`dot-${day}`}
              style={[
                styles.dot,
                {
                  left: pos.x - dotRadius,
                  top: pos.y - dotRadius,
                  width: dotRadius * 2,
                  height: dotRadius * 2,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

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
    if (numericText === "") {
      setSleepData((prev) => {
        const newData = { ...prev };
        delete newData[day];
        return newData;
      });
    } else {
      const hours = parseInt(numericText);
      if (hours > 0 && hours <= 10) {
        setSleepData((prev) => ({ ...prev, [day]: hours }));
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.monthTitle}>{currentMonth}</Text>

      <ScrollView style={styles.mainWrapper}>
        <View style={styles.contentWrapper}>
          {/* Left side: Days list */}
          <View style={styles.leftSection}>
            {/* Header */}
            <View style={styles.headerRow}>
              <Text style={styles.dayHeader}>Day</Text>
              <Text style={styles.hoursHeaderLeft}>Hours</Text>
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
          </View>

          {/* Right side: Chart */}
          <View style={styles.rightSection}>
            <SleepChart sleepData={sleepData} daysInMonth={daysInMonth} />
          </View>
        </View>
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
  mainWrapper: {
    flex: 1,
  },
  contentWrapper: {
    flexDirection: "row",
    paddingHorizontal: 10,
    gap: 10,
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    paddingRight: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dayHeader: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    width: 30,
    textAlign: "center",
  },
  hoursHeaderLeft: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    flex: 1,
    marginLeft: 8,
  },
  dayRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    height: 35,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    paddingBottom: 10,
  },
  dayNumber: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    width: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#2f333b",
    color: "#fff",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 12,
    marginLeft: 8,
  },
  chartContainer: {
    alignItems: "center",
  },
  hoursHeader: {
    flexDirection: "row",
    height: 15,
    alignItems: "center",
    justifyContent: "space-around",
    width: 150,
  },
  hourNumber: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
    paddingBottom: 10,
  },
  chartArea: {
    position: "relative",
  },
  line: {
    position: "absolute",
    height: 1,
    backgroundColor: "#fff",
  },
  dot: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 6,
  },
});
