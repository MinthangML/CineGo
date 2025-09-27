import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
const database = new Databases(client);

export const updateSearchCount = async (searchTerm: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: searchTerm,
        count: 1,
        title: movie?.title || "Unknown",
        movie_id: movie?.id || null,
        poster_url:
          `https://image.tmdb.org/t/p/w500${movie?.poster_path}` || null,
      });
    }

    console.log(result); // For debugging purposes
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(5),
    ]);
    // console.log("trends: ", result); //it works
    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};
