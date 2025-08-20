import { createRoot } from 'react-dom/client'
import { createInertiaApp, InertiaProgress } from '@inertiajs/react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary:   { main: '#5D87FF' },
    secondary: { main: '#49BEFF' },
    background:{ default: '#f6f9fc', paper: '#fff' },
  },
  shape: { borderRadius: 10 },
})

InertiaProgress.init({ color: '#5D87FF' })

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App {...props} />
      </ThemeProvider>
    )
  },
})
