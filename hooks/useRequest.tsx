
import axios from '@/utils/axios';
import { useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';

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
        setLoading(<Spinner className="d-block m-auto my-5" variant="primary" animation="border" />)
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
            setErrors(
                <Alert variant="danger">
                    <h4>Ooops...</h4>
                    <p>An unexpected errror occured while fetching the data!</p>
                </Alert>
            );
        }
    };

    return {
        errors,
        loading,
        doRequest,
    };
};
