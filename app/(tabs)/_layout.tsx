import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="memories"
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
          backgroundColor: "#25292e",
        },

        headerShadowVisible: false,
        headerTintColor: "#fff",

        tabBarStyle: {
          backgroundColor: "#25292e",
          borderTopColor: "#25292e",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null, // Hide from tab bar
        }}
      />

      <Tabs.Screen
        name="memories"
        options={{
          headerTitle: "Memories",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "journal" : "journal-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="habits"
        options={{
          headerTitle: "Habits",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "checkmark-done" : "checkmark-done-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="sleep"
        options={{
          headerTitle: "Sleep",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "moon" : "moon-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
