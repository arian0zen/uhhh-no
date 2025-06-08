import { View, Text, Dimensions, Image, Animated } from "react-native";
import { Link, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthModal } from "@/components/AuthModal";
import { AnimatedCard } from "@/components/common/AnimatedCard";

export default function RoomSelection() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [pendingAction, setPendingAction] = useState<"create" | "join" | null>(
    null
  );

  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const checkUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      setIsCheckingAuth(false);
      if (userData && pendingAction) {
        if (pendingAction === "create") {
          router.replace("/(app)/create-room" as any);
        } else {
          router.replace("/(app)/join-room" as any);
        }
        setPendingAction(null);
      }
    } catch (err) {
      console.error("Error checking user data:", err);
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkUserData();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  const handleCreateRoom = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (!userData) {
      setPendingAction("create");
      setShowAuthModal(true);
      return;
    }
    router.replace("/(app)/create-room" as any);
  };

  const handleJoinRoom = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (!userData) {
      setPendingAction("join");
      setShowAuthModal(true);
      return;
    }
    router.replace("/(app)/join-room" as any);
  };

  const handleAuthComplete = () => {
    setShowAuthModal(false);
    checkUserData();
  };

  if (isCheckingAuth) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F8FAFC]">
        <Text className="text-slate-600 font-primary-medium">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#F8FAFC", "#F1F5F9", "#E2E8F0"]}
        className="flex-1"
      >
        <View className="flex-1 px-6 pt-20 pb-12">
          {/* Decorative Cards */}

          <AnimatedCard
            position={{ top: 100, right: -25 }}
            size={{ width: 48 * 3, height: 48 * 3 }}
            rotation={{ start: "35deg", end: "45deg" }}
            float={{ distance: -12 }}
            duration={{ float: 2200, rotate: 3200 }}
          />
          <AnimatedCard
            position={{ bottom: 150, left: -30 }}
            size={{ width: 52 * 3, height: 52 * 3 }}
            rotation={{ start: "-25deg", end: "-35deg" }}
            float={{ distance: 15 }}
            duration={{ float: 2200, rotate: 3200 }}
          />

          {/* Header Section */}
          <View className="items-center mb-16">
            <Text className="text-6xl font-primary-extrabold text-slate-800 mb-4 tracking-tight text-center drop-shadow-sm">
              Game Room
            </Text>

            <View className="flex-row items-center mb-6 w-full">
              <View className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
              <Text className="text-slate-500 font-primary-medium text-sm uppercase tracking-widest px-4 text-center">
                Choose Your Adventure
              </Text>
              <View className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            </View>

            <Text className="text-slate-600 font-primary-regular text-center text-base max-w-sm">
              Create your own game room or join friends for an exciting UNO
              match
            </Text>
          </View>

          {/* Card Stack Visual with Animation */}
          <View className="items-center mb-16">
            <Animated.View
              className="relative shadow-[0_8px_16px_rgba(203,213,225,0.4)]"
              style={{
                transform: [
                  {
                    translateY: floatAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -8],
                    }),
                  },
                ],
              }}
            >
              {/* Stack of Cards Effect */}
              <Animated.View
                className="absolute w-24 h-36 bg-slate-200 rounded-lg opacity-30 top-6 -left-4 shadow-lg"
                style={{
                  transform: [
                    {
                      rotate: rotateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["-20deg", "-25deg"],
                      }),
                    },
                  ],
                }}
              />
              <Animated.View
                className="absolute w-24 h-36 bg-slate-300 rounded-lg opacity-50 top-3 -left-2 shadow-xl"
                style={{
                  transform: [
                    {
                      rotate: rotateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["-10deg", "-15deg"],
                      }),
                    },
                  ],
                }}
              />
              <Animated.View
                className="absolute w-24 h-36 bg-slate-400 rounded-lg opacity-70 top-1 left-2 shadow-2xl"
                style={{
                  transform: [
                    {
                      rotate: rotateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["5deg", "8deg"],
                      }),
                    },
                  ],
                }}
              />

              {/* Main Card */}
              <Animated.View
                className="w-24 h-36 rounded-lg overflow-hidden border border-white/50 shadow-2xl"
                style={{
                  transform: [
                    {
                      rotate: rotateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["2deg", "4deg"],
                      }),
                    },
                    {
                      scale: scaleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.05],
                      }),
                    },
                  ],
                }}
              >
                <Image
                  source={require("@/assets/images/card-images/backside.png")}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </Animated.View>

              {/* Floating Accent Dots */}
              <View className="absolute -top-2 -right-2 w-3 h-3 bg-red-400 rounded-full shadow-md shadow-red-400/50" />
              <View className="absolute -bottom-3 -left-3 w-2 h-2 bg-yellow-400 rounded-full shadow-md shadow-yellow-400/50" />
            </Animated.View>
          </View>

          {/* Action Card */}
          <View className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-lg">
            <View className="flex-row items-center justify-center mb-6">
              <View className="flex-1">
                <Text className="text-xl font-primary-bold text-slate-800 mb-1 text-center">
                  Ready to Play?
                </Text>
                <Text className="text-slate-600 font-primary-medium text-sm text-center">
                  Start a new game or join your friends in an existing one
                </Text>
              </View>
            </View>

            <View className="flex flex-col gap-4">
              <Button
                variant="primary"
                size="lg"
                title="Create New Room"
                className="w-full shadow-lg shadow-blue-500/30"
                icon="plus"
                onPress={handleCreateRoom}
              />

              <Button
                variant="outline"
                size="lg"
                title="Join Existing Room"
                className="w-full shadow-md shadow-slate-200/50"
                icon="team"
                onPress={handleJoinRoom}
              />
            </View>
          </View>

          {/* Bottom Indicator */}
          <View className="items-center mt-12">
            <View className="flex-row items-center space-x-2">
              <View className="w-2 h-2 bg-blue-400 rounded-full shadow-sm" />
              <View className="w-8 h-1 bg-slate-300 rounded-full" />
              <View className="w-2 h-2 bg-green-400 rounded-full shadow-sm" />
            </View>
            <Text className="text-slate-500 font-primary-medium text-sm mt-3 text-center">
              Let's get started!
            </Text>
          </View>
        </View>
      </LinearGradient>

      <AuthModal isVisible={showAuthModal} onComplete={handleAuthComplete} />
    </View>
  );
}
