'use client'

import { useBlog } from '@/contexts/blog';
import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Button, Link } from '@nextui-org/react';

export default () => {
    const { blogItems } = useBlog()

    return (
        <Grid className="grid grid-cols-3 gap-14 place-items-center w-full p-3" dir="ltr">
            {blogItems.map((item, index) => {
                return <Card sx={{ maxWidth: 345 }}>
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
            })}
        </Grid>
    );
};
