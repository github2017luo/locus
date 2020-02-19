import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./TagStyle";

export default function Tag(props) {
  return (
    <TouchableOpacity style={styles.tag} onPress={() => props.delete(name)}>
      <Text style={styles.label}>{props.tagName}</Text>
      <MaterialIcons name={"cancel"} size={15} color={"grey"} />
    </TouchableOpacity>
  );
}