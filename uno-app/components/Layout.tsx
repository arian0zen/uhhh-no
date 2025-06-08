import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SafeAreaView className="flex-1 bg-[#1a1a1a]">
      <View className="flex-1">{children}</View>
    </SafeAreaView>
  );
}
