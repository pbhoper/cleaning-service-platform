import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div style={{ backgroundColor: '#f1f5f9', minHeight: '100vh', color: '#0f172a' }}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}