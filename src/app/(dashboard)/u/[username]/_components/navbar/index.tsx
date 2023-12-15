import { Actions } from './actions';
import { Logo } from './logo';

export const Navbar = () => (
  <nav className='fixed top-0 z-[49] flex h-20 w-full items-center justify-between bg-[#252731] px-2 shadow-sm lg:px-4'>
    <Logo />
    <Actions />
  </nav>
);
