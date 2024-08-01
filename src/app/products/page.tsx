'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { SupervisedUserCircle } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

export default () => {
    return (
        <div className="w-full h-auto flex p-2 mt-2">
            <div className="w-[20%] flex items-center justify-center">lorem</div>

            <div className="w-[57%] h-auto text-white">
                <div></div>

                <div className="w-full h-auto bg-gray-300 grid gap-5 grid-flow-row-dense grid-cols-3 justify-items-center place-items-center" dir="ltr">
                    <div className="w-[285px] h-[380px] group rounded-t-none rounded-b-2xl bg-white" dir="rtl">
                        <div className="object-cover">
                            <img src="/card.jpg" className="h-[155px] transition-all duration-200" alt="" />
                        </div>
                        <div className="p-1 text-2xl">
                            <div className="text-green-600">
                                <h4>فروش سیب زمینی</h4>
                            </div>
                            <div>
                                <div className="flex items-center justify-center w-fit">
                                    <SupervisedUserCircle className="ml-1 text-black/60" />
                                    <p className="text-lg text-gray-400">رکنی</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
