import { Box, Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material';
import { Button, Link } from '@nextui-org/react';

export default () => {
    return (
        <Grid className="grid grid-cols-3 gap-14 place-items-center w-full p-3" dir="ltr">
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia component="img" alt="green iguana" height="140" image="/card2.jpg" />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions className="flex items-center justify-center">
                    <Button size="sm" as={Link} href="/">
                        ادامه
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};
