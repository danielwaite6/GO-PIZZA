import React from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/theme';
//import { SignIn } from './src/screens/SignIn';
import { AuthProvider } from './src/hooks/auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Routes } from './src/routes';
//import { Order } from './src/screens/Order';
//import { Orders } from './src/screens/Orders';


export default function App() {

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" translucent backgroundColor='transparent' />
        <AuthProvider>

          <Routes />

        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

