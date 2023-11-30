import { RequestState } from '@/utils/requestState';
import { Loading } from './Loading';
import { Error } from './Error';

interface StoreStateArgs {
	state: RequestState;
}

export const StoreState: React.FC<StoreStateArgs> = ({ state }) => {
	if (state === RequestState.LOADING) {
		return <Loading />;
	}

	if (state === RequestState.ERROR) {
		return <Error />;
	}

	return null;
};
