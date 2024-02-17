import man from "../../assets/mon.png"
const Home = () => {
  return (
    <>
      <main className="bg-slate-950 flex justify-between items-center lg:px-20 lg:mt-20">
        <div className="text-white break-words font-bold">
          <h1>
            LEARNING WITHOUT ANY BARRIER AND TRACK IT
          </h1>
        </div>
        <div className="-mt-20">
          <img src={man} alt="an image of a man sitting down and holding a laptop" />
        </div>
      </main>
    </>
  );
};

export default Home;
