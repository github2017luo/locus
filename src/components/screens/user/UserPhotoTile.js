import React, { useState } from "react";
import { View, ImageBackground, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./UserPhotoTileStyle";

export default function UserPhotoTile(props) {
  return (
    <View>
      {props.onlyOne && (
        <ImageBackground
          key={props.item.id}
          source={{ uri: props.item.url, cache: "force-cache" }}
          style={{
            width: props.deviceWidth,
            height: props.deviceWidth,
            ...styles.image
          }}
        ></ImageBackground>
      )}
      {!props.onlyOne && (
        <ImageBackground
          key={props.item.id}
          source={{ uri: props.item.url, cache: "force-cache" }}
          style={{
            width: props.deviceWidth / 2,
            height: props.deviceWidth / 2,
            ...styles.image
          }}
        >
          <MaterialIcons
            name={"cancel"}
            size={30}
            color={"#183152"}
            style={{ opacity: 0.74 }}
            onPress={() => {
              Alert.alert(
                "Delete Image",
                "Are you sure you want to delete?",
                [
                  {
                    text: "Yes",
                    onPress: () => {
                      props.delete(props.item.id);
                    }
                  },
                  {
                    text: "No",
                    style: "cancel"
                  }
                ],
                { cancelable: false }
              );
            }}
          />
        </ImageBackground>
      )}
    </View>
  );
}
