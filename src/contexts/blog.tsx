import BlogOne from '@/posts/one';
import { BlogTypes } from '@/types/types';
import React from 'react';

const BlogContext = React.createContext<{ blogItems: BlogTypes[]; setBlogItems: React.Dispatch<React.SetStateAction<BlogTypes[]>> }>
    ({
        blogItems: [
            {
                categories: ["سیب زمینی"],
                title: 'بزن روش',
                description: 's',
                id: "1",
                image: "/card2.jpg",
                page: <BlogOne />
            },
            {
                categories: ["سیب زمینی"],
                title: 'بزن روش',
                description: 'سیب زمینی',
                id: "2",
                image: "/card.jpg",
                page: <BlogOne />
            }, {
                title: 'بزن روش',
                categories: ["سیب زمینی"],
                description: 'سیب زمینی',
                id: "3",
                image: "/card.jpg",
                page: <BlogOne />
            }, {
                title: 'بزن روش',
                categories: ["سیب زمینی"],
                description: 'سیب زمینی',
                id: "4",
                image: "/card.jpg",
                page: <BlogOne />
            },
            {
                title: 'بزن روش',
                categories: ["میوه"],
                description: 'میوه',
                id: "5",
                image: "/card.jpg",
                page: <BlogOne />
            },
        ],
        setBlogItems: (): BlogTypes[] => []
    });

export default function BlogProvider({ children }: { children: React.ReactNode }) {
    const [blogItems, setBlogItems] = React.useState<BlogTypes[]>([
        {
            categories: ["سیب زمینی"],
            title: 'بزن روش',
            description: 's',
            id: "1",
            image: "/card2.jpg",
            page: <BlogOne />
        },
        {
            categories: ["سیب زمینی"],
            title: 'بزن روش',
            description: 'سیب زمینی',
            id: "2",
            image: "/card.jpg",
            page: <BlogOne />
        }, {
            title: 'بزن روش',
            categories: ["سیب زمینی"],
            description: 'سیب زمینی',
            id: "3",
            image: "/card.jpg",
            page: <BlogOne />
        }, {
            title: 'بزن روش',
            categories: ["سیب زمینی"],
            description: 'سیب زمینی',
            id: "4",
            image: "/card.jpg",
            page: <BlogOne />
        },
        {
            title: 'بزن روش',
            categories: ["میوه"],
            description: 'میوه',
            id: "5",
            image: "/card.jpg",
            page: <BlogOne />
        },
    ]);

    return <BlogContext.Provider value={{ blogItems, setBlogItems }}>{children}</BlogContext.Provider>;
}

export const useBlog = () => React.useContext(BlogContext);
