'use client';

import Cart from '@/components/card';
import { useShop } from '@/context/shopContext';
import { CartTypes } from '@/types/types';
import { Call, Check, Person2Sharp, Star, StarBorder } from '@mui/icons-material';
import { Box, Button, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import { Image } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { BsTelegram, BsWhatsapp } from 'react-icons/bs';
import { FaBarcode, FaLeaf, FaLocationArrow, FaTag } from 'react-icons/fa';
import { IoIosLeaf } from 'react-icons/io';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default ({ params }: { params: { productId: string } }) => {
    const [findCart, setFindCart] = useState<CartTypes>();
    const [offers, setOffers] = useState<CartTypes[]>([]);
    const [error, setError] = useState(false);
    const { cartItems } = useShop();

    useEffect(() => {
        if (params.productId) {
            const findCartInContext = cartItems.find((item) => item.id === params.productId);
            const findOffers = cartItems.filter((item) => item.product_type === findCartInContext?.product_type);

            findCartInContext ? setFindCart(findCartInContext) : setError(true);
            findOffers ? setOffers(findOffers) : null;
        }
    }, [params]);

    const infos = [
        {
            icon: <FaLeaf />,
            title: 'نوع محصول',
            value: findCart?.product_type
        },
        {
            icon: <FaLocationArrow />,
            title: 'موقعیت مکانی',
            value: `${findCart?.location.city} - ${findCart?.location.state}`
        },
        {
            icon: <Check />,
            title: 'نحوه معامله',
            value: findCart?.trade
        },
        {
            icon: <Check />,
            title: 'درجه کیفی',
            value: findCart?.quality_grade
        },
        {
            icon: <Check />,
            title: 'منبع تولید',
            value: findCart?.source
        },
        {
            icon: <IoIosLeaf />,
            title: 'تعداد/مقدار',
            value: findCart?.count
        },
        {
            icon: <FaBarcode />,
            title: 'حداقل سفارش',
            value: findCart?.minimum_order ? 'دارد' : 'ندارد'
        },
        {
            icon: <BiUser fontWeight={'bold'} />,
            title: 'فروشنده',
            value: findCart?.author
        },
        {
            icon: <FaTag />,
            title: 'کد محصول',
            value: findCart?.id
        },
        {
            icon: <Check />,
            title: 'وضعیت',
            value: findCart?.condition ? 'موجود' : 'نا موجود'
        }
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };

    return (
        <Stack direction={'column'} className="items-start justify-center w-full h-auto *:mb-5 *:mt-6">
            <Box flexDirection={'row'} className="flex w-full">
                <Box component={'section'} className="w-[45%] flex flex-col items-center justify-start">
                    <Box component={'div'} className="w-fit h-fit flex items-center justify-center">
                        <Swiper
                            className="w-[470px]"
                            // install Swiper modules
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={50}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}>
                            {findCart?.image.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <Image loading="lazy" src={item} className="w-[470px] h-[350px]" />
                                    </SwiperSlide>
                                );
                            })}
                            ...
                        </Swiper>
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
                                    <Call className="absolute mr-56 animate-bounce scale-[1.3] p-1 bg-red-600 rounded-lg" sx={{ fontSize: 50 }} />
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box className="w-[49%] flex flex-col items-center justify-start">
                    <Box component={'div'} className="w-[78%] bg-white/80 drop-shadow-2xl rounded-lg p-3 *:p-2">
                        <Box className="mr-2">
                            <Typography fontSize={40} fontWeight={'bold'} variant="h5">
                                {findCart?.title}
                            </Typography>
                        </Box>
                        <Box component={'div'} className="flex items-center justify-center border-b-3 border-red-900 w-fit mb-5" dir="ltr">
                            {Array.from({ length: 5 }).map((_, index) => {
                                return index != 4 ? <Star sx={{ color: '#b91c1c', fontSize: 17 }} fontSize="small" key={index} /> : <StarBorder sx={{ color: '#b91c1c', fontSize: 17 }} fontSize="small" key={index} />;
                            })}
                        </Box>
                        <Box className="flex items-center justify-around">
                            <Button variant="contained" sx={{ 'color': 'white', 'backgroundColor': 'green', 'borderRadius': '15px', 'border': '2px solid', 'borderColor': 'transparent', ':hover': { backgroundColor: 'transparent', color: 'black', borderColor: 'black' } }} className="scale-[1.1] w-[45%] transition-all duration-300">
                                گفتگو با فروشنده
                            </Button>
                            <Button variant="contained" sx={{ 'color': 'black', 'backgroundColor': 'transparent', 'borderRadius': '15px', 'border': '2px solid', 'borderColor': 'green', ':hover': { backgroundColor: 'green', color: 'white', borderColor: 'transparent' } }} className="scale-[1.1] w-[45%] transition-all duration-300">
                                ثبت سفارش
                            </Button>
                        </Box>
                        <Box marginTop={'15px'}>
                            <Typography variant="subtitle2" className="font-thin font-serif text-gray-600">
                                {findCart?.pageTitle}
                            </Typography>
                        </Box>

                        <Box flex={1} marginTop={5}>
                            {infos.map((item, index) => {
                                return (
                                    <Box key={index} className="flex items-center" borderBottom={2} borderColor={'#9ca3af'} padding={1.5}>
                                        <Box className="flex items-center justify-start text-[20px]">
                                            <Box className="ml-3 text-green-950">{item.icon}</Box>
                                            <Box>
                                                <Typography variant="h5" color={'#052e16'} className="text-green-800" fontWeight={'bold'}>
                                                    {item.title} :
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box className="mr-2">
                                            {index == 0 ? (
                                                <Link href={`/search/${item.value}`} variant="h6" color={'#15803d'} sx={{ textDecoration: 'none' }}>
                                                    {item.value}
                                                </Link>
                                            ) : (
                                                <Typography variant="h6" color={'#166534'}>
                                                    {item.value}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Box>

                        <Box className="mt-5">
                            <Box>
                                <Typography fontSize={28} variant="h4">
                                    قیمت پیشنهادی فروشنده : {findCart?.price}
                                </Typography>
                                <Typography fontSize={13} className="text-gray-600">
                                    بروزرسانی : امروز
                                </Typography>
                            </Box>
                            <Box className="mt-3 p-1 text-red-900">
                                <Typography>توجه : قیمت این محصول توسط فروشنده پیشنهاد شده است. اگر آماده خرید این محصول با قیمت دیگری هستید پیشنهاد دهید</Typography>
                            </Box>
                            <Box className="flex items-center justify-center p-1 mt-3">
                                <Button variant="contained" sx={{ 'width': '90%', 'fontSize': '20px', 'height': '6.5vh', 'color': 'white', 'backgroundColor': 'green', 'borderRadius': '15px', 'border': '2px solid', 'borderColor': 'transparent', ':hover': { backgroundColor: 'transparent', color: 'black', borderColor: 'black' } }} className="scale-[1.1] w-[45%] transition-all duration-300">
                                    پیشنهاد قیمت بدهید
                                </Button>
                            </Box>
                            <Box className="mt-8">
                                <Typography color={'black'} className="text-center">
                                    برای اطلاع از{' '}
                                    <Link sx={{ textDecoration: 'none' }} fontWeight={'thin'} href={`/search/${findCart?.product_type}`} color={'#166534'}>
                                        قیمت روز سیب زمینی
                                    </Link>{' '}
                                    و خرید مستقیم پیام ارسال کنید
                                </Typography>
                                <Typography color={'black'} marginTop={2} className="text-center cursor-pointer">
                                    برای شروع مذاکره دکمه گفتگو با فروشنده را کلیک کنید
                                </Typography>
                            </Box>
                            <Box className="mt-10 flex items-center justify-start p-2">
                                <Button variant="contained" sx={{ 'color': 'green', 'fontSize': 19, 'height': '6vh', 'backgroundColor': 'transparent', 'borderRadius': '15px', 'border': '1px solid', 'borderColor': 'green', ':hover': { backgroundColor: 'green', color: 'white', borderColor: 'transparent' } }} className="scale-[1.1] w-[45%] transition-all duration-300">
                                    خرید امن از تناژ
                                </Button>
                            </Box>
                        </Box>

                        <Box className="mt-12 mb-2 flex items-center justify-center">
                            <Link href={`https://t.me/share/url?url=https://tonnaj.com/details/${findCart?.id}&amp;text=فروش ${findCart?.title}`} marginLeft={1} className="flex items-center justify-center w-fit p-2 rounded bg-gray-400/80" target="_blank">
                                <p className="text-black">واتساپ</p>
                                <BsWhatsapp className="text-green-700 mr-1" fontSize={25} />
                            </Link>

                            <Link href={`https://api.whatsapp.com/send?text=https://tonnaj.com/details/${findCart?.id}/فروش ${findCart?.title}`} className="flex items-center justify-center w-fit p-2 rounded bg-gray-400/80" target="_blank">
                                <p className="text-black">تلگرام</p>
                                <BsTelegram className="text-blue-800 mr-1" fontSize={25} />
                            </Link>

                            <Typography className="text-black" marginRight={2}>
                                :اشتراک گذاری
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box width={'100%'} className="flex items-center justify-center mt-5">
                <Box width={'75%'} height={'17vh'} className="flex items-center justify-center rounded-xl bg-black/50">
                    <Box className="w-[20%] flex items-center justify-center">
                        <Link href="/" className="p-1.5 rounded-xl bg-red-900 text-white border border-transparent transition-all hover:bg-transparent hover:border-white" sx={{ textDecoration: 'none' }}>
                            ثبت درخواست خرید
                        </Link>
                    </Box>
                    <Box className="w-[75%] h-full text-center flex items-center justify-start p-2">
                        <Typography>اگر محصول مورد نظر خود را پیدا نکردید درخواست خرید ثبت کنید تا به بیش از 100 هزار تامین کننده در سامانه سروبان اطلاع رسانی شود و بسیار سریع تر به محصول با قیمت و کیفیت مورد نظر خود برسید.</Typography>
                    </Box>
                </Box>
            </Box>

            <Box className="mt-4 w-full flex flex-col items-center justify-center">
                <Typography>محصولات مشابه در محصولات زراعی</Typography>
                <div className="w-[6%] h-[.5vh] rounded bg-red-900 mt-2"></div>
            </Box>

            <div className="grid grid-cols-4 w-[85%] ml-auto mr-auto place-items-center gap-5">
                {offers.map((item, index) => {
                    return <Cart author={item.author} title={item.title} description={item.description} buttonHref={`${item.buttonHref}/${item.id}`} locationName={item.location.state} image={item.image[0]} key={index} />;
                })}
            </div>

            <Box className="w-full h-auto flex items-center justify-center" marginBottom={5}>
                <Link href={`/search/${findCart?.product_type}`} color={'#fca5a5'} className="p-2 rounded-xl scale-[1.1] bg-transparent border border-red-300 transition-all hover:bg-transparent hover:border-transparent hover:text-white hover:bg-red-600" sx={{ textDecoration: 'none' }}>
                    نمایش همه {findCart?.product_type} ها
                </Link>
            </Box>
        </Stack>
    );
};
