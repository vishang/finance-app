import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, useRouter } from "expo-router";
import { StatusBar, TouchableOpacity } from "react-native";
import "react-native-reanimated";
import "../global.css";

const InitialLayout = () => {

  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.primary} />
            </TouchableOpacity>
          ),
           headerRight: () => (
            <Link href={'/help'} asChild>
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="help-circle-outline" size={34} color={Colors.dark} />
            </TouchableOpacity>
            </Link>
          ),
        }}
        
      />
      <Stack.Screen name="help" options={{ title: 'Help', presentation: 'modal' }} />
    </Stack>
    
  )
}

export default function RootLayout() {
  return (
    <>
    <StatusBar barStyle='light-content' />
    <InitialLayout />
    </>
  );
}
