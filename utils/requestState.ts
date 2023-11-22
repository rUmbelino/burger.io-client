export enum RequestState {
    IDLE = 'IDLE',
    ERROR = 'ERROR',
    LOADING = 'LOADING',
    COMPLETED = 'COMPLETED',
}

export const getStateVars = (state: RequestState) => {
    return {
        isIdle: state === RequestState.IDLE,
        isError: state === RequestState.ERROR,
        isLoading: state === RequestState.LOADING,
        isCompleted: state === RequestState.COMPLETED,
    }
}