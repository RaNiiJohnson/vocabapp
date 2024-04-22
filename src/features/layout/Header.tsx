import { ThemeToggle } from "@/theme/ThemeToggle";

export const Header = () => {
  return (
    <div className="flex items-center gap-4 py-2 border-b-2 sticky top-0 z-10 backdrop-blur-sm">
      <h1 className="flex-1 text-2xl font-bold ">Vocabulary Note</h1>
      <ThemeToggle />
    </div>
  );
};
