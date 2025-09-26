import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";

// import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
  // const colorScheme = useColorScheme();

  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    // <ThemeProvider>
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
    // </ThemeProvider>
  );
}
