import { Button } from "ui/components";

const Homepage = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <Button>Chess</Button>
      <Button>Checkers</Button>
      <Button>Connect 4</Button>
      <button>button vanille</button>
    </div>
  );
};

export default Homepage;
