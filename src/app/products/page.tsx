'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

export default () => {
    return (
        <div className="w-full h-auto flex mt-2">
            <div className="w-[80%] flex items-center justify-end bg-white">
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid xs={6}>
                        <Item></Item>
                    </Grid>
                    <Grid xs={6}>
                        <Item>2</Item>
                    </Grid>
                    <Grid xs={6}>
                        <Item>3</Item>
                    </Grid>
                    <Grid xs={6}>
                        <Item>4</Item>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};
