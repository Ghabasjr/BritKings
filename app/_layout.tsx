import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '../hooks/useColorScheme';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const router = useRouter();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      if (loaded) {
        try {
          // Check if user is already authenticated
          const authToken = await AsyncStorage.getItem('@auth_token');

          if (authToken) {
            // User is authenticated, go to main app
            router.replace('/(tabs)');
          } else {
            // User is not authenticated, go to login
            router.replace('/login');
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          // On error, default to login screen
          router.replace('/login');
        } finally {
          await SplashScreen.hideAsync();
        }
      }
    };

    checkAuthAndNavigate();
  }, [loaded, router]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="verification" options={{ headerShown: false }} />
        <Stack.Screen name="upload" options={{ headerShown: false }} />
        <Stack.Screen name="personalInformation" options={{ headerShown: false }} />
        <Stack.Screen name="property" options={{ headerShown: false }} />
        <Stack.Screen name='plots' options={{ headerShown: false }} />
        <Stack.Screen name='Bookings' options={{ headerShown: false }} />
        <Stack.Screen name='propertiesPage' options={{ headerShown: false }} />
        <Stack.Screen name='paymentPage' options={{ headerShown: false }} />
        <Stack.Screen name='notification' options={{ headerShown: false }} />
        <Stack.Screen name='editProfile' options={{ headerShown: false }} />
        <Stack.Screen name='changePassword' options={{ headerShown: false }} />
        <Stack.Screen name='settings' options={{ headerShown: false }} />
        <Stack.Screen name='createBookings' options={{ headerShown: false }} />
        <Stack.Screen name='Tasks' options={{ headerShown: false }} />
        <Stack.Screen name='newListing' options={{ headerShown: false }} />
        <Stack.Screen name='PropertyDetails' options={{ headerShown: false }} />
        <Stack.Screen name='PerformanceScreen' options={{ headerShown: false }} />
        <Stack.Screen name='AchievedStaff' options={{ headerShown: false }} />
        <Stack.Screen name='Transactions' options={{ headerShown: false }} />
        <Stack.Screen name='profileScreen' options={{ headerShown: false }} />
        <Stack.Screen name='RefundPolicy' options={{ headerShown: false }} />
        <Stack.Screen name='ContactUs' options={{ headerShown: false }} />
        <Stack.Screen name='ContactUs2' options={{ headerShown: false }} />

      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}