import { Box, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { homeApi } from '../../api/homeApi';
import toast from 'react-hot-toast';

export const HomePage = () => {
    const [data, setData] = useState('loading...');

    const getHomeData = useCallback(async () => {
        try {
            const data = await homeApi.getHomeData();

            setData(data.data);
        } catch (err: any) {
            console.error(err);
            toast.error(
                err?.response?.data?.error || 'failed to get home data'
            );
        }
    }, []);

    useEffect(() => {
        getHomeData();
    }, [getHomeData]);
    return (
        <Box sx={{ mt: '20%', width: '80%', mx: 'auto' }}>
            <Typography sx={{ textAlign: 'center' }} variant='h4'>
                {data}
            </Typography>
        </Box>
    );
};
