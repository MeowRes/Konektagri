import React, { Component } from "react";
import { Stack } from "expo-router";

export class AuthLayout extends Component {
  render() {
    return (
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    );
  }
}

export default AuthLayout;
