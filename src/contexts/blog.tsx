import { BlogTypes } from '@/types/types';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface BlogContextProps {
    blogItems: BlogTypes[];
    setBlogItems: Dispatch<SetStateAction<BlogTypes[]>>;
}

const BlogContext = createContext<BlogContextProps>({
    blogItems: [],
    setBlogItems: (): BlogTypes[] => []
});

export default function BlogProvider({ children }: { children: ReactNode }) {
    const [blogItems, setBlogItems] = useState<BlogTypes[]>([]);

    return <BlogContext.Provider value={{ blogItems, setBlogItems }}>{children}</BlogContext.Provider>;
}

export const useBlog = () => useContext(BlogContext);
