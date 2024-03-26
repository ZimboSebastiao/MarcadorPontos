import React, { useRef, useState } from "react";
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import HorizontalLine from "../components/LinhaHorizontal";

const { width, height } = Dimensions.get("window");

const Gaveta = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [hidden, setHidden] = useState(true);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  const handleClose = () => {
    setHidden(true);
  };

  return (
    <View style={styles.container}>
      <HorizontalLine />
      <TouchableOpacity style={styles.button} onPress={() => setHidden(false)}>
        <Button icon="dots-horizontal" style={styles.titleText}></Button>
      </TouchableOpacity>

      {!hidden && (
        <Animated.View
          style={{
            transform: [{ translateY: pan.y }],
            position: "absolute",
            bottom: 0,
          }}
        >
          <View style={styles.box}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>

            <Text style={styles.textTitleButton}>Banco de horas</Text>
            <View style={styles.viewInfo}>
              <View>
                <Text style={styles.textButton}>Início do banco:</Text>
                <Text style={styles.textButton}>Saldo consolidado: </Text>
              </View>

              <View>
                <Text style={styles.textButton}>02/03/2024</Text>
                <Text style={styles.textButton}>24:30h </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 0,
    width: "100%",
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
  },
  box: {
    minHeight: height * 0.3,
    width,
    backgroundColor: "#3178DB",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#3957DB",
    padding: 5,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  textTitleButton: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    left: 55,
    top: 39,
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  viewInfo: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 50,
  },
});

export default Gaveta;
