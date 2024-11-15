import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { PageLayout } from "./components/layouts/PageLayout";
import Homepage from "./pages/Homepage";
import { store } from "./redux/store";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PageLayout>
          <Homepage />
        </PageLayout>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
