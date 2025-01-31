// store/userSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAddress,
  Coordinates,
  AddressData,
} from "../../services/apiGeocoding";

interface UserState {
  username: string;
  status: "idle" | "loading" | "error"; // status types
  position: Coordinates | null;
  address: string | null;
  error: string | null;
}

const initialState: UserState = {
  username: "",
  status: "idle",
  position: null,
  address: null,
  error: null,
};

// Function to get geolocation position
function getPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// Function to fetch the user's address
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async (): Promise<{ position: Coordinates; address: string }> => {
    try {
      // 1) Get the user's geolocation position
      const positionObj = await getPosition();
      const position: Coordinates = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
      };

      // 2) Use a reverse geocoding API to get a formatted address
      const addressObj: AddressData = await getAddress(position);
      const address =
        `${addressObj.locality || ""}, ${addressObj.city || ""} ${addressObj.postcode || ""}, ${addressObj.countryName || ""}`.trim();

      // 3) Return an object with the data
      return { position, address };
    } catch (error) {
      throw new Error("Failed to fetch address");
    }
  },
);

// Redux slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "idle";
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error =
          "There was a problem getting your address. Make sure to fill this field!";
      });
  },
});

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
