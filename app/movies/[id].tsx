import { images } from "@/constants/images";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">
      {label}: {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    loading: isLoading,
    error,
  } = useFetch(() => fetchMovieDetails(id as string));

  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white text-xl font-bold">{movie?.title}</Text>
          <Text>{movie?.release_date?.split("-")[0]}</Text>
          <Text>{movie?.runtime}m</Text>
        </View>

        <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
          <Image source={images.star} className="size-4" />
          <Text className="text-white font-bold text-sm">
            {Math.round((movie?.vote_average || 0) * 10) / 10}
          </Text>
          <Text className="text-light-200 text-sm">
            ({movie?.vote_count} votes)
          </Text>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((genre) => genre.name).join(", ") || null}
          />
          <MovieInfo
            label="Runtime"
            value={movie?.runtime ? `${movie.runtime} minutes` : null}
          />
          <MovieInfo label="Release Date" value={movie?.release_date} />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={
                movie?.budget !== undefined
                  ? `$${movie.budget / 1_000_000} million`
                  : "N/A"
              }
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue || 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Production Companies"
              value={
                movie?.production_companies
                  ?.map((company) => company.name)
                  .join(", ") || null
              }
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => router.back}
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
      >
        {/* <Image source={} claseName="" tintColor={"white"} /> */}
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
