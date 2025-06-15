import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '@src/App';
import SuspenseUntilReady from './components/SuspenseUntilReady';
import DarkThemeProvider from './providers/DarkThemeProvider';
import { createStore } from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

const store = createStore();
const queryClient = new QueryClient();

function Client() {
  return (
    <StrictMode>
      <SuspenseUntilReady
        asyncFn={async () => {
          console.log('Application is up and running!');
        }}
      >
        <StoreProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <DarkThemeProvider>
                <App />
              </DarkThemeProvider>
            </BrowserRouter>
          </QueryClientProvider>
        </StoreProvider>
      </SuspenseUntilReady>
    </StrictMode>
  );
}

const rootElement = document.getElementById('root')!;

createRoot(rootElement).render(<Client />);
