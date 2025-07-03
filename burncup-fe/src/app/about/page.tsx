import Header from '@/components/common/header';

export default function AboutPage() {
  return (
    <div>
      <Header />
      <main className="p-10">
        <h1 className="text-4xl font-bold mb-4 text-center">The Burncup Journey</h1>

        {/* First section: Desc left, Image right */}
        <div className="flex flex-row gap-80 justify-center items-start mt-10">
            <div className="flex-[2] max-w-md flex flex-col items-center">
                <h1 className= " text-[32px] bg-[#001F54] text-[#F4C261] px-4 py-2 rounded-xl w-fit mb-2 font-bold text-center">2025</h1>
                <h1 className="font-bold text-[32px] text-center mb-2">Judul</h1>
                <p className="text-[26px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices justo ligula,
                    et rhoncus sapien luctus a. Sed scelerisque consectetur nisl ut tristique. Donec eu libero 
                    cursus, lobortis metus vitae, cursus arcu. 
                </p>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-6 w-fit">
                <img src="/images/home_hero.png" alt="Image 1" className="w-60 h-48 object-cover rounded-lg" />
                <img src="/images/home_hero.png" alt="Image 2" className="w-60 h-48 object-cover rounded-lg" />
                <img src="/images/home_hero.png" alt="Image 3" className="w-60 h-48 object-cover rounded-lg" />
                <img src="/images/home_hero.png" alt="Image 4" className="w-60 h-48 object-cover rounded-lg" />
            </div>
        </div>

        {/* Second section: Image left, Desc right */}
        <div className="flex flex-row gap-80 justify-center items-start mt-16">
          <div className="flex-1 grid grid-cols-2 gap-6 w-fit">
            <img src="/images/home_hero.png" alt="Image 1" className="w-60 h-48 object-cover rounded-lg" />
            <img src="/images/home_hero.png" alt="Image 2" className="w-60 h-48 object-cover rounded-lg" />
            <img src="/images/home_hero.png" alt="Image 3" className="w-60 h-48 object-cover rounded-lg" />
            <img src="/images/home_hero.png" alt="Image 4" className="w-60 h-48 object-cover rounded-lg" />
          </div>
          <div className="flex-[2] max-w-md flex flex-col items-center">
            <h1 className="text-[32px] bg-[#001F54] text-[#F4C261] px-4 py-2 rounded-xl w-fit mb-2 font-bold text-center">2024</h1>
            <h1 className="font-bold text-[32px] text-center mb-2">Judul</h1>
            <p className="text-[26px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices justo ligula,
                    et rhoncus sapien luctus a. Sed scelerisque consectetur nisl ut tristique. Donec eu libero 
                    cursus, lobortis metus vitae, cursus arcu. 
                </p>
          </div>
        </div>

        {/* Third section: Desc left, Image right */}
        <div className="flex flex-row gap-80 justify-center items-start mt-16">
            <div className="flex-[2] max-w-md flex flex-col items-center">
                <h1 className= " text-[32px] bg-[#001F54] text-[#F4C261] px-4 py-2 rounded-xl w-fit mb-2 font-bold text-center">2023</h1>
                <h1 className="font-bold text-[32px] text-center mb-2">Judul</h1>
                <p className="text-[26px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices justo ligula,
                    et rhoncus sapien luctus a. Sed scelerisque consectetur nisl ut tristique. Donec eu libero 
                    cursus, lobortis metus vitae, cursus arcu. 
                </p>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-6 w-fit">
                <img src="/images/home_hero.png" alt="Image 1" className="w-60 h-48 object-cover rounded-lg" />
                <img src="/images/home_hero.png" alt="Image 2" className="w-60 h-48 object-cover rounded-lg" />
                <img src="/images/home_hero.png" alt="Image 3" className="w-60 h-48 object-cover rounded-lg" />
                <img src="/images/home_hero.png" alt="Image 4" className="w-60 h-48 object-cover rounded-lg" />
            </div>
        </div>

        {/* Fourth section: Image left, Desc right */}
        <div className="flex flex-row gap-80 justify-center items-start mt-16">
          <div className="flex-1 grid grid-cols-2 gap-6 w-fit">
            <img src="/images/home_hero.png" alt="Image 1" className="w-60 h-48 object-cover rounded-lg" />
            <img src="/images/home_hero.png" alt="Image 2" className="w-60 h-48 object-cover rounded-lg" />
            <img src="/images/home_hero.png" alt="Image 3" className="w-60 h-48 object-cover rounded-lg" />
            <img src="/images/home_hero.png" alt="Image 4" className="w-60 h-48 object-cover rounded-lg" />
          </div>
          <div className="flex-[2] max-w-md flex flex-col items-center">
            <h1 className="text-[32px] bg-[#001F54] text-[#F4C261] px-4 py-2 rounded-xl w-fit mb-2 font-bold text-center">2022</h1>
            <h1 className="font-bold text-[32px] text-center mb-2">Judul</h1>
            <p className="text-[26px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices justo ligula,
                    et rhoncus sapien luctus a. Sed scelerisque consectetur nisl ut tristique. Donec eu libero 
                    cursus, lobortis metus vitae, cursus arcu. 
                </p>
          </div>
        </div>

        {/* Fifth section: Desc left, Image right */}
        <div className="flex flex-row gap-80 justify-center items-start mt-16">
            <div className="flex-[2] max-w-md flex flex-col items-center">
                <h1 className= " text-[32px] bg-[#001F54] text-[#F4C261] px-4 py-2 rounded-xl w-fit mb-2 font-bold text-center">2021</h1>
                <h1 className="font-bold text-[32px] text-center mb-2">Judul</h1>
                <p className="text-[26px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices justo ligula,
                    et rhoncus sapien luctus a. Sed scelerisque consectetur nisl ut tristique. Donec eu libero 
                    cursus, lobortis metus vitae, cursus arcu. 
                </p>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-6 w-fit">
                <img src="/images/home_hero.png" alt="Image 1" className="w-60 h-48 object-cover rounded-lg" />
                <img src="/images/home_hero.png" alt="Image 2" className="w-60 h-48 object-cover rounded-lg" />
                <img src="/images/home_hero.png" alt="Image 3" className="w-60 h-48 object-cover rounded-lg" />
                <img src="/images/home_hero.png" alt="Image 4" className="w-60 h-48 object-cover rounded-lg" />
            </div>
        </div>

        {/* Sixth section: Image left, Desc right */}
        <div className="flex flex-row gap-80 justify-center items-start mt-16">
          <div className="flex-1 grid grid-cols-2 gap-6 w-fit">
            <img src="/images/home_hero.png" alt="Image 1" className="w-60 h-48 object-cover rounded-lg" />
            <img src="/images/home_hero.png" alt="Image 2" className="w-60 h-48 object-cover rounded-lg" />
            <img src="/images/home_hero.png" alt="Image 3" className="w-60 h-48 object-cover rounded-lg" />
            <img src="/images/home_hero.png" alt="Image 4" className="w-60 h-48 object-cover rounded-lg" />
          </div>
          <div className="flex-[2] max-w-md flex flex-col items-center">
            <h1 className="text-[32px] bg-[#001F54] text-[#F4C261] px-4 py-2 rounded-xl w-fit mb-2 font-bold text-center">2020</h1>
            <h1 className="font-bold text-[32px] text-center mb-2">Judul</h1>
            <p className="text-[26px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices justo ligula,
                    et rhoncus sapien luctus a. Sed scelerisque consectetur nisl ut tristique. Donec eu libero 
                    cursus, lobortis metus vitae, cursus arcu. 
                </p>
          </div>
        </div>

        {/* Seventh section: Desc left, Image right */}
        <div className="flex flex-row gap-80 justify-center items-start mt-16">
            <div className="flex-[2] max-w-md flex flex-col items-center">
                <h1 className= " text-[32px] bg-[#001F54] text-[#F4C261] px-4 py-2 rounded-xl w-fit mb-2 font-bold text-center">2019</h1>
                <h1 className="font-bold text-[32px] text-center mb-2">Judul</h1>
                <p className="text-[26px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices justo ligula,
                    et rhoncus sapien luctus a. Sed scelerisque consectetur nisl ut tristique. Donec eu libero 
                    cursus, lobortis metus vitae, cursus arcu. 
                </p>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-6 w-fit">
                <img src="/images/home_hero.png" alt="Image 1" className="w-60 h-48 object-cover rounded-lg" />
                <img src="/images/home_hero.png" alt="Image 2" className="w-60 h-48 object-cover rounded-lg" />
                <img src="/images/home_hero.png" alt="Image 3" className="w-60 h-48 object-cover rounded-lg" />
                <img src="/images/home_hero.png" alt="Image 4" className="w-60 h-48 object-cover rounded-lg" />
            </div>
        </div>

        {/* Eighth section: Image left, Desc right */}
        <div className="flex flex-row gap-80 justify-center items-start mt-16">
          <div className="flex-1 grid grid-cols-2 gap-6 w-fit">
            <img src="/images/home_hero.png" alt="Image 1" className="w-60 h-48 object-cover rounded-lg" />
            <img src="/images/home_hero.png" alt="Image 2" className="w-60 h-48 object-cover rounded-lg" />
            <img src="/images/home_hero.png" alt="Image 3" className="w-60 h-48 object-cover rounded-lg" />
            <img src="/images/home_hero.png" alt="Image 4" className="w-60 h-48 object-cover rounded-lg" />
          </div>
          <div className="flex-[2] max-w-md flex flex-col items-center">
            <h1 className="text-[32px] bg-[#001F54] text-[#F4C261] px-4 py-2 rounded-xl w-fit mb-2 font-bold text-center">2018</h1>
            <h1 className="font-bold text-[32px] text-center mb-2">Judul</h1>
            <p className="text-[26px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices justo ligula,
                    et rhoncus sapien luctus a. Sed scelerisque consectetur nisl ut tristique. Donec eu libero 
                    cursus, lobortis metus vitae, cursus arcu. 
                </p>
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#F4C261] to-[#8E7138] flex flex-row gap-15 mt-15 w-full rounded-3xl">
            <div className="flex-[2] flex flex-col justify-center p-10">
                <h1 className=" text-[32px] font-bold">BurnCup 2025 <br/> Compete, Explore, Conquer</h1>
                <p className="text-[26px] font-semibold mt-15">
                    This year, we're taking BurnCup to unprecedented heights with our most ambitious 
                    edition yet. Featuring 17 diverse competition categories, we're expecting over 800 
                    participants from across all departments. With enhanced production values, prestigious 
                    venues, and bigger prizes, BurnCup 2025 promises to be an unforgettable experience for all involved.
                </p>
                <button className="mt-6 px-8 py-3 bg-[#720606] text-[#F4C261] font-bold rounded-xl shadow hover:bg-[#16396b] transition-colors">REGISTER FOR BURNCUP 2025</button>
            </div>
            <div className="flex-1 width-436.5 height-555 p-10">
                <img src="/images/burncup_mascot.png" alt="" />
            </div>
        </div>
        
      </main>
    </div>
  );
}