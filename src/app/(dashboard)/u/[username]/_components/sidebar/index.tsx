import { Navigation } from './navigation';
import { Toggle } from './toggle';
import { Wrapper } from './wrapper';

export const Sidebar = () => (
  <Wrapper>
    <Toggle />
    <Navigation />
  </Wrapper>
);
