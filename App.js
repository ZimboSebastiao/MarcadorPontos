import * as React from "react";
import { useEffect, useState } from "react";
import { Alert, StatusBar, StyleSheet, View, ScrollView } from "react-native";
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
  TrashIcon,
  ChevronUpIcon,
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
        <View style={estilos.container}>
          <View style={estilos.viewInfo}>
            <Card style={estilos.cardInfo}>
              <Card.Title title="Zimbo ALbertina Sebastião" />
              <Card.Content>
                <Text variant="titleMedium">Segunda-Feira</Text>
                <Text variant="titleMedium">{data}</Text>
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
          <View style={estilos.viewBotao}>
            <Button onPress={marcarPonto}>
              <ButtonText>Marcar Ponto</ButtonText>
            </Button>
          </View>
          <View style={estilos.viewRelatorio}>
            <Button>
              <ButtonText>Relatório de Pontos</ButtonText>
            </Button>
          </View>

          <View>
            <Button onPress={handleClose} style={estilos.modal}>
              <Icon as={ChevronUpIcon} m="$2" w="$34" h="$35" />
            </Button>
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
                <Icon as={TrashIcon} />
                <ActionsheetItem>
                  <ActionsheetItemText>Início do banco</ActionsheetItemText>
                </ActionsheetItem>
                <ActionsheetItem>
                  <ActionsheetItemText>Saldo consolidado</ActionsheetItemText>
                </ActionsheetItem>
              </ActionsheetContent>
            </Actionsheet>
          </View>
        </View>
      </GluestackUIProvider>
    </>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, marginVertical: 40 },
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
  },
  viewRelatorio: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "6%",
  },
  viewCard: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "6%",
  },
  cardColor: {
    backgroundColor: "#F2F9FF",
  },
  viewInfo: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "6%",
  },

  cardInfo: {
    backgroundColor: "#207FDE",
  },
  modal: {
    position: "relative",
    width: "100%",
    backgroundColor: "#CBDAF0",
    bottom: "-70%",
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
});
