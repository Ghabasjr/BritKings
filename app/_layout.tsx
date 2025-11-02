import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import 'react-native-reanimated';
import { PaystackProvider } from 'react-native-paystack-webview';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PAYSTACK_PUBLIC_KEY } from '../constants/api';
import { useColorScheme } from '../hooks/useColorScheme';
import { store } from '../store';
import { restoreAuth } from '../store/slices/authSlice';

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
          const authToken = await AsyncStorage.getItem('authToken');
          const userRole = await AsyncStorage.getItem('userRole');

          if (authToken && userRole) {
            // Restore auth state in Redux
            store.dispatch(restoreAuth({
              token: authToken,
              userRole: userRole as 'Agent' | 'Client'
            }));


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
    <Provider store={store}>
      <PaystackProvider publicKey={PAYSTACK_PUBLIC_KEY}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          // keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
          >
            <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="agentIndex" options={{ headerShown: false }} />
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
            {/* <Stack.Screen name='PerformanceScreen' options={{ headerShown: false }} /> */}
            <Stack.Screen name='AchievedStaff' options={{ headerShown: false }} />
            <Stack.Screen name='Transactions' options={{ headerShown: false }} />
            <Stack.Screen name='profileScreen' options={{ headerShown: false }} />
            <Stack.Screen name='RefundPolicy' options={{ headerShown: false }} />
            <Stack.Screen name='ContactUs' options={{ headerShown: false }} />
            <Stack.Screen name='ContacAgent' options={{ headerShown: false }} />
            <Stack.Screen name='ContactSuccess' options={{ headerShown: false }} />
            <Stack.Screen name='Messages' options={{ headerShown: false }} />
            <Stack.Screen name='ChatDetail' options={{ headerShown: false }} />
            <Stack.Screen name='RequestFinancing' options={{ headerShown: false }} />
            <Stack.Screen name='ScheduleVisit' options={{ headerShown: false }} />
            <Stack.Screen name='AskQuestion' options={{ headerShown: false }} />
            <Stack.Screen name='SecureCheckout' options={{ headerShown: false }} />
            <Stack.Screen name='PaymentSuccess' options={{ headerShown: false }} />
            </Stack>
          </KeyboardAvoidingView>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </ThemeProvider>
        <Toast />
      </PaystackProvider>
    </Provider>
  );
}