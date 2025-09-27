import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

interface TrendingCardProps {
  movie_id: number;
  title: string;
  poster_url?: string;
  index: number;
}

const TrendingCard = ({ movie }: { movie: TrendingCardProps }) => {
  return (
    <Link href={`/movies/${movie?.movie_id}`} asChild>
      <TouchableOpacity className="relative pl-5">
        <Image
          source={{
            uri:
              movie.poster_url ||
              "https://blocks.astratic.com/img/general-img-landscape.png",
          }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />

        {/* masked view doesn't work */}
        {/* <View className="absolute bottom-9 -left-3.5">
          <Text className="text-white">1</Text>
          <MaskedView
            maskElement={
              <Text className="text-xl text-white">{movie.index + 1}</Text>
            }
          >
            <Image source={images.bg} className="size-14" resizeMode="cover" />
          </MaskedView>
        </View> */}

        <Text
          className="text-sm font-bold mt-2 text-light-200"
          numberOfLines={2}
        >
          {movie.title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
