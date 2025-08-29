import { type TextProps, type ViewProps } from "react-native";

/*
This is a documentation of types for anything related to themes in the app
*/


// This is used for the ThemedText component
export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

// This is used for the ThemedView component
export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

