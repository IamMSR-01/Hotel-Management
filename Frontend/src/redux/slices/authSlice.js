import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axios";

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (FormData, thunkAPI) => {
    try {
      await API.post("/users/login", FormData);
      return thunkAPI.dispatch(fetchMe());
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (FormData, thunkAPI) => {
    try {
      await API.post("/users/register", FormData);
      return thunkAPI.dispatch(fetchMe());
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Async thunk for fetching user profile
export const fetchMe = createAsyncThunk("auth/fetchMe", async (_, thunkAPI) => {
  try {
    const response = await API.get("/users/profile/me");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch user profile"
    );
  }
});

//  Async thunk for logout
export const logoutUserThunk = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await API.post("/users/logout");
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })

      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
