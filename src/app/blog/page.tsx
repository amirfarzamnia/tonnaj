'use client'

import { useBlog } from '@/contexts/blog';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material';

export default () => {
    const { blogItems } = useBlog()

    return (
        <Stack maxWidth={'100%'} >
            <Grid container spacing={2} dir="ltr" maxWidth={'100%'}>
                {blogItems.map((item, index) => {
                    return <Grid item key={index}>
                        <Card sx={{ width: 345, height: 375 }}>
                            <CardMedia component="img" alt="img" sx={{ objectFit: "cover", height: 200 }} image={item.image} />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary" sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 4,  // تعداد خطوطی که می‌خواهید نمایش داده شود
                                    WebkitBoxOrient: "vertical",
                                    height: 95,
                                }}>
                                    {item.description}
                                </Typography>
                            </CardContent>
                            <CardActions className="flex items-center justify-center">
                                <Button href={`/blog/${item.id}`}>
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
