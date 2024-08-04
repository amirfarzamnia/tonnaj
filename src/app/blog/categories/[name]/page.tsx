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
        {error ? <Container></Container> :
            <Grid container spacing={2} maxWidth={'100%'} sx={{ padding: 4, placeContent: "end" }}>
                {categoriesItems?.map((item, index) => {
                    return <Grid item key={index}>
                        <Card sx={{ maxWidth: 345 }} key={index}>
                            <CardMedia component="img" alt="img" height={140} image={item.image} sx={{ borderRadius: '10px' }} />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
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