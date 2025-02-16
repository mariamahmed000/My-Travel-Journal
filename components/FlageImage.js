import { Image, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export function FlagImage({ source, style }) {
    if (!source?.uri) {
      return (
        <View style={[style, { backgroundColor: Colors.grey }]}>
          <Text>Image unavailable</Text>
        </View>
      );
    }
    return <Image source={source} style={style} />;
  }
  