'use client';

import * as React from 'react';
import { makeStyles, styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { LocationOn, Pin, PinDrop, PinDropSharp, SupervisedUserCircle } from '@mui/icons-material';
import { Button, Container } from '@mui/material';

const style = styled('button')(
    ({ theme }) => `
    &:hover {
      background-color: red;
    }
  `
);

export default () => {
    return (
        <div className="w-full h-auto flex p-2 mt-2">
            <div className="w-[20%] flex items-center justify-center">lorem</div>

            <div className="w-[57%] h-auto text-white">
                <div></div>

                <div className="w-full h-auto grid gap-5 grid-flow-row-dense grid-cols-3 justify-items-center place-items-center" dir="ltr">
                    <div className="w-[285px] h-[390px] group rounded-t-none rounded-b-2xl bg-white" dir="rtl">
                        <div className="object-cover">
                            <img src="/card.jpg" className="h-[155px] transition-all duration-200" alt="" />
                        </div>
                        <div className="p-1 text-2xl">
                            <div className="text-green-600">
                                <h4>فروش سیب زمینی</h4>
                            </div>
                            <Box component={'div'} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyItems: 'center', height: '17vh' }}>
                                <div className="flex">
                                    <div className="mt-2 w-fit h-fit border-l-2 pl-2 border-gray-500">
                                        <div className="flex items-center justify-center w-fit">
                                            <SupervisedUserCircle className="ml-0.5 text-black/60" />
                                            <p className="text-xs text-gray-400">رکنی</p>
                                        </div>
                                    </div>
                                    <div className="mt-2 w-fit h-fit pl-2 border-gray-500">
                                        <div className="flex items-center justify-center w-fit">
                                            <LocationOn className="mr-0.5 text-black/60" />
                                            <p className="text-xs text-gray-400">بهار</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-1 text-sm p-1 text-wrap whitespace-break-spaces text-gray-600/85">
                                    <p>سیب زمینی...</p>
                                </div>
                            </Box>
                        </div>

                        <div className="flex items-center justify-center">
                            <Button href="/s" variant="outlined" color="error" size="large" className={`hover:bg-red-500 ${style}`} sx={{ 'borderRadius': '16px', 'scale': '1.2', ':hover': { backgroundColor: '#ef4444', color: 'white' } }}>
                                تماس با فروشنده
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
