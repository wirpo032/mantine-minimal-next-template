import { Welcome } from '../components/Welcome/Welcome';
import { HeaderMenu } from '../components/HeaderMenu/HeaderMenu';
import { HeroText } from '../components/HeroText/HeroText';
import { FeaturesImages } from '../components/FeaturesImages/FeaturesImages';
import { FaqWithImage } from '../components/FaqWithImage/FaqWithImage';
import { GetInTouch } from '../components/GetInTouch/GetInTouch';
import { FooterCentered } from '../components/FooterCentered/FooterCentered';
import { FormCars } from '../components/Form/FormCars';

export default function HomePage() {
  return (
    <>
      <HeaderMenu />
      <HeroText />
      <FeaturesImages />
      <FormCars />
      <br />
      <FaqWithImage />
      <GetInTouch />
      <FooterCentered />

    </>
  );
}
