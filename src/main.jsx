import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Header from './components/Header.jsx'
import Profile from './components/Profile.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoutes from './routes/ProtectedRoutes'
import MoviePage from './components/MoviePage'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<App />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/movie/:id" element={<MoviePage />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
