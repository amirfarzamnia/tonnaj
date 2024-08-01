'use client';

import Cart from '@/components/card';
import { CartTypes } from '@/types/types';
import { Input } from '@mui/material';
import * as React from 'react';

export default () => {
    const carts: CartTypes[] = [
        { author: 'نیما', image: '/card.jpg', title: 'فروش سیب زمینی', locationName: 'شهدا', description: 'خرید سیب زمینی...', buttonHref: '/s' },

        { author: 'نیما', image: '/card.jpg', title: 'فروش سیب زمینی', locationName: 'شهدا', description: 'خرید سیب زمینی...', buttonHref: '/s' },
        { author: 'نیما', image: '/card.jpg', title: 'فروش سیب زمینی', locationName: 'شهدا', description: 'خرید سیب زمینی...', buttonHref: '/s' },
        { author: 'نیما', image: '/card.jpg', title: 'فروش سیب زمینی', locationName: 'شهدا', description: 'خرید سیب زمینی...', buttonHref: '/s' },
        { author: 'نیما', image: '/card.jpg', title: 'فروش سیب زمینی', locationName: 'شهدا', description: 'خرید سیب زمینی...', buttonHref: '/s' }
    ];

    return (
        <div className="w-full h-auto flex p-2 mt-2">
            <div className="w-[20%] flex items-center justify-center"></div>

            <div className="w-[65%] h-auto text-white">
                <div></div>

                <div dir="ltr">
                    <div className="w-[89%] flex items-center justify-center mb-5 mt-10 p-2 border border-white/50">
                        <div className="w-[50%]">
                            <div className="w-[65%] h-[5vh] ml-1 p-1 flex items-center justify-end text-black bg-white">
                                <select className="outline-none w-full h-auto flex items-center cursor-pointer px-1 float-left" dir="rtl">
                                    <option value="s">مرتب سازی بر اساس جدید بودن</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-[50%]"></div>
                    </div>
                    <div className="w-[89%] h-auto bg-white grid grid-cols-3 gap-x-3 gap-y-10 whitespace-break-spaces">
                        {carts.map((item, index) => {
                            return <Cart author={item.author} title={item.title} description={item.description} buttonHref={item.buttonHref} locationName={item.locationName} image={item.image} key={index} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
