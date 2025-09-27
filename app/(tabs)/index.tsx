import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Home = () => {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  useEffect(() => {
    console.log("trending movies: ", trendingMovies);
  }, [trendingMovies]);

  return (
    <ImageBackground source={images.bg} className="flex-1 w-full h-full">
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={images.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {moviesLoading || trendingMoviesLoading ? (
          <ActivityIndicator size="large" color="#ffffff" className="mt-10" />
        ) : moviesError || trendingMoviesError ? (
          <Text className="text-red-500 mt-10">
            {moviesError || trendingMoviesError}
          </Text>
        ) : (
          <View>
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search movies, TV shows..."
            />

            {/* trending movies goes here */}
            {trendingMovies && trendingMovies.length > 0 && (
              <>
                <Text className="text-white text-lg font-semibold mt-10 mb-5">
                  Trending Movies
                </Text>
                <FlatList
                  data={trendingMovies}
                  // keyExtractor={(item) => item?.id?.toString()}
                  renderItem={({ item, index }) => (
                    <TrendingCard
                      key={index}
                      movie={{
                        ...item,
                        index: index,
                      }}
                    />
                  )}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  className="mt-2"
                  showsHorizontalScrollIndicator={false}
                  horizontal
                />
              </>
            )}

            <Text className="text-white text-lg font-semibold mt-10 mb-5">
              Latest Movies
            </Text>

            <FlatList
              data={movies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <MovieCard {...item} />}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({});
