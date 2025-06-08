import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  Animated,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from "react-native";
import { Input } from "./Input";
import { Button } from "./Button";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import * as Haptics from "expo-haptics";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { AnimatedCard } from "./common/AnimatedCard";

/**
 * Props for the AuthModal component
 * @interface AuthModalProps
 * @property {boolean} isVisible - Controls the visibility of the modal
 * @property {() => void} onComplete - Callback function called when modal is dismissed or auth is completed
 */
interface AuthModalProps {
  isVisible: boolean;
  onComplete: () => void;
}

/**
 * AuthModal Component
 *
 * A bottom sheet modal for user authentication that includes:
 * - Username input
 * - Randomized avatar selection
 * - Gesture-based dismissal
 * - Haptic feedback
 * - Backdrop interaction
 * - Android back button handling
 *
 * @component
 */
export const AuthModal = ({ isVisible, onComplete }: AuthModalProps) => {
  // State management for form and animations
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [avatarSeed, setAvatarSeed] = useState(() => Math.random().toString());

  // Animation values for modal position and backdrop opacity
  const translateY = useState(new Animated.Value(1000))[0];
  const backdropOpacity = useState(new Animated.Value(0))[0];

  const cardFloatAnim = useRef(new Animated.Value(0)).current;
  const cardRotateAnim = useRef(new Animated.Value(0)).current;

  /**
   * Handles modal visibility animations
   * Animates both the modal position and backdrop opacity in parallel
   */
  useEffect(() => {
    const animations = [
      Animated.spring(translateY, {
        toValue: isVisible ? 0 : 1000,
        useNativeDriver: true,
        damping: 20,
        stiffness: 90,
      }),
      Animated.timing(backdropOpacity, {
        toValue: isVisible ? 0.5 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ];

    Animated.parallel(animations).start();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(cardFloatAnim, {
              toValue: 1,
              duration: 2300,
              useNativeDriver: true,
            }),
            Animated.timing(cardFloatAnim, {
              toValue: 0,
              duration: 2300,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(cardRotateAnim, {
              toValue: 1,
              duration: 3300,
              useNativeDriver: true,
            }),
            Animated.timing(cardRotateAnim, {
              toValue: 0,
              duration: 3300,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    }
  }, [isVisible]);

  /**
   * Handles Android back button press
   * Dismisses the modal when back button is pressed if modal is visible
   */
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isVisible) {
          onComplete();
          return true; // Prevents default back action
        }
        return false; // Allows default back action
      }
    );

    return () => backHandler.remove();
  }, [isVisible]);

  /**
   * Handles ongoing pan gesture
   * Updates modal position and backdrop opacity based on drag distance
   * Provides haptic feedback during drag
   */
  const onGestureEvent = ({ nativeEvent }: any) => {
    if (nativeEvent.translationY > 0) {
      translateY.setValue(nativeEvent.translationY);
      // Fade out backdrop proportionally to drag distance
      const newOpacity = Math.max(0, 0.5 - nativeEvent.translationY / 1000);
      backdropOpacity.setValue(newOpacity);

      // Light haptic feedback every 50px of drag
      if (nativeEvent.translationY % 50 < 2) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  };

  /**
   * Handles the end of pan gesture
   * Determines whether to dismiss or restore the modal based on:
   * - Distance dragged (translationY)
   * - Velocity of the gesture (velocityY)
   */
  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === 5) {
      // END state
      const { translationY, velocityY } = event.nativeEvent;

      if (translationY > 100 || velocityY > 500) {
        // Dismiss if dragged far enough or flicked fast enough
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 1000,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(backdropOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => onComplete());
      } else {
        // Restore to original position if not dragged far enough
        Animated.parallel([
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            damping: 20,
            stiffness: 90,
          }),
          Animated.timing(backdropOpacity, {
            toValue: 0.5,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }
  };

  /**
   * Handles backdrop press
   * Dismisses the modal with animation and haptic feedback
   */
  const handleBackdropPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 1000,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onComplete());
  };

  /**
   * Generates a new random avatar
   * Provides haptic feedback when avatar is regenerated
   */
  const regenerateAvatar = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setAvatarSeed(Math.random().toString());
  }, []);

  /**
   * Handles form submission
   * Validates input and saves user data to AsyncStorage
   */
  const handleSave = async () => {
    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    try {
      const userId = uuidv4();
      const userData = {
        userId,
        username: username.trim(),
        profilePic: `https://api.dicebear.com/7.x/personas/png?seed=${avatarSeed}`,
      };

      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      onComplete();
    } catch (err) {
      console.error("Error saving user data:", err);
      setError("Failed to save user data");
    }
  };

  return (
    <>
      {/* Semi-transparent backdrop */}
      <Animated.View
        style={{
          opacity: backdropOpacity,
          backgroundColor: "black",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
        }}
        pointerEvents={isVisible ? "auto" : "none"}
      >
        <Pressable style={{ flex: 1 }} onPress={handleBackdropPress} />
      </Animated.View>

      {/* Modal Content */}
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={[
            {
              transform: [{ translateY }],
              zIndex: 51,
            },
          ]}
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl h-3/4"
        >
          {/* Decorative Cards */}
          {/* <AnimatedCard
            position={{ top: -60, right: -20 }}
            size={{ width: 40 * 3, height: 40 * 3 }}
            rotation={{ start: "25deg", end: "35deg" }}
            float={{ distance: -15 }}
            duration={{ float: 2300, rotate: 3300 }}
          /> */}

          <AnimatedCard
            position={{ bottom: -60, left: -25 }}
            size={{ width: 36 * 6, height: 36 * 6 }}
            rotation={{ start: "-20deg", end: "-30deg" }}
            float={{ distance: 12 }}
            duration={{ float: 2300, rotate: 3300 }}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
          >
            <View className="flex-1 p-6">
              {/* Header Section */}
              <View className="items-center">
                <View className="w-12 h-1 bg-slate-200 rounded-full mb-6" />
                <Text className="text-2xl font-primary-bold text-uno-text-primary mb-2">
                  Create Your Profile
                </Text>
                <Text className="text-uno-text-secondary font-primary-semibold text-center mb-8">
                  Choose a username and your avatar to get started
                </Text>
              </View>

              {/* Avatar Section */}
              <View className="items-center">
                <View className="relative">
                  <Image
                    source={{
                      uri: `https://api.dicebear.com/7.x/personas/png?seed=${avatarSeed}`,
                    }}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                  />
                  <Pressable
                    onPress={regenerateAvatar}
                    className="absolute -bottom-1 -right-1 bg-uno-primary w-8 h-8 rounded-full items-center justify-center shadow-lg"
                  >
                    <Ionicons name="refresh" size={16} color="white" />
                  </Pressable>
                </View>
              </View>

              {/* Form Section */}
              <View className="justify-center mt-8">
                <Input
                  label="Username"
                  placeholder="Enter your username"
                  value={username}
                  onChangeText={(text) => {
                    setUsername(text);
                    setError("");
                  }}
                  error={error}
                  autoCapitalize="none"
                  containerClassName="mb-6"
                />

                <Button
                  variant="primary"
                  size="lg"
                  title="Continue"
                  className="w-full shadow-lg shadow-uno-primary/30 mb-6"
                  onPress={handleSave}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};
