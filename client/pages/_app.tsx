import '@chatui/core/dist/index.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '../css/tailwind.css';
import store from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
