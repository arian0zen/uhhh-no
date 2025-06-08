import { Stack, router } from "expo-router";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCallback } from "react";
import * as Haptics from "expo-haptics";

export default function AppLayout() {
  const handleBackPress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace("/(app)/room-selection");
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#F8FAFC",
        },
        headerTintColor: "#3B82F6", // blue-500 (primary color)
        headerTitleStyle: {
          fontFamily: "primary-bold",
          fontSize: 18,
        },
        headerShadowVisible: false,
        headerTitle: "", // Remove all titles
      }}
    >
      <Stack.Screen
        name="room-selection"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="create-room"
        options={{
          headerLeft: () => (
            <Pressable
              onPress={handleBackPress}
              hitSlop={150}
              style={({ pressed }) => ({
                marginLeft: 16,
                padding: 8,
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: pressed ? "#64748B" : "#94A3B8", // slate-500/400
                opacity: pressed ? 0.8 : 1,
                elevation: 2,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                alignItems: "center",
                justifyContent: "center",
              })}
            >
              <Ionicons
                name="arrow-back"
                size={36}
                color={"#4F46E5"}
                className="ml-2"
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="join-room"
        options={{
          headerLeft: () => (
            <Pressable
              onPress={handleBackPress}
              hitSlop={150}
              style={({ pressed }) => ({
                marginLeft: 16,
                padding: 8,
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: pressed ? "#64748B" : "#94A3B8", // slate-500/400
                opacity: pressed ? 0.8 : 1,
                elevation: 2,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                alignItems: "center",
                justifyContent: "center",
              })}
            >
              <Ionicons
                name="arrow-back"
                size={36}
                color="#4F46E5"
                className="ml-2"
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="game"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
