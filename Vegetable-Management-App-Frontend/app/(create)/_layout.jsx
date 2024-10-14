import React from "react";
import { Stack } from "expo-router";

const CreateLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="create_list"
        options={{
          headerShown: true,
          headerTitle: "Create a new List",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#15803d" },
        }}
      />
      <Stack.Screen
        name="next_list"
        options={{
          headerShown: false,
          headerTitle: "Create a new list (step 2)",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#15803d" },
        }}
      />
    </Stack>
  );
};

export default CreateLayout;
