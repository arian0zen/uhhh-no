import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { forwardRef } from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: "primary" | "secondary" | "outline" | "gradient" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  icon?: keyof typeof AntDesign.glyphMap;
  iconPosition?: "left" | "right";
  isFullWidth?: boolean;
}

export const Button = forwardRef<typeof TouchableOpacity, ButtonProps>(
  (
    {
      onPress,
      title,
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      className = "",
      icon,
      iconPosition = "left",
      isFullWidth = true,
    },
    ref
  ) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "primary":
          return "bg-indigo-600 shadow-lg shadow-indigo-500/25";
        case "secondary":
          return "bg-indigo-500 border border-indigo-500";
        case "outline":
          return "bg-transparent border-2 border-indigo-500";
        case "gradient":
          return "bg-transparent shadow-lg shadow-indigo-500/25";
        case "danger":
          return "bg-red-500 shadow-lg shadow-red-500/25";
        default:
          return "bg-indigo-600 shadow-lg shadow-indigo-500/25";
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "px-4 py-2.5";
        case "md":
          return "px-6 py-3.5";
        case "lg":
          return "px-8 py-4";
        default:
          return "px-6 py-3.5";
      }
    };

    const getTextColor = () => {
      switch (variant) {
        case "primary":
        case "gradient":
        case "danger":
          return "text-white";
        case "secondary":
        case "outline":
          return "text-indigo-700";
        default:
          return "text-white";
      }
    };

    const getIconColor = () => {
      return variant === "secondary" || variant === "outline"
        ? "#4F46E5"
        : "#FFFFFF";
    };

    const getTextSize = () => {
      return size === "sm"
        ? "text-sm"
        : size === "lg"
        ? "text-lg"
        : "text-base";
    };

    const getIconSize = () => {
      return size === "sm" ? 16 : size === "lg" ? 20 : 18;
    };

    const renderIcon = () => {
      if (!icon) return null;
      return (
        <AntDesign
          name={icon}
          size={getIconSize()}
          color={getIconColor()}
          style={{
            marginRight: iconPosition === "left" ? 8 : 0,
            marginLeft: iconPosition === "right" ? 8 : 0,
          }}
        />
      );
    };

    const renderButtonContent = () => (
      <View className="flex-row items-center justify-center">
        {iconPosition === "left" && renderIcon()}
        <Text
          className={`
            ${getTextColor()}
            ${getTextSize()}
            text-center font-primary-medium
          `}
        >
          {title}
        </Text>
        {iconPosition === "right" && renderIcon()}
      </View>
    );

    const buttonContent = loading ? (
      <ActivityIndicator color={getIconColor()} />
    ) : (
      renderButtonContent()
    );

    if (variant === "gradient") {
      return (
        <TouchableOpacity
          onPress={onPress}
          disabled={disabled || loading}
          activeOpacity={0.8}
          className={`${disabled || loading ? "opacity-50" : ""} ${className}`}
        >
          <LinearGradient
            colors={["#667eea", "#764ba2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className={`
              ${getSizeClasses()}
              items-center
              justify-center
              rounded-xl
              ${isFullWidth ? "w-full" : "w-fit"}
            `}
          >
            {buttonContent}
          </LinearGradient>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        className={`
          ${getVariantClasses()}
          ${getSizeClasses()}
          items-center
          justify-center
          rounded-xl
          ${disabled || loading ? "opacity-50" : ""}
          ${isFullWidth ? "w-full" : "w-fit"}
          ${className}
          active:scale-95
        `}
      >
        {buttonContent}
      </TouchableOpacity>
    );
  }
);
