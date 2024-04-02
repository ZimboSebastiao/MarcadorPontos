import * as React from "react";
import { useRef, useEffect, useState } from "react";
import { Alert, StatusBar, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";

import {
  GluestackUIProvider,
  Text,
  Icon,
  Avatar,
  AvatarFallbackText,
  VStack,
  HStack,
  AvatarImage,
  Heading,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  ChevronDownIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@gluestack-ui/themed";
import { AlignLeft } from "lucide-react-native";
import { config } from "@gluestack-ui/config";
import { Actionsheet } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";

export default function Relatorio({ navigation }) {
  return (
    <>
      <StatusBar />
      <GluestackUIProvider config={config}>
        <View style={estilos.container}>
          <View style={estilos.menu}>
            <AlignLeft
              onPress={() => navigation.openDrawer()}
              m="$3"
              w="$10"
              h="$6"
              color="black"
            />
            <Text style={estilos.menuTexto}>Relatório</Text>
            <Avatar bgColor="$amber600" size="md" borderRadius="$full">
              <AvatarFallbackText>Zimbo Sebastião</AvatarFallbackText>
            </Avatar>
          </View>

          <View style={estilos.imagem}>
            <VStack space="2xl">
              <HStack
                space="md"
                h="34%"
                justifyContent="center"
                alignItems="center"
              >
                <Avatar size="2xl">
                  <AvatarFallbackText>SS</AvatarFallbackText>
                  <AvatarImage
                    source={{
                      uri: "https://media.licdn.com/dms/image/C4D03AQE2MwX9xkLVzA/profile-displayphoto-shrink_400_400/0/1652063074266?e=1717632000&v=beta&t=_w1NE2WevzO_JvcECbp9P6xtWpEsFauuymI-ouPLrIA",
                    }}
                    alt="Foto do perfil"
                  />
                </Avatar>
                <VStack>
                  <Heading size="sm">Zimbo Sebastião</Heading>
                  <Text size="sm">Developer</Text>
                </VStack>
              </HStack>
            </VStack>
          </View>

          <View style={estilos.selecaoEspaco}>
            <Select style={estilos.selecao}>
              <SelectTrigger variant="rounded" size="sm" borderColor="blue">
                <SelectInput placeholder="Seleciona um Período" />
                <SelectIcon mr="$3">
                  <Icon as={ChevronDownIcon} />
                </SelectIcon>
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="UX Research" value="ux" />

                  <SelectItem label="Backend Development" value="backend" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </View>

          <View style={estilos.viewCard}>
            <Card style={estilos.cardColor}>
              <Card.Content>
                <View style={estilos.viewInfoHora}>
                  <View>
                    <Text style={estilos.texto} variant="titleMedium">
                      Dias trabalhados:
                    </Text>
                    <Text style={estilos.texto} variant="titleMedium">
                      Horas trabalhadas:
                    </Text>
                    <Text style={estilos.texto} variant="titleMedium">
                      Média de horas trabalhadas:
                    </Text>
                    <Text style={estilos.texto} variant="titleMedium">
                      Horas em pausa:
                    </Text>
                    <Text style={estilos.texto} variant="titleMedium">
                      Média de oras em pausa:
                    </Text>
                  </View>

                  <View>
                    <Text>--:--</Text>
                    <Text>--:--</Text>
                    <Text>--:--</Text>
                    <Text>--:--</Text>
                    <Text>--:--</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>

          <View style={estilos.viewPeriodo}>
            <View>
              <Button style={estilos.viewPeriodoBotao} $_text-color="black">
                <ButtonText>Dia</ButtonText>
              </Button>
            </View>

            <View>
              <Button style={estilos.viewPeriodoBotao} $_text-color="black">
                <ButtonText>Jornada</ButtonText>
              </Button>
            </View>
          </View>
        </View>
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
    marginRight: 10,
    padding: 10,
  },
  menuTexto: {
    fontSize: 18,
    fontWeight: "bold",
  },
  menuAvatar: {
    marginTop: 60,
  },
  menuNaveg: {
    alignItems: "flex-start",
  },

  imagem: {
    justifyContent: "center",
    alignItems: "center",

    marginTop: 20,
  },
  selecao: {
    justifyContent: "center",
    width: "85%",
    borderColor: "blue",
    marginBottom: 30,
  },
  selecaoEspaco: {
    justifyContent: "center",
    alignItems: "center",
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
  texto: {
    fontWeight: "bold",
    fontSize: 16,
  },
  viewInfoHora: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  viewPeriodo: {
    width: "90%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  viewPeriodoBotao: {
    width: "84%",

    marginBottom: "6%",
    borderRadius: 40,
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderColor: "#217dde",
    borderWidth: 1,
  },
});
