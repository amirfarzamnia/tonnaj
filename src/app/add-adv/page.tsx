'use client';

import { Add, Remove } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Textarea } from '@nextui-org/react';
import { ChangeEvent, useRef, useState } from 'react';

export default () => {
    const [imageSrcs, setImageSrcs] = useState<Array<string | ArrayBuffer>>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [title, setTitle] = useState<string>();
    const [price, setPrice] = useState<string>();
    const [description, setDescription] = useState<string>();

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target.files;

        if (files) {
            const fileArray = Array.from(files);

            if (imageSrcs.length >= 10) {
                alert('شما نمی‌توانید بیش از 10 تصویر آپلود کنید.');
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                return;
            }

            const readers = fileArray.map((file) => {
                return new Promise<string | ArrayBuffer>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve(reader.result as string | ArrayBuffer);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(readers).then((results) => {
                setImageSrcs((prevSrcs) => [...prevSrcs, ...results].slice(0, 10));
            });
        }

        // Reset the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                console.log('true');
            }}
            className="w-full h-auto mt-10">
            <Box className="w-full h-auto flex flex-col items-center justify-center p-2">
                <div className="grid grid-cols-6 gap-4">
                    {imageSrcs.map((src, index) => (
                        <div>
                            <div>
                                <Remove onClick={() => setImageSrcs((prev) => prev.filter((_, i) => i != index))} />
                            </div>
                            <img key={index} src={src as string} alt={`Uploaded ${index}`} className="w-[150px] h-[130px] mb-5 rounded" />
                        </div>
                    ))}
                </div>
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
                        <input type="file" id="img" className="hidden" onChange={handleImage} ref={fileInputRef} required />
                    </label>
                </Box>
            </Box>

            <Box className="flex flex-col items-center justify-center mt-10 mb-5">
                <Box className="w-full flex items-center justify-center">
                    <TextField label="عنوان محصول" className="w-[50%]" required />
                </Box>

                <Box className="w-full flex items-center justify-center mt-5">
                    <TextField label="قیمت محصول" className="w-[50%]" required />
                </Box>

                <Box className="w-full flex items-center justify-center mt-5">
                    <Box className="w-[50%]">
                        <Textarea placeholder="توضیحات محصول" maxLength={2500} dir="rtl" required />
                    </Box>
                </Box>

                <Box className="mt-10">
                    <Button type="submit">ثبت آگهی</Button>
                </Box>
            </Box>
        </form>
    );
};
