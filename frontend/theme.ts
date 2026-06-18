'use client'

import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff6b35',
    },
    secondary: {
      main: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
  },
})

export default theme