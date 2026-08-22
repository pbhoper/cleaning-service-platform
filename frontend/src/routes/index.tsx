import { createFileRoute } from '@tanstack/react-router';
import { Main } from '../components/main';
import { Services } from '../components/service';
import { Contacts } from '../components/contacts';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Main />
      <Services />
      <Contacts />
    </>
  );
}