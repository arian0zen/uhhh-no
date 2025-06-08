import { View, Text, TextInput, TextInputProps } from "react-native";
import { cn } from "@/lib/utils";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export const Input = ({
  label,
  error,
  containerClassName,
  className,
  ...props
}: InputProps) => {
  return (
    <View className={cn("w-full", containerClassName)}>
      {label && (
        <Text className="text-uno-text-primary font-primary-semibold text-sm mb-2">
          {label}
        </Text>
      )}
      <TextInput
        className={cn(
          "w-full bg-slate-50/50 backdrop-blur-sm rounded-xl p-4 font-primary-regular text-uno-text-primary",
          "border border-slate-200",
          "focus:border-uno-secondary focus:bg-slate-50/80",
          error && "border-red-500 bg-red-50/50",
          className
        )}
        placeholderTextColor="#94a3b8"
        {...props}
      />
      {error && (
        <Text className="text-red-500 font-primary-medium text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};
