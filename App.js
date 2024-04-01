import * as React from "react";
import { useRef, useEffect, useState } from "react";
import {
  Alert,
  StatusBar,
  StyleSheet,
  View,
  DrawerLayoutAndroid,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Calendar from "expo-calendar";
import { Card } from "react-native-paper";

import {
  GluestackUIProvider,
  Text,
  Box,
  ActionsheetBackdrop,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  ActionsheetItem,
  ActionsheetItemText,
  Icon,
  ClockIcon,
  MenuIcon,
  Avatar,
  AvatarFallbackText,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { Actionsheet } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { ActionsheetContent } from "@gluestack-ui/themed";

export default function App() {
  const [minhaLocalizacao, setMinhaLocalizacao] = useState(null);
  const [dataFormatada, setDataFormatada] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [dataAtualizada, setDataAtualizada] = useState("");
  const [diaAtual, setDiaAtual] = useState("");

  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState("left");
  const changeDrawerPosition = () => {
    if (drawerPosition === "left") {
      setDrawerPosition("right");
    } else {
      setDrawerPosition("left");
    }
  };

  const navigationView = () => (
    <View style={[estilos.container, estilos.navigationContainer]}>
      <View style={estilos.menuAvatarConteudo}>
        <Avatar
          style={estilos.menuAvatar}
          bgColor="$amber600"
          size="xl"
          borderRadius="$full"
        >
          <AvatarFallbackText>Zimbo Sebastião</AvatarFallbackText>
        </Avatar>
        <Text style={estilos.menuTexto}>Zimbo Sebastião</Text>
        <Text style={estilos.paragraph}>PontoFácil</Text>
      </View>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </View>
  );

  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);

  useEffect(() => {
    async function obterLocalizacao() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Ops!", "Você não autorizou o uso de geolocalização");
        return;
      }

      const { status: statusCalendario } =
        await Calendar.requestCalendarPermissionsAsync();
      if (statusCalendario === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        // console.log("Here are all your calendars:");
        // console.log({ calendars });
      }

      /* Se o status estiver OK, obtemos os dados da localização
      atual. E atualizamos o state de minhaLocalizacao. */
      let localizacaoAtual = await Location.getCurrentPositionAsync({});
      setMinhaLocalizacao(localizacaoAtual);
      setLocalizacao({
        latitude: localizacaoAtual.coords.latitude,
        longitude: localizacaoAtual.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
    obterLocalizacao();
  }, []);

  // console.log(minhaLocalizacao);

  const [localizacao, setLocalizacao] = useState(null);

  const regiaoInicialMapa = {
    latitude: -23.533773,
    longitude: -46.65529,
    latitudeDelta: 40,
    longitudeDelta: 40,
  };

  const marcarPonto = () => {
    const agora = new Date();
    const dia = String(agora.getDate()).padStart(2, "0");
    const mes = String(agora.getMonth() + 1).padStart(2, "0"); // Janeiro é 0!
    const ano = agora.getFullYear();
    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");

    // const dataFormatada = `${horas}:${minutos} - ${dia}/${mes}/${ano}`;
    const dataFormatada = `${horas}:${minutos}`;
    const data = ` ${dia}/${mes}/${ano}`;
    // console.log(dataFormatada);
    Alert.alert("Registro", `Ponto registrado com sucesso: ${dataFormatada}`);
    setDataFormatada(dataFormatada);
    setData(data);
  };

  const atualizarHora = () => {
    const agora = new Date();
    const diaSemanaArray = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    const diaSemana = diaSemanaArray[agora.getDay()];
    const dia = String(agora.getDate()).padStart(2, "0");
    const mes = String(agora.getMonth() + 1).padStart(2, "0"); // Janeiro é 0!
    const ano = agora.getFullYear();
    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");
    const segundos = String(agora.getSeconds()).padStart(2, "0");

    const hora = `${horas}:${minutos}:${segundos}`;
    const dataAtual = ` ${dia}/${mes}/${ano}`;
    const diaAtual = `${diaSemana}`;
    setHora(hora);
    setDataAtualizada(dataAtual);
    setDiaAtual(diaAtual);
  };

  useEffect(() => {
    const intervalId = setInterval(atualizarHora, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <StatusBar />
      <GluestackUIProvider config={config}>
        {/* <View style={estilos.viewMapa}>
              <MapView
              mapType="standard"
              style={estilos.mapa}
              region={localizacao ?? regiaoInicialMapa}
              >
              {localizacao && <Marker coordinate={localizacao} />}
              </MapView>
            </View> */}
        <DrawerLayoutAndroid
          ref={drawer}
          drawerWidth={300}
          drawerPosition={drawerPosition}
          renderNavigationView={navigationView}
        >
          <View style={estilos.container}>
            <View style={estilos.menu}>
              <Icon
                onPress={() => drawer.current.openDrawer()}
                as={MenuIcon}
                m="$3"
                w="$10"
                h="$6"
              />
              <Text style={estilos.menuTexto}>PontoFácil</Text>
              <Avatar bgColor="$amber600" size="md" borderRadius="$full">
                <AvatarFallbackText>Zimbo Sebastião</AvatarFallbackText>
              </Avatar>
            </View>

            <View style={estilos.viewInfo}>
              <Card style={estilos.cardInfo}>
                <Card.Title title="Zimbo ALbertina Sebastião" color="white" />
                <Card.Content style={estilos.cardConteudo}>
                  <View>
                    <Text variant="titleMedium">{diaAtual}</Text>
                    <Text variant="titleMedium">{dataAtualizada}</Text>
                  </View>
                  <View>
                    <Text variant="titleMedium">
                      <Icon as={ClockIcon} /> {hora}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            </View>
            <View style={estilos.viewCard}>
              <Card style={estilos.cardColor}>
                <Card.Content>
                  <View style={estilos.viewInfoHora}>
                    <View>
                      <Text variant="titleMedium">Entrada:</Text>
                      <Text variant="titleMedium">Intervalo:</Text>
                      <Text variant="titleMedium">Fim do Intervalo:</Text>
                      <Text variant="titleMedium">Saída:</Text>
                    </View>

                    <View>
                      <Text>{dataFormatada}</Text>
                      <Text>12:00</Text>
                      <Text>13:00</Text>
                      <Text>--:--</Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </View>
            <View>
              <Button style={estilos.viewBotao} onPress={marcarPonto}>
                <ButtonText>Marcar Ponto</ButtonText>
              </Button>
            </View>
            <View>
              <Button
                onPress={handleClose}
                $_text-color="black"
                style={estilos.viewRelatorio}
              >
                <ButtonText>Requisição Manual</ButtonText>
              </Button>
            </View>
            <View>
              <Actionsheet
                isOpen={showActionsheet}
                onClose={handleClose}
                zIndex={999}
              >
                <ActionsheetBackdrop />
                <ActionsheetContent h="$72" zIndex={999}>
                  <ActionsheetDragIndicatorWrapper>
                    <ActionsheetDragIndicator />
                  </ActionsheetDragIndicatorWrapper>
                  <Text>Banco de Horas</Text>

                  <ActionsheetItem>
                    <ActionsheetItemText>Início do banco:</ActionsheetItemText>
                  </ActionsheetItem>
                  <ActionsheetItem>
                    <ActionsheetItemText>
                      Saldo consolidado:
                    </ActionsheetItemText>
                  </ActionsheetItem>
                </ActionsheetContent>
              </Actionsheet>
            </View>
          </View>
        </DrawerLayoutAndroid>
      </GluestackUIProvider>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginRight: 18,
  },
  menuTexto: {
    fontSize: 18,
    fontWeight: "bold",
  },
  menuAvatar: {
    marginTop: 60,
  },
  menuAvatarConteudo: { alignItems: "center" },
  mapa: { width: "100%", height: "100%" },
  viewMapa: {
    width: "80%",
    height: "40%",
    marginVertical: 30,
    marginLeft: "auto",
    marginRight: "auto",

    borderWidth: 2,
  },
  viewBotao: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "6%",
    borderRadius: 40,
  },
  viewRelatorio: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "6%",
    borderRadius: 40,
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderColor: "#217dde",
    borderWidth: 1,
  },
  viewCard: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "6%",
  },
  cardColor: {
    backgroundColor: "#f2f9ff",
  },
  viewInfo: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "6%",
    marginTop: "10%",
  },

  cardInfo: {
    backgroundColor: "#207FDE",
    textDecorationColor: "white",
    color: "white",
  },
  cardConteudo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardInfoText: {
    textAlign: "center",
    backgroundColor: "red",
    textDecorationColor: "white",
  },
  modal: {
    position: "relative",
    width: "100%",
    backgroundColor: "#CBDAF0",
    bottom: "-65%",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  gaveta: {
    width: "100%",
    borderRadius: 0,
  },
  viewInfoHora: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
});
