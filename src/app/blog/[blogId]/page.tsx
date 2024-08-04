import { Stack } from '@mui/material';

export default ({ params }: { params: { blogId: string } }) => {
    return (
        <Stack>
            <div>{params.blogId}</div>
        </Stack>
    );
};
