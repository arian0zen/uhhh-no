import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
  TextInput,
  TouchableOpacity,
  Pressable,
  Keyboard,
  Image,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@/components/Button";
import { router } from "expo-router";
import { AnimatedCard } from "@/components/common/AnimatedCard";

interface JoinRoomProps {}

interface DigitInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onFocus: () => void;
  onBackspace: () => void;
  isActive: boolean;
  index: number;
  setActiveIndex: (index: number) => void;
}

const DigitInput: React.FC<DigitInputProps> = ({
  value,
  onChangeText,
  onFocus,
  onBackspace,
  isActive,
  index,
  setActiveIndex,
}) => {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (isActive) {
      inputRef.current?.focus();
    }
  }, [isActive]);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        inputRef.current?.blur();
        setActiveIndex(-1);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleKeyPress = ({ nativeEvent }: any) => {
    if (nativeEvent.key === "Backspace" && !value) {
      onBackspace();
    }
  };

  const handleChangeText = (text: string) => {
    onChangeText(text);
    if (text && index === 5) {
      inputRef.current?.blur();
      setActiveIndex(-1);
    }
  };

  return (
    <View
      className={`w-12 h-16 rounded-2xl border-2 ${
        isActive
          ? "border-indigo-500 bg-indigo-50/80 shadow-lg shadow-indigo-500/15"
          : value
          ? "border-emerald-400 bg-emerald-50/60 shadow-sm shadow-emerald-500/10"
          : "border-slate-200 bg-white/90 shadow-sm shadow-slate-500/5"
      } items-center justify-center`}
    >
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChangeText}
        onFocus={onFocus}
        onKeyPress={handleKeyPress}
        maxLength={1}
        autoCapitalize="characters"
        autoCorrect={false}
        keyboardType="ascii-capable"
        textAlign="center"
        className={`text-2xl font-primary-extrabold tracking-wider ${
          isActive
            ? "text-indigo-700"
            : value
            ? "text-emerald-700"
            : "text-slate-400"
        } w-full h-full`}
        placeholder=""
        placeholderTextColor="transparent"
        selection={{ start: value.length, end: value.length }}
      />
    </View>
  );
};

const JoinRoom: React.FC<JoinRoomProps> = () => {
  const [roomCode, setRoomCode] = useState<string[]>(Array(6).fill(""));
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        router.replace("/(app)/room-selection");
        return true;
      }
    );

    return () => backHandler.remove();
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
      ])
    ).start();
  }, []);

  const handleDigitChange = (text: string, index: number) => {
    const upperText = text.toUpperCase();
    const newRoomCode = [...roomCode];
    newRoomCode[index] = upperText;
    setRoomCode(newRoomCode);
    setError("");

    if (upperText && index < 5) {
      setActiveIndex(index + 1);
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0) {
      setActiveIndex(index - 1);
    }
  };

  const handleJoinRoom = async () => {
    const code = roomCode.join("");
    if (code.length !== 6) {
      setError("Please enter all 6 characters");
      return;
    }

    setIsConnecting(true);

    // Simulate connection delay
    setTimeout(() => {
      setIsConnecting(false);
      router.push(`/(game)/${code}` as any);
    }, 1500);
  };

  const clearCode = () => {
    setRoomCode(Array(6).fill(""));
    setActiveIndex(0);
    setError("");
  };

  const isCodeComplete = roomCode.every((digit) => digit !== "");
  const filledDigits = roomCode.filter((digit) => digit !== "").length;

  return (
    <View className="flex-1 bg-slate-50">
      <LinearGradient colors={["#FAFBFC", "#F1F5F9"]} className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          {/* Decorative Cards */}
          <AnimatedCard
            position={{ bottom: -50, right: -30 }}
            size={{ width: 64 * 3, height: 64 * 3 }}
            rotation={{ start: "25deg", end: "35deg" }}
            float={{ distance: -20 }}
            duration={{ float: 2000, rotate: 3000 }}
          />

          <AnimatedCard
            position={{ top: 100, left: -40 }}
            size={{ width: 48 * 3, height: 48 * 3 }}
            rotation={{ start: "-15deg", end: "-25deg" }}
            float={{ distance: 15 }}
            duration={{ float: 2000, rotate: 3000 }}
          />

          <View className="flex-1 px-6 py-8">
            {/* Header Section */}
            <View className="items-center mb-8">
              <View className="mb-6">
                <Text className="text-4xl font-primary-extrabold text-slate-800 text-center mb-2 tracking-tighter">
                  Join Room
                </Text>
                <Text className="text-slate-500 text-center text-base font-primary-medium">
                  Enter your friend's room code below
                </Text>
              </View>

              {/* Floating Connection Orb */}
              <View className="items-center">
                <View
                  className={`w-16 h-16 rounded-full items-center justify-center ${
                    isCodeComplete
                      ? "bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-2xl shadow-emerald-500/85"
                      : "bg-gradient-to-br from-slate-200 to-slate-300 shadow-lg shadow-slate-500/10"
                  }`}
                >
                  <View
                    className={`w-8 h-8 rounded-full ${
                      isCodeComplete ? "bg-white" : "bg-slate-400"
                    }`}
                  />
                  <View
                    className={`absolute w-4 h-4 rounded-full ${
                      isCodeComplete ? "bg-emerald-500" : "bg-slate-500"
                    }`}
                  />
                </View>
              </View>
            </View>

            {/* Input Section */}
            <View className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 border border-white/70 mb-6 shadow-2xl shadow-slate-500/10">
              <View className="items-center mb-8">
                <Text className="text-xl font-primary-bold text-slate-800 mb-2">
                  Room Code
                </Text>
                <Text className="text-slate-500 text-center text-sm font-primary-medium">
                  Enter 6-character alphanumeric code
                </Text>
              </View>

              {/* 6-Digit Input */}
              <View className="flex-row justify-center mb-6 space-x-3 gap-2">
                {roomCode.map((digit, index) => (
                  <DigitInput
                    key={index}
                    value={digit}
                    onChangeText={(text) => handleDigitChange(text, index)}
                    onFocus={() => setActiveIndex(index)}
                    onBackspace={() => handleBackspace(index)}
                    isActive={activeIndex === index}
                    setActiveIndex={setActiveIndex}
                    index={index}
                  />
                ))}
              </View>

              {/* Error Message */}
              {error ? (
                <View className="mb-6">
                  <View className="bg-red-50 border border-red-200 rounded-xl p-3">
                    <Text className="text-red-600 text-center text-sm font-primary-medium">
                      {error}
                    </Text>
                  </View>
                </View>
              ) : null}

              {/* Action Buttons */}
              <View className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  title={isConnecting ? "Connecting..." : "Join Game"}
                  className="w-full"
                  onPress={handleJoinRoom}
                  disabled={!isCodeComplete || isConnecting}
                />

                {filledDigits > 0 && (
                  <TouchableOpacity
                    onPress={clearCode}
                    className="py-3"
                    activeOpacity={0.7}
                  >
                    <Text className="text-slate-500 text-center text-sm font-primary-medium">
                      Clear Code
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
};

export default JoinRoom;
