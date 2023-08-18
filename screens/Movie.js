import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-3";

export default function Movie() {
  const { params: item } = useRoute();
  const [isFavorite, toggleFavorite] = useState(false);
  const [cast, setCast] = useState([1, 1, 1, 1, 1]);
  const [similarMovies, setSimilarMovies] = useState([1, 1, 1, 1, 1]);
  const navigation = useNavigation();

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie fav */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4" +
            topMargin
          }
        >
          <TouchableOpacity
            style={styles.background}
            className="rounded-xl p-1 bg-yellow-500"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color={"white"} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
            <HeartIcon
              size={28}
              color={isFavorite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image
            source={require("../assets/images/moviePoster2.png")}
            style={{ width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0)", "rgba(23,23,23,1)"]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>

        {/* movie details */}
        <View className="space-y-3">
          {/* title */}
          <Text className="text-white text-3xl font-bold tracking-wide text-center">
            Movie name
          </Text>

          {/* status, release , runtime */}
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Released | 2020 | 170 min
          </Text>

          {/* genres */}
          <View className="flex-row justify-center mx-4 space-x-2">
            <Text className="text-neutral-400 font-semibold text-base text-center">
              Action |
            </Text>
            <Text className="text-neutral-400 font-semibold text-base text-center">
              Thrill |
            </Text>
            <Text className="text-neutral-400 font-semibold text-base text-center">
              Comedy
            </Text>
          </View>

          {/* description */}
          <Text className="text-neutral-400 mx-4 tracking-wide">
            Description
          </Text>
        </View>

        {/* cars */}
        <Cast cast={cast} navigation={navigation} />

        {/* similar movies */}
        <MovieList
          title={"Similar Movies"}
          hideSeeAll={true}
          data={similarMovies}
        />
      </View>
    </ScrollView>
  );
}
