import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURL } from "../../constant/ApiUrl";
import axios from "axios";

export const GetAllCountries = createAsyncThunk(
  "GetAllCountries",
  async (_, thunkAPI) => {
    const response = await axios.get(APIURL + "/all");
    return response.data;
  }
);

const destinationSlice = createSlice({
  name: "destination",
  initialState: {
    country: [],
    loading: true,
    error: false,
  },
  reducers: {
    addDestination: (state, action) => {
      state.country.unshift({
        name: { common: action.payload.title },
        capital: action.payload.description,
        region: "",
        countryImage: { uri: action.payload.image },
        countryCode: Date.now(),
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllCountries.fulfilled, (state, action) => {
        state.country = action.payload.map((country) => {
          return {
            name: country?.name,
            capital: country?.capital?.[0] || "No capital",
            region: country?.region,
            countryImage: { uri: country?.flags?.png },
            countryCode: country?.cca3,
          };
        });
        state.loading = false;
      })
      .addCase(GetAllCountries.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      });
  },
});
export const { addDestination } = destinationSlice.actions;
export default destinationSlice.reducer;
