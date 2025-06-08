import { View, Text, Image, Pressable, Dimensions } from "react-native";
import { Link } from "expo-router";
import { useDispatch } from "react-redux";
import { startGame } from "../store/slices/gameSlice";
import { Button } from "@/components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { AnimatedCard } from "@/components/common/AnimatedCard";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthModal } from "@/components/AuthModal";

interface UserData {
  userId: string;
  username: string;
  profilePic: string;
}

const { width, height } = Dimensions.get("window");

export default function Home() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem("userData");
      if (data) setUserData(JSON.parse(data));
    } catch (err) {
      console.error("Error loading user data:", err);
    }
  };

  const handleStartGame = () => {
    dispatch(startGame());
  };

  return (
    <View className="flex-1 relative">
      <LinearGradient
        colors={["#F8FAFC", "#F1F5F9", "#E2E8F0"]}
        className="flex-1"
      >
        {/* Profile Button */}
        {userData && (
          <Pressable
            onPress={() => setIsAuthModalVisible(true)}
            className="absolute top-4 right-6 z-10"
          >
            <Image
              source={{ uri: userData.profilePic }}
              className="w-10 h-10 rounded-full border-2 border-uno-primary shadow-lg"
            />
          </Pressable>
        )}

        {/* Decorative Cards */}
        <AnimatedCard
          position={{ top: 100, right: -25 }}
          size={{ width: 48 * 3, height: 48 * 3 }}
          rotation={{ start: "35deg", end: "45deg" }}
          float={{ distance: -12 }}
          duration={{ float: 2200, rotate: 3200 }}
        />

        <AnimatedCard
          position={{ bottom: 120, left: -35 }}
          size={{ width: 52 * 3, height: 52 * 3 }}
          rotation={{ start: "-30deg", end: "-40deg" }}
          float={{ distance: 18 }}
          duration={{ float: 2200, rotate: 3200 }}
        />

        <View className="flex-1 px-6 pt-20 pb-12">
          {/* Hero Section */}
          <View className="items-center flex-1 justify-center">
            {/* Logo Container with Enhanced Neumorphism */}
            <View className="relative mb-20">
              <View className="w-56 h-56 rounded-full bg-slate-50 items-center justify-center shadow-[0_-12px_24px_rgba(255,255,255,1)]">
                <View className="w-52 h-52 rounded-full bg-slate-100 items-center justify-center shadow-[0_8px_16px_rgba(203,213,225,0.4)]">
                  <View className="w-44 h-44 rounded-full bg-gradient-to-br from-red-500 to-yellow-500 items-center justify-center shadow-[0_8px_16px_rgba(239,68,68,0.3)]">
                    <Image
                      source={require("../assets/images/static/uno-logo.png")}
                      className="w-36 h-36"
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </View>

              {/* Floating Elements */}
              <View className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full shadow-[0_4px_8px_rgba(253,224,71,0.3)]" />
              <View className="absolute -bottom-6 -left-6 w-6 h-6 bg-red-400 rounded-full shadow-[0_4px_8px_rgba(248,113,113,0.3)]" />
              <View className="absolute top-8 -left-8 w-4 h-4 bg-blue-400 rounded-full shadow-[0_4px_8px_rgba(96,165,250,0.3)]" />
            </View>

            {/* Brand Typography */}
            <View className="items-center mb-16">
              <Text className="text-8xl font-primary-bold text-slate-800 mb-2 tracking-tight leading-[96px] shadow-[2px_2px_4px_rgba(255,255,255,1)]">
                UNO
              </Text>

              <View className="flex-row items-center mb-8">
                <View className="h-px bg-slate-300 flex-1 mx-4" />
                <Text className="text-slate-500 font-primary-medium text-sm uppercase tracking-widest">
                  Classic Card Game
                </Text>
                <View className="h-px bg-slate-300 flex-1 mx-4" />
              </View>

              {/* Enhanced Description */}
              <View className="bg-white/60 backdrop-blur-sm rounded-2xl px-8 py-6 mx-4 shadow-lg shadow-slate-500/10">
                <Text className="text-slate-700 font-primary-medium text-center text-lg leading-relaxed">
                  Experience the world's favorite card game
                </Text>
                <Text className="text-slate-600 font-primary-regular text-center text-base mt-2">
                  with stunning visuals and smooth gameplay
                </Text>
              </View>
            </View>

            {/* Stats Cards */}
            <View className="flex-row justify-center space-x-8 gap-4 mb-20">
              <View className="bg-white/80 rounded-2xl px-8 py-6 items-center min-w-[100px] shadow-lg shadow-slate-500/10">
                <Text className="text-4xl font-primary-bold text-slate-800">
                  6
                </Text>
                <Text className="text-slate-600 font-primary-medium text-xs uppercase tracking-wide mt-1">
                  Players
                </Text>
              </View>

              <View className="bg-white/80 rounded-2xl px-8 py-6 items-center min-w-[100px] shadow-lg shadow-slate-500/10">
                <Text className="text-4xl font-primary-bold text-slate-800">
                  108
                </Text>
                <Text className="text-slate-600 font-primary-medium text-xs uppercase tracking-wide mt-1">
                  Cards
                </Text>
              </View>

              <View className="bg-white/80 rounded-2xl px-8 py-6 items-center min-w-[100px] shadow-lg shadow-slate-500/10">
                <Text className="text-4xl font-primary-bold text-slate-800">
                  ∞
                </Text>
                <Text className="text-slate-600 font-primary-medium text-xs uppercase tracking-wide mt-1">
                  Fun
                </Text>
              </View>
            </View>
          </View>

          {/* Action Section */}
          <View className="items-center space-y-8">
            <Link href="/(app)/room-selection" asChild>
              <Button
                variant="primary"
                size="lg"
                title="Start Playing"
                onPress={handleStartGame}
                className="w-full max-w-sm"
                icon="rocket1"
              />
            </Link>

            {/* Tagline */}
            <View className="items-center mt-8">
              <Text className="text-slate-500 font-primary-medium text-center text-base">
                Ready to shuffle up some fun?
              </Text>
              <View className="flex-row items-center space-x-3 mt-3">
                <View className="w-2.5 h-2.5 bg-red-400 rounded-full" />
                <View className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                <View className="w-2.5 h-2.5 bg-green-400 rounded-full" />
                <View className="w-2.5 h-2.5 bg-blue-400 rounded-full" />
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Auth Modal - Moved outside LinearGradient */}
      <AuthModal
        isVisible={isAuthModalVisible}
        onComplete={() => {
          setIsAuthModalVisible(false);
          loadUserData();
        }}
      />
    </View>
  );
}
