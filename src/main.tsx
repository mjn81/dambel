import ScrollToTop from "./base-components/ScrollToTop";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import Router from "./router";
import "./assets/css/app.css";
import { QueryClient, QueryClientProvider } from "react-query";

const qc = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<QueryClientProvider client={qc}>
		<BrowserRouter>
			<Provider store={store}>
				<Router />
			</Provider>
			<ScrollToTop />
		</BrowserRouter>
	</QueryClientProvider>
);
