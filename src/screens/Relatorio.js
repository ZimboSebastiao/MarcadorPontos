import * as React from "react";
import { useRef, useEffect, useState } from "react";
import { Alert, StatusBar, StyleSheet, View } from "react-native";

import {
  GluestackUIProvider,
  Text,
  Icon,
  ClockIcon,
  MenuIcon,
  Avatar,
  AvatarFallbackText,
  CircleIcon,
  VStack,
  HStack,
  AvatarBadge,
  AvatarImage,
  Heading,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { Actionsheet } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { ActionsheetContent } from "@gluestack-ui/themed";

export default function Relatorio({ navigation }) {
  return (
    <>
      <StatusBar />
      <GluestackUIProvider config={config}>
        <View style={estilos.container}>
          <View style={estilos.menu}>
            <Icon
              onPress={() => navigation.openDrawer()}
              as={MenuIcon}
              m="$3"
              w="$10"
              h="$6"
            />
            <Text style={estilos.menuTexto}>Relatório</Text>
            <Avatar bgColor="$amber600" size="md" borderRadius="$full">
              <AvatarFallbackText>Zimbo Sebastião</AvatarFallbackText>
            </Avatar>
          </View>

          <View>
            <VStack space="2xl">
              <HStack space="md">
                <Avatar>
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
  menuNaveg: {
    alignItems: "flex-start",
  },
});
