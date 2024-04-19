import { useState } from 'react';
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from 'react-query';


export default function Authenticated({children }) {
    const queryClient = new QueryClient();
    return (
        <div className='main  h-[100vh] flex justify-center items-center bg-red-500'>
            <QueryClientProvider client={queryClient}>
                <ConfigProvider theme={{ token: { colorPrimary: '#04caad' } }}>
                    {children}
                </ConfigProvider>
            </QueryClientProvider>
        </div>
    );
}



