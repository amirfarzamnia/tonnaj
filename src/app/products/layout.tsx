'use client';

import { Accordion, AccordionItem } from '@nextui-org/react';
import { useShop } from '@/context/shopContext';
import { Typography } from '@mui/material';
import Cart from '@/components/card';
import React, { ReactNode } from 'react';

export default ({ children }: { children: ReactNode }) => {
    const exportItems: { name: string; link: string }[] = [
        {
            name: 'مام محصولات صادراتی',
            link: 'details/'
        },
        {
            name: 'هندوانه صادراتی',
            link: 'details/'
        },
        {
            name: 'کاهو صادراتی',
            link: 'details/'
        },
        {
            name: 'هویج صادراتی',
            link: 'details/'
        },
        {
            name: 'گوجه فرنگی صادراتی',
            link: 'details/'
        },
        {
            name: 'گل کلم صادراتی',
            link: 'details/'
        },
        {
            name: 'سیب صادراتی',
            link: 'details/'
        }
    ];

    const superItems: { name: string; link: string }[] = [
        {
            name: 'فلفل دلمه سوپری',
            link: '/'
        },
        {
            name: 'خیار سوپری',
            link: '/'
        },
        {
            name: 'پرتقال سوپری',
            link: '/'
        },
        {
            name: 'پیاز سوپری',
            link: '/'
        }
    ];

    const factoryItems: { name: string; link: string }[] = [
        {
            name: 'خرما صنعتی',
            link: '/'
        },
        {
            name: 'پیاز خشک',
            link: '/'
        },
        {
            name: 'لوبیا قرمز',
            link: '/'
        }
    ];

    const provinces = [
        { name: 'کرمان', link: '/' },
        { name: 'خوزستان', link: '/' },
        { name: 'مازندران', link: '/' },
        { name: 'آذربایجان شرقی', link: '/' },
        { name: 'گلستان', link: '/' },
        { name: 'بوشهر', link: '/' },
        { name: 'کردستان', link: '/' },
        { name: 'خراسان شمالی', link: '/' },
        { name: 'آذربایجان غربی', link: '/' },
        { name: 'لرستان', link: '/' },
        { name: 'همدان', link: '/' },
        { name: 'گیلان', link: '/' },
        { name: 'هرمزگان', link: '/' },
        { name: 'قزوین', link: '/' }
    ];

    return (
        <div className="w-full h-auto flex justify-center p-2 mt-2 mb-16">
            <div className="w-[20%] flex flex-col items-center justify-start p-1 *:mt-10">
                <div className="text-xl flex items-center justify-start w-full text-green-600">
                    <h3 className="">فیلتر ها :</h3>
                </div>
                <div className="w-full h-auto">
                    <div className="w-full">
                        <div className="w-full border-b-[1.5px] border-white/10 text-xl font-semibold flex items-center justify-start p-2">
                            <Typography variant="h6">بر اساس محصولات</Typography>
                        </div>
                        <div className="w-[85%] p-2 ml-auto mr-auto">
                            <Accordion>
                                <AccordionItem key="1" classNames={{ content: 'flex flex-col', title: 'text-white  text-[14px]' }} aria-label="Accordion 1" title="محصولات صادراتی">
                                    {exportItems.map((item, index) => {
                                        return (
                                            <a href={item.link} className="hover:text-red-300 mt-1 mb-1 transition-all duration-400" key={index}>
                                                {item.name}
                                            </a>
                                        );
                                    })}
                                </AccordionItem>
                            </Accordion>

                            <Accordion>
                                <AccordionItem key="1" classNames={{ content: 'flex flex-col', title: 'text-white  text-[14px]' }} aria-label="Accordion 1" title="محصولات سوپری">
                                    {superItems.map((item, index) => {
                                        return (
                                            <a href={item.link} className="hover:text-red-300 mt-1 mb-1 transition-all duration-400" key={index}>
                                                {item.name}
                                            </a>
                                        );
                                    })}
                                </AccordionItem>
                            </Accordion>

                            <Accordion>
                                <AccordionItem key="1" classNames={{ content: 'flex flex-col', title: 'text-white  text-[14px]' }} aria-label="Accordion 1" title="محصولات کارخانه ای">
                                    {factoryItems.map((item, index) => {
                                        return (
                                            <a href={item.link} className="hover:text-red-300 mt-1 mb-1 transition-all duration-400" key={index}>
                                                {item.name}
                                            </a>
                                        );
                                    })}
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="w-full border-b-[1.5px] border-white/10 text-xl font-semibold flex items-center justify-start p-2">
                            <Typography variant="h6" className="font-semibold">
                                براساس نحوه معامله
                            </Typography>
                        </div>
                        <div className="w-[85%] flex flex-col font-thin p-2 ml-auto mr-auto">
                            {[
                                { name: 'نقدی', link: '/' },
                                { name: 'حق العملی', link: '/' }
                            ].map((item, index) => {
                                return (
                                    <a href={item.link} className="hover:text-red-300 mt-1 mb-1 transition-all duration-400" key={index}>
                                        {item.name}
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="w-full border-b-[1.5px] border-white/10 text-xl font-semibold flex items-center justify-start p-2">
                            <Typography variant="h6">براساس استان</Typography>
                        </div>
                        <div className="w-[85%] flex flex-col p-2 ml-auto mr-auto">
                            {provinces.map((item, index) => {
                                return (
                                    <a href={item.link} className="hover:text-red-300 mt-1 mb-1 transition-all duration-400" key={index}>
                                        {item.name}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-[65%] h-fit flex flex-col items-center justify-center text-white">{children}</div>
        </div>
    );
};
