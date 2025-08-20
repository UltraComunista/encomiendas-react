import { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import {
  AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItemButton,
  ListItemIcon, ListItemText, Box, Divider, Button, Collapse
} from '@mui/material'
import {
  Menu as MenuIcon, Dashboard, People, Store, Route as RouteIcon,
  LocalShipping, Logout, ExpandLess, ExpandMore
} from '@mui/icons-material'

const drawerWidth = 260

// Define aquí tu menú (puedes anidar submenús)
const nav = [
  { label: 'Dashboard',  icon: <Dashboard fontSize="small"/>, href: '/dashboard' },
  { label: 'Usuarios',   icon: <People fontSize="small"/>,    href: '/admin/users' },
  {
    label: 'Encomiendas', icon: <LocalShipping fontSize="small"/>,
    children: [
      { label: 'Sucursales',  icon: <Store fontSize="small"/>,    href: '/admin/branches' },
      { label: 'Rutas',       icon: <RouteIcon fontSize="small"/>,href: '/admin/routes' },
      { label: 'Órdenes',     icon: <LocalShipping fontSize="small"/>, href: '/admin/shipments' },
    ]
  },
]

function MenuItem({ item }) {
  const [open, setOpen] = useState(true)

  if (item.children?.length) {
    return (
      <>
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map(child => (
              <ListItemButton
                key={child.href}
                component={Link}
                href={child.href}
                sx={{ pl: 5 }}
              >
                <ListItemIcon>{child.icon}</ListItemIcon>
                <ListItemText primary={child.label} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </>
    )
  }

  return (
    <ListItemButton component={Link} href={item.href}>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.label} />
    </ListItemButton>
  )
}

export default function ModernizeLayout({ title='Panel', children }) {
  const [open, setOpen] = useState(true)
  const { auth } = usePage().props

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Topbar */}
      <AppBar position="fixed" elevation={0}
        sx={{ bgcolor: 'background.paper', color: 'text.primary', borderBottom: '1px solid #eaeef4' }}>
        <Toolbar sx={{ gap: 1 }}>
          <IconButton edge="start" onClick={() => setOpen(!open)}><MenuIcon /></IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>{title}</Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>{auth?.user?.name}</Typography>
          <Link as="button" method="post" href={route('logout')}>
            <Button color="error" startIcon={<Logout/>}>Salir</Button>
          </Link>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer variant="persistent" open={open}
        sx={{
          width: drawerWidth, flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', borderRight: '1px solid #eaeef4' }
        }}>
        <Toolbar />
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
            Encomiendas · Admin
          </Typography>
          <Divider sx={{ mb: 1 }}/>
          <List>
            {nav.map(item => <MenuItem key={item.label} item={item} />)}
          </List>
        </Box>
      </Drawer>

      {/* Contenido */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
        <Toolbar />
        <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
