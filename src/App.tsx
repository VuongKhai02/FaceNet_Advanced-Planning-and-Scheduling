import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import { DefaultLayout, Loading } from './components';

import { ROUTES } from './route';
import { NavigationProvider } from './contexts/navigate';
import { useLoading } from './contexts/Loading';
import { Suspense } from 'react';

function App() {

  const { loadingData } = useLoading();

  return (
    <>
      {loadingData.loading === "loading" && <Loading />}
      <Router>
        <NavigationProvider>
          <DefaultLayout>
            <Suspense fallback={<Loading />}>
              <Routes>
                {ROUTES.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>

            </Suspense>
          </DefaultLayout>
        </NavigationProvider>
      </Router>
    </>
  )
}

export default App;
