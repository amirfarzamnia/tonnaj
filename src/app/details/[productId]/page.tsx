'use client';

import { useShop } from '@/context/shopContext';
import { CartTypes } from '@/types/types';
import { Call, Person, Person2Sharp, Star, StarBorder } from '@mui/icons-material';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Image } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default ({ params }: { params: { productId: string } }) => {
    const [findCart, setFindCart] = useState<CartTypes>();
    const [error, setError] = useState(false);
    const { cartItems } = useShop();

    useEffect(() => {
        if (params.productId) {
            const findCartInContext = cartItems.find((item) => item.id === params.productId);
            findCartInContext ? setFindCart(findCartInContext) : setError(true);
        }
    }, [params]);

    return (
        <Stack direction={'row'} className="items-start justify-center w-full h-auto *:mb-5 *:mt-6">
            <Box component={'section'} className="w-[45%] flex flex-col items-center justify-center">
                <Box component={'div'} className="w-fit h-fit">
                    <Image loading="lazy" src={findCart?.image} className="w-[470px] h-[360px]" />
                </Box>
                <Box component={'div'} className="w-[470px] h-[350px] p-2 rounded-xl mt-2 shadow-bg shadow-black bg-white/85">
                    <Box component={'div'} className="h-auto w-auto mt-4 p-2 flex justify-center pb-5 border-gray-300 border-b-3">
                        <Box className="text-[20px]" color={'black'}>
                            <Person2Sharp sx={{ fontSize: 70 }} />
                        </Box>
                        <Box className="mt-6 text-center">
                            <Typography color={'black'} sx={{ lineHeight: 1.5 }} variant="h5">
                                {' '}
                                من یک کشاورز و عضو سروبان هستم. محصول من سیب زمینی از همدان بهار است.
                            </Typography>
                            <Typography color={'black'} sx={{ lineHeight: 1.5 }} variant="h5">
                                خوشحال میشم برای ارتباط مستقیم با من از طریق دکمه زیر اقدام کنید
                            </Typography>
                        </Box>
                    </Box>
                    <Box component={'div'} className="flex items-center justify-center w-full h-[90px]">
                        <Box component={'div'} className="w-full flex items-center justify-center">
                            <Button size="large" variant="contained" color="error" className="w-[90%] h-[7vh] flex items-center justify-center text-[20px]" sx={{ borderRadius: '15px' }}>
                                <p>تماس با فروشنده</p>
                                <Call className="absolute mr-48 animate-bounce scale-[1.3] p-1 bg-red-600 rounded-lg" sx={{ fontSize: 50 }} />
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box className="w-[45%] flex items-center justify-start">
                <Box component={'div'} className="w-[78%] bg-white/80 drop-shadow-2xl rounded-lg *:p-2">
                    <Box className="mr-2">
                        <Typography sx={{ color: 'rgb(77, 77, 77)' }} fontSize={40} fontWeight={'bold'} variant="h5">
                            {findCart?.title}
                        </Typography>
                    </Box>
                    <Box component={'div'} className="flex items-center justify-center border-b-3 border-red-900 w-fit" dir="ltr">
                        {Array.from({ length: 5 }).map((_, index) => {
                            return index != 4 ? <Star sx={{ color: '#b91c1c' }} key={index} /> : <StarBorder sx={{ color: '#b91c1c' }} key={index} />;
                        })}
                    </Box>
                    <Box className="flex items-center justify-around">
                        <Button>گفتگو با فروشنده</Button>
                    </Box>
                </Box>
            </Box>
        </Stack>
    );
};
