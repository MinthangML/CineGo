import { images } from "@/constants/images";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  value?: string;
  placeholder: string;
  onPress: () => void;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ onPress, placeholder, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-2">
      <Image source={images.logo} style={{ width: 20, height: 20 }} />
      <TextInput
        onPress={onPress}
        onChangeText={onChangeText}
        value={value}
        className="w-full ml-2 text-white"
        placeholder={placeholder}
        placeholderTextColor="#fff"
      />
    </View>
  );
};

export default SearchBar;
