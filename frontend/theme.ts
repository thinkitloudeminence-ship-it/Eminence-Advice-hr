// import { createTheme } from '@mui/material/styles'

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//       light: '#42a5f5',
//       dark: '#1565c0',
//     },
//     secondary: {
//       main: '#dc004e',
//       light: '#ff4081',
//       dark: '#c51162',
//     },
//     background: {
//       default: '#f5f5f5',
//       paper: '#ffffff',
//     },
//   },
//   typography: {
//     fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
//     h1: {
//       fontWeight: 700,
//     },
//     h2: {
//       fontWeight: 600,
//     },
//     h3: {
//       fontWeight: 600,
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: 'none',
//           borderRadius: 8,
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: 12,
//           boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//         },
//       },
//     },
//   },
// })

// export default theme
'use client'

import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
})

export default theme