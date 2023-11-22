import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Menu from '@/components/Menu';
import type { AppProps } from 'next/app'
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <div className='d-flex'>
        <Menu {...pageProps} />
        <Container className='py-3'>
          <Component {...pageProps} />
        </Container>
      </div>
    </>
  )
}
