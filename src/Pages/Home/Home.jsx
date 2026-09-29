import Navbar from '../../Components/Navbar/Navbar'
import Hero from '../../Components/Home/Hero/Hero'
import Carousel from '../../Components/Home/Carousel/Carousel'
import Hug1 from '../../Components/Home/Hug1/Hug1'
import Hug2 from '../../Components/Home/Hug2/Hug2'
import Frame from '../../Components/Home/Frame/Frame'
import FAQ from '../../Components/FAQ/faq'
import Footer from '../../Components/Footer/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Carousel />
      <Hug1 />
      <Hug2 />
      <Frame />
      <FAQ />
      <Footer />
    </>
  )
}
