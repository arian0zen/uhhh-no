import { View, ViewProps } from "react-native";
import { clsx } from "clsx";
import { BlurView, BlurTint } from "expo-blur";

interface CardProps extends ViewProps {
  glass?: boolean;
  intensity?: number;
  elevated?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Card({
  glass = false,
  intensity = 50,
  elevated = false,
  className,
  children,
  style,
  ...props
}: CardProps) {
  const Container = glass ? BlurView : View;
  const containerProps = glass ? { intensity, tint: "light" as BlurTint } : {};

  return (
    <Container
      {...containerProps}
      style={style}
      className={clsx(
        "rounded-2xl p-4 bg-white/80",
        elevated && "shadow-lg shadow-black/5",
        glass && "overflow-hidden backdrop-blur-md",
        className
      )}
      {...props}
    >
      {children}
    </Container>
  );
}
