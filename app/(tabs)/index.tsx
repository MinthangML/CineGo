import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React from "react";
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
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  // useEffect(() => {
  //   console.log("Movies data:", movies);
  // }, [movies]);

  return (
    <ImageBackground source={images.bg} className="flex-1 w-full h-full">
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={images.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {moviesLoading ? (
          <ActivityIndicator size="large" color="#ffffff" className="mt-10" />
        ) : moviesError ? (
          <Text className="text-red-500 mt-10">{moviesError}</Text>
        ) : (
          <View>
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search movies, TV shows..."
            />
            <Text className="text-white text-lg font-semibold mt-10 mb-5">
              Popular Movies
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
