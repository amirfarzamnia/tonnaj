'use client';

import { Add } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Textarea } from '@nextui-org/react';

export default () => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                console.log('true');
            }}
            className="w-full h-[100vh] mt-10">
            <Box className="w-full h-auto flex items-center justify-center p-2">
                <Box className="w-[90%] h-[30vh] flex items-start justify-center border-3 border-dashed rounded-lg p-2">
                    <label className="w-full flex items-center justify-center" htmlFor="img">
                        <Box>
                            <Box className="flex items-center justify-center">
                                <Add fontSize="large" sx={{ color: 'green', fontWeight: 'bold', scale: '1.1' }} />
                            </Box>

                            <Box className="flex items-center justify-center">
                                <Typography sx={{ marginTop: '10px', fontSize: '18px', fontWeight: 'bold' }}>اضافه کردن عکس محصول</Typography>
                            </Box>

                            <Box sx={{ marginTop: '10px' }}>
                                <Typography fontSize={13}>برای معرفی محصول به خریداران لازم است عکس محصول خود را ارسال کنید. جهت تایید توسط خریدار، حتما از عکس واقعی استفاده کنید</Typography>
                            </Box>

                            <Box sx={{ marginTop: '10px' }} className="flex items-center justify-center">
                                <Typography fontSize={13}>حتما عکس از بسته بندی و یک عکس از نزدیک داخل محصول برای جذب خریدار ثبت کنید</Typography>
                            </Box>
                        </Box>
                        <input type="file" id="img" className="hidden" />
                    </label>
                </Box>
            </Box>

            <Box className="flex flex-col items-center justify-center mt-10">
                <Box className="w-full flex items-center justify-center">
                    <TextField label="عنوان محصول" className="w-[50%]" required />
                </Box>

                <Box className="w-full flex items-center justify-center mt-5">
                    <TextField label="قیمت محصول" className="w-[50%]" required />
                </Box>

                <Box className="w-full flex items-center justify-center mt-5">
                    <Box className="w-[50%]">
                        <Textarea placeholder="توضیحات محصول" maxLength={1000} dir="rtl" required />
                    </Box>
                </Box>

                <Box className="mt-10">
                    <Button type="submit">ثبت محصول</Button>
                </Box>
            </Box>
        </form>
    );
};
