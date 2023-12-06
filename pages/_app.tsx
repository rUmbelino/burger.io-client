import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Menu from '@/components/Menu';
import type { AppProps } from 'next/app';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from '@/utils/store';
import { Cart } from '@/components/Cart';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Provider store={store}>
				<ToastContainer />
				<div className="d-flex">
					<Menu {...pageProps} />
					<Container data-cy="page-container" className="py-3">
						<Cart />
						<Component {...pageProps} />
					</Container>
				</div>
			</Provider>
		</>
	);
}
