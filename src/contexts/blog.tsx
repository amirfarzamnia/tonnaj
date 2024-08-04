import { BlogTypes } from '@/types/types';
import React from 'react';

const BlogContext = React.createContext<{ blogItems: BlogTypes[]; setBlogItems: React.Dispatch<React.SetStateAction<BlogTypes[]>> }>({ blogItems: [], setBlogItems: (): BlogTypes[] => [] });

export default function BlogProvider({ children }: { children: React.ReactNode }) {
    const [blogItems, setBlogItems] = React.useState<BlogTypes[]>([]);

    return <BlogContext.Provider value={{ blogItems, setBlogItems }}>{children}</BlogContext.Provider>;
}

export const useBlog = () => React.useContext(BlogContext);
