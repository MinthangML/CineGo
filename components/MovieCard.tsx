import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://blocks.astratic.com/img/general-img-landscape.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-sm font-bold mt-2 text-white" numberOfLines={2}>
          {title}
        </Text>

        <View className="flex-row justify-start items-center gap-x-1">
          <Text className="text-xs text-white font-bold uppercase">
            *{Math.round((vote_average ?? 0) / 10)}%
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
