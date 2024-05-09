import { ThemeToggle } from "@/theme/ThemeToggle";

export const Header = () => {
  return (
    <div className="sticky top-0 z-10 flex items-center max-w-screen-xl gap-4 py-2 m-auto border-b-2 max-lg:px-2 md:container backdrop-blur-sm">
      <h1 className="flex-1 text-2xl font-bold">Vocabulary Note</h1>
      <ThemeToggle />
    </div>
  );
};
