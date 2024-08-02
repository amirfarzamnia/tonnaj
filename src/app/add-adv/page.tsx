'use client';

import { Add, Remove } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Textarea } from '@nextui-org/react';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { ChangeEvent, useRef, useState } from 'react';

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75'
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025'
};

const TextareaAutosize = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

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
                    <TextField label="عنوان محصول" className="w-[50%]" required value={title} onChange={(e) => setTitle(e.target.value)} />
                </Box>

                <Box className="w-full flex items-center justify-center mt-5">
                    <TextField label="قیمت محصول" className="w-[50%]" required value={price} onChange={(e) => setPrice(e.target.value)} />
                </Box>

                <Box className="w-full flex items-center justify-center mt-5">
                    <Box className="w-[50%]">
                        <Textarea placeholder="توضیحات محصول" classNames={{ base: 'border-gray-300', input: 'border-gray-300' }} variant="bordered" maxLength={2500} dir="rtl" required value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Box>
                </Box>

                <Box className="mt-10">
                    <Button type="submit">ثبت آگهی</Button>
                </Box>
            </Box>
        </form>
    );
};
