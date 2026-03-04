import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import PopularDishes from './components/PopularDishes/PopularDishes'
import ServiceInfo from './components/ServiceInfo/ServiceInfo'
import MenuPack from './components/MenuPack/MenuPack'
import ReservationCTA from './components/ReservationCTA/ReservationCTA'
import Testimonials from './components/Testimonials/Testimonials'
import Blog from './components/Blog/Blog'
import Chefs from './components/Chefs/Chefs'
import AppDownload from './components/AppDownload/AppDownload'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PopularDishes />
        <ServiceInfo />
        <MenuPack />
        <ReservationCTA />
        <Testimonials />
        <Blog />
        <Chefs />
        <AppDownload />
      </main>
      <Footer />
    </>
  )
}

export default App
