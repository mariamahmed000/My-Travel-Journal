import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { buttonStyles } from "../components/UI/OutlineButton";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { ImagePickers } from "../components/ImagePickers";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../components/ThemeManger";
import { useDispatch } from "react-redux";
import { addDestination } from "../store/redux/Destination";
import { clearAll, getObjectData, storeObjectData } from "../util/AsyncStorage";

function AddDestination() {
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    image: "",
  });
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const { colors } = useContext(ThemeContext);
  const addDestinationStyle = addDestinationStyles(colors);
  const buttonStyle = buttonStyles(colors);
  ///validation
  const AddDestinationSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .required("Pleas Enter Title"),
    description: Yup.string()
      .min(10, "Too Short!")
      .max(50, "Too Long!")
      .required("Pleas Enter Description"),
    image: Yup.string().required("Pleas Enter Image"),
  });

  ///add data from storge before component render
  useLayoutEffect(() => {
    const fetchStorge = async () => {
      const storedData = await getObjectData("formValues");
      if (storedData) {
        setInitialValues(storedData);
      }
    };
    fetchStorge();
  }, []);

///save data in storage
  const AutoSubmitToken = () => {
    const { values } = useFormikContext();
    useEffect(() => {
      const saveFormValues = async () => {
        await storeObjectData("formValues", values);
      };
      saveFormValues();
    }, [values]);
    return null;
  };

  return (
    <View style={addDestinationStyle.container}>
      <Text style={addDestinationStyle.title}>Add New Destination</Text>

      <View style={addDestinationStyle.formContainer}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            dispatch(addDestination(values));
          }}
          validationSchema={AddDestinationSchema}
          enableReinitialize
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            handleReset,
            values,
            errors,
            touched,
          }) => (
            <View>
              <View style={addDestinationStyle.inputContainer}>
                <Text style={addDestinationStyle.label}>Destination Title</Text>
                <TextInput
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
                  style={addDestinationStyle.textInput}
                  placeholder="Enter destination title"
                  placeholderTextColor={colors.secondary + "80"}
                />
                {touched.title && errors.title && (
                  <Text style={addDestinationStyle.errorText}>
                    {errors.title}
                  </Text>
                )}
              </View>

              <View style={addDestinationStyle.inputContainer}>
                <Text style={addDestinationStyle.label}>Description</Text>
                <TextInput
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                  style={[addDestinationStyle.textInput, { height: 100 }]}
                  multiline
                  placeholder="Enter description"
                  placeholderTextColor={colors.secondary + "80"}
                />
                {touched.description && errors.description && (
                  <Text style={addDestinationStyle.errorText}>
                    {errors.description}
                  </Text>
                )}
              </View>
              <View style={addDestinationStyle.inputContainer}>
                <Text style={addDestinationStyle.label}>Image</Text>
                <ImagePickers onImageSelected={(uri) => (values.image = uri)} />
                {touched.image && errors.image && (
                  <Text style={addDestinationStyle.errorText}>
                    {errors.image}
                  </Text>
                )}
              </View>
              <View style={addDestinationStyle.buttonContainer}>
                <TouchableOpacity
                  style={[buttonStyle.outline, { flex: 1 }]}
                  onPress={() => {
                    handleReset();
                    navigate.goBack();
                    clearAll();
                  }}
                >
                  <Text style={buttonStyle.outlineText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[buttonStyle.primary, { flex: 1 }]}
                  onPress={() => {
                    handleSubmit();
                    if (values.title && values.description && values.image) {
                      handleReset();
                      clearAll();
                      navigate.goBack();
                    }
                  }}
                >
                  <Text style={buttonStyle.buttonText}>Save Destination</Text>
                </TouchableOpacity>
              </View>
              <AutoSubmitToken />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}

export default AddDestination;

const addDestinationStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingTop: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 24,
      textAlign: "center",
    },
    formContainer: {
      marginBottom: 24,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      color: colors.secondary,
      marginBottom: 8,
      fontWeight: "500",
    },
    textInput: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.secondary + "20",
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: colors.primary,
      ...Platform.select({
        ios: {
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 24,
      gap: 16,
    },
    errorText: {
      color: "#ff4444",
      fontSize: 14,
      marginTop: 4,
    },
  });
