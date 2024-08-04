'use client'

import { useBlog } from "@/contexts/blog"
import { BlogTypes } from "@/types/types"
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"

export default ({ params }: { params: { name: string } }) => {
    const { blogItems } = useBlog()
    const [categoriesItems, setCategoriesItems] = useState<BlogTypes[]>()
    const [error, setError] = useState(false)

    useEffect(() => {
        if (params.name) {
            const param = decodeURI(params.name)

            const findCategories = blogItems.filter(item => item.categories.includes(param))

            findCategories.length >= 1 ? setCategoriesItems(findCategories) : setError(true)
        }
    }, [])


    return <Stack maxWidth={'100%'}>
        {error ? <Container component={'div'} maxWidth={'xl'} sx={{ display: "flex", justifyItems: "center", alignItems: 'center', maxHeight: "50vh" }}>
            <Typography variant="h4">
                چیزی یافت نشد
            </Typography>
        </Container> :
            <Grid container spacing={2} maxWidth={'100%'} sx={{ padding: 4, placeContent: "end" }}>
                {categoriesItems?.map((item, index) => {
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
        }
    </Stack>
}