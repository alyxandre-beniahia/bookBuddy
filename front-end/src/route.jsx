import Navbar from './components/navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/footer'

export const RouteLayout = () => {
  return (
    <>
    <Navbar/>
    <main>
        <Outlet/>
    </main>
    <Footer/>
    </>
  )
}
