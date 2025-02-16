import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  launchImageLibraryAsync,
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { useContext, useState } from "react";
import { ThemeContext } from "./ThemeManger";

export function ImagePickers({ onImageSelected }) {
  const { colors } = useContext(ThemeContext);
  const ImagePickerStyle = ImagePickerStyles(colors);
  const [image, setImage] = useState(null);
  const [cameraPermission, requestCamPermission] = useCameraPermissions();
  const [mediaPermission, requestMedPermission] = useMediaLibraryPermissions();

  ////request Camera Permission
  async function requestCameraPermission() {
    if (cameraPermission.status === PermissionStatus.UNDETERMINED) {
      const response = await requestCamPermission();
      return response.granted;
    }

    if (cameraPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this feature.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  }

  ///request Media Permission
  async function requestMediaPermission() {
    if (mediaPermission.status === PermissionStatus.UNDETERMINED) {
      const response = await requestMedPermission();
      return response.granted;
    }

    if (mediaPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant gallery permissions to use this feature.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  }

  /////add photo with camera
  function handleImage(result) {
    if (!result.canceled && result.assets) {
      setImage(result.assets[0].uri);
      if (onImageSelected) {
        onImageSelected(result.assets[0].uri);
      }
    }
  }

  /////add photo from Gallery
  async function pickFromGallery() {
    const hasPermission = await requestMediaPermission();
    if (!hasPermission) return;

    const result = await launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    handleImage(result);
  }

  async function takePhoto() {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    handleImage(result);
  }

  return (
    <>
      <View style={ImagePickerStyle.imageUploadContainer}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={ImagePickerStyle.imagePreview}
          />
        ) : (
          <>
            <Text style={ImagePickerStyle.uploadText}>Tap to add image</Text>
          </>
        )}
      </View>
      <View style={ImagePickerStyle.buttonContainer}>
        <TouchableOpacity
          style={ImagePickerStyle.button}
          onPress={pickFromGallery}
        >
          <Ionicons name="images" size={24} color={colors.accent} />
          <Text style={ImagePickerStyle.buttonText}>Photo Library</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ImagePickerStyle.button} onPress={takePhoto}>
          <Ionicons name="camera" size={24} color={colors.accent} />
          <Text style={ImagePickerStyle.buttonText}>Camera</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const ImagePickerStyles = (colors) =>
  StyleSheet.create({
    imageUploadContainer: {
      borderWidth: 2,
      borderColor: colors.accent + "40",
      borderStyle: "dashed",
      borderRadius: 12,
      height: 150,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 16,
    },
    imagePreview: {
      width: "100%",
      height: "100%",
      borderRadius: 12,
    },
    uploadText: {
      color: colors.accent,
      fontSize: 16,
      marginTop: 8,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.primary,
      padding: 12,
      borderRadius: 8,
      marginHorizontal: 8,
    },
    buttonText: {
      color: colors.white,
      fontSize: 14,
      marginLeft: 8,
    },
  });
