import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeObjectData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // saving error
        console.error('Error storing object data:', e);
    }
};

export const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
      console.error('Error storing data:', e);
    }
  };

 export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
        return value; 
    } catch (e) {
      // error reading value
      console.error('Error retrieving data:', e);
    }
  };

  export const getObjectData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.error('Error retrieving object data:', e);
    }
  };

  export const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }