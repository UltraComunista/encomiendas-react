import ModernizeLayout from '@/Layouts/ModernizeLayout'
import { Grid, Card, CardContent, Typography } from '@mui/material'

export default function Dashboard(){
  return (
    <ModernizeLayout title="Dashboard">
      <Grid container spacing={2}>
        {[1,2,3].map(i=>(
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1">Card {i}</Typography>
                <Typography variant="body2" color="text.secondary">Contenido…</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ModernizeLayout>
  )
}
