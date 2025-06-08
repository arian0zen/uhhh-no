import { useFonts } from "expo-font";

export const useFont = () => {
  const [loaded, error] = useFonts({
    Montserrat: require("../assets/fonts/montserrat/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("../assets/fonts/montserrat/Montserrat-Bold.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/montserrat/Montserrat-SemiBold.ttf"),
    "Montserrat-Medium": require("../assets/fonts/montserrat/Montserrat-Medium.ttf"),
    "Montserrat-ExtraBold": require("../assets/fonts/montserrat/Montserrat-ExtraBold.ttf"),
    "Montserrat-Thin": require("../assets/fonts/montserrat/Montserrat-Thin.ttf"),
    "Montserrat-Light": require("../assets/fonts/montserrat/Montserrat-Light.ttf"),
    "Montserrat-ExtraLight": require("../assets/fonts/montserrat/Montserrat-ExtraLight.ttf"),
  });

  return { loaded, error };
};
