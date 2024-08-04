'use client';

import { LocationOn, SupervisedUserCircle } from '@mui/icons-material';
import { Box, Button, Tooltip } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface props {
    title?: string;
    image?: string;
    author?: string;
    locationName?: string;
    description?: string;
}

export default function Cart({ title, image, author, locationName, description }: props) {
    const router = useRouter();

    return (
        <Tooltip title="برای دیدن اطلاعات کلیک کنید" placement="bottom" slotProps={{ tooltip: { className: 'bg-black' } }}>
            <Box component="div" className="cursor-pointer w-[280px] h-[390px] group rounded-t-sm rounded-b-2xl drop-shadow-2xl transition-all duration-300 ease-out shadow-bg shadow-transparent bg-white hover:shadow-black/60" dir="rtl">
                <div className="object-cover overflow-hidden">
                    <img src={image} loading="lazy" className="h-[155px] rounded-t-sm transition-transform duration-300 group-hover:scale-125 group-hover:rotate-3" alt="" />
                </div>
                <div className="p-1 text-xl">
                    <div className="text-green-600">
                        <h4>{title}</h4>
                    </div>
                    <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyItems: 'center', height: '17vh' }}>
                        <div className="flex text-xs">
                            <div className="mt-2 w-fit h-fit border-l-2 pl-2 border-gray-500">
                                <div className="flex items-center justify-center w-fit">
                                    <SupervisedUserCircle className="ml-0.5 text-black/60" />
                                    <p className="text-gray-400">{author}</p>
                                </div>
                            </div>
                            <div className="mt-2 w-fit h-fit pl-2 border-gray-500">
                                <div className="flex items-center justify-center w-fit">
                                    <LocationOn className="mr-0.5 text-black/60" />
                                    <p className="text-gray-400">{locationName}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-1 text-sm p-1 text-wrap whitespace-break-spaces text-gray-600/85">
                            <p>{description}</p>
                        </div>
                    </Box>
                </div>
                <div className="flex items-center justify-center">
                    <Button variant="outlined" color="error" size="large" sx={{ 'borderRadius': '16px', 'scale': '1.2', ':hover': { backgroundColor: '#ef4444', color: 'white' } }}>
                        تماس با فروشنده
                    </Button>
                </div>
            </Box>
        </Tooltip>
    );
}
