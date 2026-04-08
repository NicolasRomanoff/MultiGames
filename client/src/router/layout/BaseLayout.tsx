import { Outlet } from "react-router";

const BaseLayout = () => {
  return (
    <main className="flex min-h-screen w-full bg-background dark">
      <Outlet />
    </main>
  );
};

export default BaseLayout;
