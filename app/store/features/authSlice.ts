import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthUser } from "@/app/types";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

// Mock authentication function
const mockAuthCheck = (email: string, password: string): Promise<AuthUser> => {
  return new Promise((resolve, reject) => {
    if (email === "admin@example.com" && password === "admin123") {
      resolve({
        id: "1",
        email: "admin@example.com",
        name: "Admin User",
      });
    } else {
      reject(new Error("Invalid credentials"));
    }
  });
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const user = await mockAuthCheck(email, password);
    // Store in localStorage
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
  return null;
});

// Initialize state from localStorage if available
const getInitialUser = (): AuthUser | null => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

const initialState: AuthState = {
  user: getInitialUser(),
  isAuthenticated: !!getInitialUser(),
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Login failed";
        state.isAuthenticated = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "idle";
        state.error = null;
      });
  },
});

export default authSlice.reducer;
