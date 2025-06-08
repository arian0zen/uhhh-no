import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { getRandomCard } from "./constants";

interface AnimatedCardProps {
  position: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  size?: {
    width: number;
    height: number;
  };
  rotation?: {
    start: string;
    end: string;
  };
  float?: {
    distance: number;
  };
  duration?: {
    float?: number;
    rotate?: number;
  };
  customImage?: any;
  zIndex?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  position,
  size = { width: 48, height: 48 },
  rotation = { start: "0deg", end: "10deg" },
  float = { distance: 10 },
  duration = { float: 2000, rotate: 3000 },
  customImage,
  zIndex = 0,
}) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const cardImage = customImage || getRandomCard();

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: 1,
            duration: duration.float,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: duration.float,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: duration.rotate,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: duration.rotate,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  const positionStyle = {
    position: "absolute" as const,
    zIndex,
    ...position,
  };

  const sizeStyle = {
    width: size.width,
    height: size.height,
  };

  return (
    <Animated.Image
      source={cardImage}
      style={[
        positionStyle,
        sizeStyle,
        {
          opacity: 0.05,
          transform: [
            {
              translateY: floatAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, float.distance],
              }),
            },
            {
              rotate: rotateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [rotation.start, rotation.end],
              }),
            },
          ],
        },
      ]}
      resizeMode="contain"
    />
  );
};
