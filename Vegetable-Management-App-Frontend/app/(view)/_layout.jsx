import React, { Component } from "react";
import { Stack } from "expo-router";
export class ViewLayout extends Component {
  render() {
    return (
      <Stack>
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        <Stack.Screen
          name="farmer"
          options={{
            headerShown: true,
            headerTitle: "Farmer",
            headerStyle: { backgroundColor: "#15803d" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="ac"
          options={{
            headerShown: true,
            headerTitle: "Agricuture Cooperative",
            headerStyle: { backgroundColor: "#15803d" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="vegetable"
          options={{
            headerShown: true,
            headerTitle: "Vegetable",
            headerStyle: { backgroundColor: "#15803d" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="address"
          options={{
            headerShown: true,
            headerTitle: "Address",
            headerStyle: { backgroundColor: "#15803d" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="df"
          options={{
            headerShown: true,
            headerTitle: "District Facilitate",
            headerStyle: { backgroundColor: "#15803d" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="overview_data"
          options={{
            headerShown: true,
            headerTitle: "Overview",
            headerStyle: { backgroundColor: "#15803d" },
            headerTintColor: "white",
          }}
        />
      </Stack>
    );
  }
}

export default ViewLayout;
