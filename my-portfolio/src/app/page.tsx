import ProjectsSection from "./components/projects";

export default function Home() {
  return (
    <div>
      <nav>
        <hr className="my-4" />
        <ul className="flex flex-row justify-between">
          <li>HOME</li>
          <li>PORTFOLIO</li>
          <li>CONTACT</li>
        </ul>
        <div className="flex justify-center mt-4">
          <h1 className="title leading-none tracking-tight">MARTIN</h1>
        </div>
      </nav>
      <div className="uppercase flex items-center justify-between">
        <h2>
          * Based in Skopje, <br /> available everywhere
        </h2>
        <h2 className="mx-auto">
          Frontend Developer | UI DESIGNER | GRAPHIC DESIGNER
        </h2>
        <h2>FB IN LN GIT</h2>
      </div>
{/* add div with image background */}

<div
  className="h-[50vh] bg-cover bg-center my-8"
  style={{ backgroundImage: "url('https://picsum.photos/800/600')" }}
></div>

<ProjectsSection />
    </div>
  );
}
