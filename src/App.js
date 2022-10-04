import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import Home from "./screens/home/Home";

export default function App() {
  return (
    <SafeAreaView>
      <StatusBar />
      <Home />
    </SafeAreaView >
  );
}
