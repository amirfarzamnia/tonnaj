'use client';

import { useShop } from '@/context/shopContext';
import Cart from '@/components/card';
import React, { useEffect } from 'react';

export default () => {
    const { cartItems } = useShop();

    useEffect(() => {
        cartItems.map((item, index) => {
            console.log(item.image);
        });
    }, []);

    return (
        <div dir="ltr">
            <div className="w-full flex items-center justify-center p-2 mb-5 mt-10 border border-white/50">
                <div className="w-[50%]">
                    <div className="w-[65%] h-[5vh] p-1.5 flex items-center justify-end text-black">
                        <select className="outline-none w-full h-[5vh] flex items-center cursor-pointer bg-white/90 px-1 float-left" dir="rtl">
                            <option value="s">مرتب سازی بر اساس جدید بودن</option>
                        </select>
                    </div>
                </div>
                <div className="w-[50%]"></div>
            </div>
            <div className="w-full h-auto grid grid-cols-3 gap-x-3 gap-y-10 whitespace-break-spaces">
                {cartItems.map((item, index) => {
                    return <Cart author={item.author} title={item.title} description={item.description} buttonHref={`${item.buttonHref}/${item.id}`} locationName={item.location.state} image={item.image?.map((items) => items)[0]} key={index} />;
                })}
            </div>
        </div>
    );
};
