import { Hero } from '@/components/home/Hero';
import { Categories } from '@/components/home/Categories';
import { Products } from '@/components/home/Products';
import { TaxServicePromo } from '@/components/home/TaxServicePromo';
import { Advantages } from '@/components/home/Advantages';
import { Process } from '@/components/home/Process';
import { Partners } from '@/components/home/Partners';

export function Home() {
  return (
    <div className="space-y-0">
      <Hero />
      <Categories />
      <Products />
      <TaxServicePromo />
      <Advantages />
      <Process />
      <Partners />
    </div>
  );
}
