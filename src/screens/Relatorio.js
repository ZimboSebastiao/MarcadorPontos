import * as React from "react";
import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
// import { auth } from "../../firebase.config";

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
import { ButtonText } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Relatorio({ navigation }) {
  const { email, displayName: nome } = auth.currentUser;
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    console.log("Selecionando imagem...");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    console.log("Resultado:", result);
  
    if (!result.cancelled && result.assets && result.assets.length > 0 && result.assets[0].uri) {
      console.log("Imagem selecionada:", result.assets[0].uri);
      setImage(result.assets[0].uri);
      // Armazena a URI da imagem selecionada no AsyncStorage
      try {
        await AsyncStorage.setItem('profileImageUri', result.assets[0].uri);
      } catch (error) {
        console.log('Erro ao salvar a URI da imagem no AsyncStorage:', error);
      }
    } else {
      console.log("URI da imagem é inválida.");
    }
    
    
  };
  
  useEffect(() => {
    const loadProfileImageUri = async () => {
      try {
        const uri = await AsyncStorage.getItem('profileImageUri');
        if (uri !== null) {
          setImage(uri);
        }
      } catch (error) {
        console.log('Erro ao carregar a URI da imagem do AsyncStorage:', error);
      }
    };
  
    loadProfileImageUri();
  }, []);
  
  
  


  
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
              color="white"
            />
            <Text style={estilos.menuTexto}>Relatório</Text>
            <Avatar bgColor="$amber600" size="md" borderRadius="$full">
              <AvatarFallbackText>{nome || "Visitante"}</AvatarFallbackText>
              <AvatarImage source={image ? { uri: image } : null} alt="Foto do perfil" />
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
                 <TouchableOpacity onPress={pickImage}>
                  <Avatar size="2xl">
                    <AvatarFallbackText>SS</AvatarFallbackText>
                    {image ? (
                    <AvatarImage source={{ uri: image }} alt="Foto do perfil" />
                  ) : (
                    <AvatarImage source={require('./../../assets/images/icon.png')} alt="Foto do perfil padrão" />
    )}
                  </Avatar>
                </TouchableOpacity>
                <VStack>
                  <Heading style={{color: "#ff7938"}} size="sm">{nome || "Visitante"}</Heading>
                  <Text size="sm">Developer</Text>
                </VStack>
              </HStack>
            </VStack>
          </View>

          <View style={estilos.selecaoEspaco}>
            <Select style={estilos.selecao}>
              <SelectTrigger variant="rounded" size="sm" borderColor="#ff7938">
                <SelectInput placeholder="Selecione um Período" />
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
                      Média de horas em pausa:
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
                <ButtonText style={{color: "white"}}>Dia</ButtonText>
              </Button>
            </View>

            <View>
              <Button style={estilos.viewPeriodoBotao} $_text-color="black">
                <ButtonText style={{color: "white"}}>Jornada</ButtonText>
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
    marginRight: 10,
    padding: 20,
    width: "100%", 
    backgroundColor: "#ff7938",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  menuTexto: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },


  imagem: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  selecao: {
    justifyContent: "center",
    width: "85%",
    borderColor: "#ff7938",
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
    backgroundColor: "#ff7938",
    borderColor: "#ff7938",
    borderWidth: 1,
  },
});
