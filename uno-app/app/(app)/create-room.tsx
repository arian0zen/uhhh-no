import {
  View,
  Text,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedCard } from "@/components/common/AnimatedCard";

export default function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("4");
  const [error, setError] = useState("");

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      setError("Room name is required");
      return;
    }

    try {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        router.replace("/" as any);
        return;
      }

      const user = JSON.parse(userData);
      // Here you would typically make an API call to create the room
      // For now, we'll just simulate it
      const roomData = {
        id: Math.random().toString(36).substring(7),
        name: roomName,
        maxPlayers: parseInt(maxPlayers),
        host: user,
        players: [user],
        status: "waiting",
      };

      // Navigate to the game room (you'll need to create this page)
      router.replace(`/(app)/game/${roomData.id}` as any);
    } catch (err) {
      console.error("Error creating room:", err);
      setError("Failed to create room");
    }
  };

  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#F8FAFC", "#F1F5F9", "#E2E8F0"]}
        className="flex-1"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          {/* Decorative Cards */}
          <AnimatedCard
            position={{ top: 80, right: -40 }}
            size={{ width: 56 * 3, height: 56 * 3 }}
            rotation={{ start: "-20deg", end: "-30deg" }}
            float={{ distance: -15 }}
            duration={{ float: 2500, rotate: 3500 }}
          />

          <AnimatedCard
            position={{ bottom: 100, left: -30 }}
            size={{ width: 48 * 3, height: 48 * 3 }}
            rotation={{ start: "15deg", end: "25deg" }}
            float={{ distance: 20 }}
            duration={{ float: 2500, rotate: 3500 }}
          />

          <View className="flex-1 px-6 pt-20 pb-12">
            {/* Header Section */}
            <View className="items-center mb-12">
              <Text className="text-5xl font-primary-extrabold text-slate-800 mb-4 tracking-tight text-center drop-shadow-sm">
                Create Room
              </Text>

              <View className="flex-row items-center mb-6 w-full">
                <View className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                <Text className="text-slate-500 font-primary-medium text-sm uppercase tracking-widest px-4 text-center">
                  Game Setup
                </Text>
                <View className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
              </View>

              <Text className="text-slate-600 font-primary-regular text-center text-base max-w-sm">
                Set up your game room and invite friends to join
              </Text>
            </View>

            {/* Room Setup Form */}
            <View className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-lg mb-8">
              <View className="space-y-6">
                <Input
                  label="Room Name"
                  placeholder="Enter a name for your room"
                  value={roomName}
                  onChangeText={(text) => {
                    setRoomName(text);
                    setError("");
                  }}
                  error={error}
                />

                <Input
                  label="Max Players"
                  placeholder="Number of players (2-6)"
                  value={maxPlayers}
                  onChangeText={setMaxPlayers}
                  keyboardType="number-pad"
                  maxLength={1}
                />

                <View className="pt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    title="Create Room"
                    className="w-full shadow-lg shadow-blue-500/30"
                    icon="rocket1"
                    onPress={handleCreateRoom}
                  />
                </View>
              </View>
            </View>

            {/* Room Preview */}
            <View className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-lg">
              <Text className="text-slate-800 font-primary-bold text-lg mb-4">
                Room Preview
              </Text>

              <View className="space-y-4">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
                    <Ionicons name="home" size={20} color="#3B82F6" />
                  </View>
                  <View className="ml-4">
                    <Text className="text-slate-600 font-primary-medium text-sm">
                      Room Name
                    </Text>
                    <Text className="text-slate-800 font-primary-bold">
                      {roomName || "Your Room Name"}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center">
                    <Ionicons name="people" size={20} color="#22C55E" />
                  </View>
                  <View className="ml-4">
                    <Text className="text-slate-600 font-primary-medium text-sm">
                      Players
                    </Text>
                    <Text className="text-slate-800 font-primary-bold">
                      0/{maxPlayers} Players
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Back Button */}
            <View className="mt-auto">
              <Button
                variant="outline"
                size="lg"
                title="Back"
                className="w-full"
                icon="arrowleft"
                onPress={() => router.back()}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}
