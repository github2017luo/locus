import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator
} from "react-native";
import { Tile } from "react-native-elements";
import useCurrentLocation from "../../../hooks/useCurrentLocation";
import { getDistance, convertSpeed } from "geolib";
import CustomButton from "../../global/Button";

import axios from "axios";

import styles from "./PhotosScreenStyle";
import { API_URL } from "../../../../configKeys";

import PhotoTile from "./PhotoTile";

export default function PhotosScreen({ route, navigation }) {
  const { categoryId } = route.params;

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [oneItem, setOneItem] = useState(false);
  const { currentLocation, _getLocationAsync } = useCurrentLocation();

  // useEffect(() => {
  //   _getLocationAsync();
  // }, [images]);

  useEffect(() => {
    _getLocationAsync();
    axios.get(`${API_URL}categories/${categoryId}/images`).then(res => {
      // res.data.images.forEach(image => {
      //   image.distance = distance(image);
      // });
      console.log(res.data.images);
      setImages(res.data.images);
      setLoading(false);
      if (res.data.images.length === 1) {
        setOneItem(true);
      }
    });
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    axios.get(`${API_URL}categories/${categoryId}/images`).then(res => {
      setImages(res.data.images);
      setRefreshing(false);
      if (res.data.images.length === 1) {
        setOneItem(true);
      } else {
        setOneItem(false);
      }
    });
  };

  const distance = image => {
    console.log(currentLocation);
    const result = getDistance(
      {
        latitude: image.latitude,
        longitude: image.longitude
      },
      currentLocation,
      1
    );

    return result;
  };

  const orderByLocation = () => {
    const imagesToSort = [...images];
    imagesToSort.forEach(image => {
      image.distance = distance(image);
    });
    imagesToSort.sort((a, b) => a.distance - b.distance);
    console.log("SORTED");
    console.log(imagesToSort);
    setImages(imagesToSort);
  };

  const deviceWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <Text style={styles.categoryTitle}>
          Photos of {route.params.categoryName}
        </Text>
        <CustomButton onPress={() => orderByLocation()}>Closest</CustomButton>
      </View>
      <View style={styles.photosContainer}>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {!loading && (
          <FlatList
            numColumns={2}
            data={images}
            renderItem={({ item }) => (
              <PhotoTile
                item={item}
                navigation={navigation}
                deviceWidth={deviceWidth}
                onlyOne={oneItem}
                token={route.params.token}
              />
            )}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
      </View>
    </View>
  );
}
