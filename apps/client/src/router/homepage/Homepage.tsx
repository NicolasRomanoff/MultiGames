import { Button } from "@/components/ui/button";

const Homepage = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <Button>Chess</Button>
      <Button>Checkers</Button>
      <Button>Connect 4</Button>
    </div>
  );
};

export default Homepage;
