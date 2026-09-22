/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createMMKV } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StateStorage } from 'zustand/middleware';
import ApplicationNavigator from './navigators/applicationNavigator';
import { QueryProvider } from './providers/queryProvider';

export const storage = createMMKV(); // local storage in React native

/* State Management library Zustand(https://github.com/pmndrs/zustand) START */
export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: name => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return storage.remove(name);
  },
};
/* State Management library Zustand(https://github.com/pmndrs/zustand) END */

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryProvider>
        <SafeAreaProvider>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'light-content'}
          />
          <ApplicationNavigator />
        </SafeAreaProvider>
      </QueryProvider>
    </GestureHandlerRootView>
  );
}

export default App;
