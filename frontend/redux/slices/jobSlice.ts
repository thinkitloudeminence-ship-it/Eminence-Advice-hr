import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface JobState {
  jobs: any[]
  currentJob: any | null
  isLoading: boolean
  error: string | null
}

const initialState: JobState = {
  jobs: [],
  currentJob: null,
  isLoading: false,
  error: null,
}

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (params?: any) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, { params })
    return response.data
  }
)

export const fetchJobById = createAsyncThunk(
  'jobs/fetchJobById',
  async (id: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`)
    return response.data
  }
)

export const applyForJob = createAsyncThunk(
  'jobs/applyForJob',
  async (formData: FormData) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/applications`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  }
)

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearCurrentJob: (state) => {
      state.currentJob = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.jobs = action.payload.data
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch jobs'
      })
      .addCase(fetchJobById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentJob = action.payload.data
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch job'
      })
  },
})

export const { clearCurrentJob } = jobSlice.actions
export default jobSlice.reducer