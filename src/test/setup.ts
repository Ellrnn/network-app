jest.mock("react-native-reanimated", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: {
      View,
      Text: View,
      Image: View,
      ScrollView: View,
      createAnimatedComponent: (c: unknown) => c,
    },
    useSharedValue: (v: unknown) => ({ value: v }),
    useAnimatedStyle: () => ({}),
    withTiming: (v: unknown) => v,
    withSequence: (v: unknown) => v,
    Easing: { out: () => ({}), inOut: () => ({}), ease: {} },
    FadeInDown: { delay: () => ({ duration: () => ({}) }) },
    FadeInUp: { duration: () => ({}) },
  };
});

jest.mock("@expo/vector-icons", () => {
  const RN = require("react-native");
  const RR = require("react");
  return {
    Ionicons: (props: Record<string, unknown>) =>
      RR.createElement(RN.Text, null, String(props.name)),
  };
});

jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: { Light: "light", Medium: "medium", Heavy: "heavy" },
}));

jest.mock("expo-image", () => {
  const { Image } = require("react-native");
  return { Image };
});

jest.mock("react-native-keyboard-controller", () => {
  const { ScrollView } = require("react-native");
  return { KeyboardAwareScrollView: ScrollView };
});

jest.mock("react-native-modal", () => {
  const { View } = require("react-native");
  const RR = require("react");
  return {
    __esModule: true,
    default: (props: {
      isVisible: boolean;
      children: unknown;
      testID?: string;
    }) =>
      props.isVisible
        ? RR.createElement(View, { testID: props.testID }, props.children)
        : null,
  };
});

jest.mock("@legendapp/list", () => {
  const { FlatList } = require("react-native");
  return { LegendList: FlatList };
});

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));
