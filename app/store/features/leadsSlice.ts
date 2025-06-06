import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Lead, LeadFormData } from "@/app/types";

export const createLead = createAsyncThunk(
  "leads/createLead",
  async (formData: FormData) => {
    const response = await fetch("/api/leads", {
      method: "POST",
      body: formData,
    });
    return response.json();
  }
);

export const fetchLeads = createAsyncThunk("leads/fetchLeads", async () => {
  const response = await fetch("/api/leads");
  return response.json();
});

export const updateLeadStatus = createAsyncThunk(
  "leads/updateStatus",
  async (
    { id, status }: { id: string; status: Lead["status"] },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.error || "Failed to update lead status"
        );
      }

      return response.json();
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    items: [] as Lead[],
    status: "idle",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateLeadStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (lead) => lead.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default leadsSlice.reducer;
