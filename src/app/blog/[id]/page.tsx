import { Stack } from '@mui/material';

export default ({ params }: { params: { id: string } }) => {
    return (
        <Stack>
            <div>{params.id}</div>
        </Stack>
    );
};
