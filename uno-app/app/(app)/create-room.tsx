import {
  View,
  Text,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Pressable,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useState, useRef, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedCard } from "@/components/common/AnimatedCard";
import Slider from "@react-native-community/slider";

export default function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [roomCode, setRoomCode] = useState("");

  const floatAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Generate room code on component mount
    const generateRoomCode = () => {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      setRoomCode(code);
    };
    generateRoomCode();

    // Subtle floating animation for decorative elements
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Pulse animation for status indicator
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      setError("Please enter a room name to continue");
      return;
    }

    if (roomName.trim().length < 3) {
      setError("Room name must be at least 3 characters long");
      return;
    }

    setIsCreating(true);

    try {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        router.replace("/" as any);
        return;
      }

      const user = JSON.parse(userData);
      // Simulate room creation with proper feedback
      setTimeout(() => {
        const roomData = {
          id: Math.random().toString(36).substring(7),
          name: roomName,
          maxPlayers: maxPlayers,
          host: user,
          players: [user],
          status: "waiting",
        };

        router.replace(`/(app)/game/${roomData.id}` as any);
      }, 1500);
    } catch (err) {
      console.error("Error creating room:", err);
      setError("Unable to create room. Please try again.");
      setIsCreating(false);
    }
  };

  const getPlayerDescription = () => {
    if (maxPlayers <= 4) return "Small & Intimate";
    if (maxPlayers <= 6) return "Perfect Balance";
    if (maxPlayers <= 8) return "Large Group";
    return "Epic Party";
  };

  return (
    <View className="flex-1 bg-slate-50">
      {/* Subtle background with minimal gradient */}
      <View className="absolute inset-0">
        <LinearGradient
          colors={["#f8fafc", "#f1f5f9", "#e2e8f0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-1"
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Minimal decorative elements */}
        <Animated.View
          style={{
            position: "absolute",
            top: 80,
            right: -20,
            transform: [
              {
                translateY: floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -10],
                }),
              },
            ],
          }}
        >
          <View className="w-32 h-32 bg-indigo-100 rounded-3xl opacity-30 rotate-12" />
        </Animated.View>

        <Animated.View
          style={{
            position: "absolute",
            bottom: 120,
            left: -15,
            transform: [
              {
                translateY: floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 10],
                }),
              },
            ],
          }}
        >
          <View className="w-24 h-24 bg-purple-100 rounded-2xl opacity-40 -rotate-12" />
        </Animated.View>

        {/* Enhanced Status Indicator */}
        <View className="absolute top-8 left-6 right-6 z-10">
          <View className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 self-center shadow-lg shadow-black/5 border border-white/20">
            <View className="flex-row items-center gap-3">
              <Animated.View
                style={{
                  transform: [{ scale: pulseAnim }],
                }}
              >
                <View
                  className={`w-3 h-3 rounded-full ${
                    isCreating
                      ? "bg-amber-400 shadow-lg shadow-amber-400/40"
                      : "bg-emerald-500 shadow-lg shadow-emerald-500/40"
                  }`}
                />
              </Animated.View>
              <Text className="text-slate-700 font-primary-semibold text-base">
                {isCreating ? "Setting up your room..." : "Ready to create"}
              </Text>
            </View>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingTop: 80,
            paddingBottom: 120, // Add padding for the sticky button
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-6">
            {/* Enhanced Header Section */}
            <View className="mb-10">
              <Text className="text-4xl font-primary-extrabold text-slate-900 mb-3 tracking-tight text-center">
                Create Your Room
              </Text>
              <Text className="text-slate-600 font-primary-medium text-center text-lg leading-6 max-w-sm mx-auto">
                Set up a personalized game space and invite your friends to join
                the fun
              </Text>
            </View>

            {/* Enhanced Room Setup Form */}
            <View className="bg-white rounded-3xl p-7 shadow-xl shadow-black/8 border border-slate-100 mb-8">
              <View className="mb-8">
                <Input
                  label="Room Name"
                  placeholder="Enter something creative..."
                  value={roomName}
                  onChangeText={(text) => {
                    setRoomName(text);
                    setError("");
                  }}
                  error={error}
                />
              </View>

              {/* Enhanced Slider Section */}
              <View className="space-y-6">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-slate-800 font-primary-bold text-lg mb-1">
                      Maximum Players
                    </Text>
                    <Text className="text-slate-500 font-primary-medium text-sm">
                      {getPlayerDescription()}
                    </Text>
                  </View>
                  <View className="bg-indigo-600 px-5 py-3 rounded-2xl shadow-lg shadow-indigo-600/25">
                    <Text className="text-white font-primary-extrabold text-2xl">
                      {maxPlayers}
                    </Text>
                  </View>
                </View>

                {/* Custom Enhanced Slider */}
                <View className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                  <Slider
                    style={{
                      width: "100%",
                      height: 40,
                    }}
                    minimumValue={3}
                    maximumValue={10}
                    step={1}
                    value={maxPlayers}
                    onValueChange={setMaxPlayers}
                    minimumTrackTintColor="#4f46e5"
                    maximumTrackTintColor="#cbd5e1"
                    thumbTintColor="#4f46e5"
                  />

                  <View className="flex-row justify-between items-center px-2 mt-1">
                    <View className="items-center">
                      <Text className="text-slate-400 font-primary-semibold text-xs">
                        3
                      </Text>
                    </View>
                    <View className="items-center">
                      <Text className="text-slate-400 font-primary-semibold text-xs">
                        10
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Enhanced Room Preview */}
            <View className="bg-white rounded-3xl p-7 shadow-xl shadow-black/8 border border-slate-100 mb-8">
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-slate-900 font-primary-extrabold text-xl">
                  Room Preview
                </Text>
                <View className="w-4 h-4 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/40" />
              </View>

              <View className="space-y-4">
                {/* Room Name Card */}
                <View className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1 mr-4">
                      <Text className="text-indigo-600 font-primary-bold text-sm mb-2 uppercase tracking-wide">
                        Room Name
                      </Text>
                      <Text
                        className="text-slate-900 font-primary-extrabold text-xl"
                        numberOfLines={1}
                      >
                        {roomName || "Unnamed Room"}
                      </Text>
                    </View>
                    <View className="w-14 h-14 bg-indigo-600 rounded-2xl items-center justify-center shadow-lg shadow-indigo-600/30">
                      <Ionicons name="home" size={26} color="white" />
                    </View>
                  </View>
                </View>

                {/* Room Code Card */}
                <View className="bg-purple-50 rounded-2xl p-5 border border-purple-100">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1 mr-4">
                      <Text className="text-purple-600 font-primary-bold text-sm mb-2 uppercase tracking-wide">
                        Room Code
                      </Text>
                      <Text className="text-slate-900 font-primary-extrabold text-2xl tracking-widest">
                        {roomCode}
                      </Text>
                    </View>
                    <View className="w-14 h-14 bg-purple-600 rounded-2xl items-center justify-center shadow-lg shadow-purple-600/30">
                      <Ionicons name="key" size={26} color="white" />
                    </View>
                  </View>
                </View>

                {/* Players Card */}
                <View className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1 mr-4">
                      <Text className="text-emerald-600 font-primary-bold text-sm mb-2 uppercase tracking-wide">
                        Players
                      </Text>
                      <Text className="text-slate-900 font-primary-extrabold text-xl mb-3">
                        1 of {maxPlayers} joined
                      </Text>

                      {/* Enhanced Player Dots */}
                      <View className="flex-row gap-2">
                        {[...Array(Math.min(maxPlayers, 8))].map((_, index) => (
                          <View
                            key={index}
                            className={`w-3 h-3 rounded-full ${
                              index === 0
                                ? "bg-emerald-500 shadow-sm shadow-emerald-500/50"
                                : "bg-slate-200 border border-slate-300"
                            }`}
                          />
                        ))}
                        {maxPlayers > 8 && (
                          <Text className="text-slate-400 font-primary-medium text-sm ml-2">
                            +{maxPlayers - 8} more
                          </Text>
                        )}
                      </View>
                    </View>
                    <View className="w-14 h-14 bg-emerald-600 rounded-2xl items-center justify-center shadow-lg shadow-emerald-600/30">
                      <Ionicons name="people" size={26} color="white" />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Sticky Bottom Button */}
        <View className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-slate-200 px-6 py-4">
          <Button
            variant="primary"
            size="lg"
            title={isCreating ? "Creating your room..." : "Create Room & Start"}
            className="w-full shadow-2xl shadow-indigo-600/25 bg-indigo-600 py-5"
            icon="rocket1"
            onPress={handleCreateRoom}
            disabled={isCreating}
          />

          {!isCreating && (
            <Text className="text-slate-500 font-primary-medium text-center text-sm mt-3">
              You'll be the room host and can manage settings
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
