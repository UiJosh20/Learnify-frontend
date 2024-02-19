import man from "../../assets/mon.png"
import Button from "@mui/material/Button";

const Home = () => {
  return (
    <>
      <main className="bg-slate-950 flex justify-between lg:px-20 lg:mt-20">
        <div className="text-white break-words font-bold lg:mx-15 lg:mt-36">
          <h1>
            LEARNING WITHOUT ANY BARRIER AND TRACK IT
          </h1>
          <Button variant="contained" className="!mt-4 !bg-yellow-600 !p-4 w-40">Get started</Button>
        </div>
        <div className="-mt-20">
          <img src={man} alt="an image of a man sitting down and holding a laptop" />
        </div>
      </main>
    </>
  );
};

export default Home;
