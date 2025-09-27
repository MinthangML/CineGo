import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Text,
  View,
} from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      const func = async () => {
        if (searchQuery.trim()) {
          await loadMovies();
        } else {
          reset();
        }
      };
      func();
    }, 500); // Debounce time of 500ms

    return () => clearTimeout(timeOutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <ImageBackground source={images.bg} className="flex-1" resizeMode="cover">
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard {...item} />}
          className="px-5 pt-10"
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            paddingRight: 5,
            marginBottom: 10,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListHeaderComponent={
            <>
              <View>
                <Image
                  source={images.logo}
                  className="w-12 h-10 mb-5 mx-auto"
                />
              </View>
              <View className="my-5">
                <SearchBar
                  placeholder="Search movies, TV shows..."
                  value={searchQuery}
                  onChangeText={(text) => setSearchQuery(text)}
                  onPress={() => {}}
                />
              </View>

              {moviesLoading && (
                <ActivityIndicator
                  size="large"
                  color="#ffffff"
                  className="mt-10 my-3"
                />
              )}

              {moviesError && (
                <Text className="text-red-500 text-center mt-5">
                  Err: {moviesError}
                </Text>
              )}

              {!moviesLoading &&
                !moviesError &&
                searchQuery.trim() &&
                movies?.length > 0 && (
                  <Text className="text-white text-center my-5 font-bold">
                    Search Results for{" "}
                    <Text className="text-accent">{searchQuery}</Text>
                  </Text>
                )}
            </>
          }
          ListEmptyComponent={
            !moviesLoading &&
            !moviesError && (
              <Text className="text-gray-500 text-center my-5">
                {searchQuery.trim()
                  ? "No results found"
                  : "Start typing to search for movies"}
              </Text>
            )
          }
        />
      </ImageBackground>
    </View>
  );
};

export default Search;
