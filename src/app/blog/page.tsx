'use client'

import { useBlog } from '@/contexts/blog';
import { Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material';
import { Button, Link } from '@nextui-org/react';

export default () => {
    const { blogItems } = useBlog()

    return (
        <Stack maxWidth={'100%'} sx={{ backgroundColor: "white" }}>
            <Grid container spacing={2} dir="ltr" maxWidth={'100%'}>
                {blogItems.map((item, index) => {
                    return <Grid item key={index}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia component="img" alt="img" height="140" image={item.image} />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description}
                                </Typography>
                            </CardContent>
                            <CardActions className="flex items-center justify-center">
                                <Button size="sm" as={Link} href={`/blog/${item.id}`}>
                                    ادامه
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                })}
            </Grid>
        </Stack>
    );
};
