import {
  Avatar,
  AvatarFallbackText,
  VStack,
  HStack,
  AvatarBadge,
  Heading,
  Text,
  GluestackUIProvider,
  AvatarImage
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { useRef, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
// import { auth } from "../../firebase.config";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UsuarioAvatar() {
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
    <GluestackUIProvider config={config}>
      <View style={estilos.container}>
        <VStack space="2xl">
          <HStack space="md">
            <Avatar bgColor="$indigo600">
              <AvatarFallbackText>{nome || "Visitante"}</AvatarFallbackText>
              <AvatarImage source={image ? { uri: image } : null} alt="Foto do perfil" />
              <AvatarBadge $dark-borderColor="$black" />
            </Avatar>
            <VStack>
              <Heading size="sm">{nome || "Visitante"}</Heading>
              <Text size="sm">Developer</Text>
            </VStack>
          </HStack>
        </VStack>
      </View>
    </GluestackUIProvider>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: 8,
    marginVertical: 70,
  },
});
