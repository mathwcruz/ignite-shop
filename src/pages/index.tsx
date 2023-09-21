import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'

import { HomeContainer, Product } from '@/styles/pages/home'

import 'keen-slider/keen-slider.min.css'

import shirt1 from '@/assets/images/shirts/1.png'
import shirt2 from '@/assets/images/shirts/2.png'
import shirt3 from '@/assets/images/shirts/3.png'

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={shirt1} alt="" width={520} height={480} />

        <footer>
          <strong>Shirt X</strong>
          <span>$ 16</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={shirt2} alt="" width={520} height={480} />

        <footer>
          <strong>Shirt Y</strong>
          <span>$ 18</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={shirt3} alt="" width={520} height={480} />

        <footer>
          <strong>Shirt Z</strong>
          <span>$ 21</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={shirt1} alt="" width={520} height={480} />

        <footer>
          <strong>Shirt T</strong>
          <span>$ 15</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}
