
import { Error } from '@/components/Error';
import { Loading } from '@/components/Loading';
import axios from '@/utils/axios';
import { useState } from 'react';

interface UseRequestArgs<T> {
    url: string;
    method: 'post' | 'get' | 'delete' | 'put';
    body?: any;
    onSuccess?: (data: T) => void;
}

export default function useRequest<T>({ url, method, body, onSuccess }: UseRequestArgs<T>) {
    const [errors, setErrors] = useState<JSX.Element | null>(null);
    const [loading, setLoading] = useState<JSX.Element | null>(null)

    const setLoadingComponent = () => {
        setLoading(<Loading />)
    }

    const clearLoadingComponent = () => {
        setLoading(null)
    }

    const doRequest = async (props = {}) => {
        try {
            setLoadingComponent()
            setErrors(null);
            const response = await axios[method]<T>(url, { ...body, ...props });

            clearLoadingComponent()
            if (onSuccess) {
                onSuccess(response.data);
            }

            return response.data;
        } catch (err) {
            clearLoadingComponent()
            setErrors(<Error />);
        }
    };

    return {
        errors,
        loading,
        doRequest,
    };
};
