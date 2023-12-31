import ScrollToTop from "./base-components/ScrollToTop";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import Router from "./router";
import "./assets/css/app.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HeaderApiLoader } from "./components/Wrappers";
const qc = new QueryClient(
	{
		defaultOptions: {
			queries: {
				onError: (error: any) => {
					if (error.response?.status === 401) {
						localStorage.removeItem('persist:Dambel-Auth');
						window.location.href = '/auth/login';
					}
				}
			}
		}
	}
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<QueryClientProvider client={qc}>
		<BrowserRouter>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<HeaderApiLoader />
					<Router />
				</PersistGate>
			</Provider>
			<ScrollToTop />
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</BrowserRouter>
	</QueryClientProvider>
);
