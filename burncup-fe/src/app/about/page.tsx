import Header from '@/components/common/header';

export default function AboutPage() {
  return (
    <div>
      <Header />
      <main className="p-10">
        <h1 className="text-4xl font-bold mb-4 text-center">The Burncup Journey</h1>

        {/* Section 1: Desc left, Image right */}
<div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 lg:gap-20 mt-10 px-4">
  <div className="flex-1 max-w-md flex flex-col items-center lg:items-start text-center lg:text-left">
    <h1 className="text-[32px] bg-[#001F54] text-[#F4C261] px-4 py-2 rounded-xl w-fit mb-2 font-bold">2025</h1>
    <h1 className="font-bold text-[32px] mb-2">Judul</h1>
    <p className="text-[26px] md:text-[24px] lg:text-[26px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices justo ligula,
      et rhoncus sapien luctus a. Sed scelerisque consectetur nisl ut tristique. Donec eu libero 
      cursus, lobortis metus vitae, cursus arcu. 
    </p>
  </div>
  <div className="grid grid-cols-2 gap-4 lg:gap-6 w-fit">
    <img src="/images/home_hero.png" alt="Image 1" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 2" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 3" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 4" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
  </div>
</div>

{/* Section 2: Image left, Desc right */}
<div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 lg:gap-20 mt-16 px-4">
  <div className="grid grid-cols-2 gap-4 lg:gap-6 w-fit order-2 lg:order-1">
    <img src="/images/home_hero.png" alt="Image 1" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 2" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 3" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 4" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
  </div>
  <div className="flex-1 max-w-md flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2">
    <h1 className="text-[32px] bg-[#001F54] text-[#F4C261] px-4 py-2 rounded-xl w-fit mb-2 font-bold">2024</h1>
    <h1 className="font-bold text-[32px] mb-2">Judul</h1>
    <p className="text-[26px] md:text-[24px] lg:text-[26px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices justo ligula,
      et rhoncus sapien luctus a. Sed scelerisque consectetur nisl ut tristique. Donec eu libero 
      cursus, lobortis metus vitae, cursus arcu. 
    </p>
  </div>
</div>

{/* Section 3: Desc left, Image right */}
<div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 lg:gap-20 mt-16 px-4">
  <div className="flex-1 max-w-md flex flex-col items-center lg:items-start text-center lg:text-left">
    <h1 className="text-[32px] bg-[#001F54] text-[#F4C261] px-4 py-2 rounded-xl w-fit mb-2 font-bold">2023</h1>
    <h1 className="font-bold text-[32px] mb-2">Judul</h1>
    <p className="text-[26px] md:text-[24px] lg:text-[26px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices justo ligula,
      et rhoncus sapien luctus a. Sed scelerisque consectetur nisl ut tristique. Donec eu libero 
      cursus, lobortis metus vitae, cursus arcu. 
    </p>
  </div>
  <div className="grid grid-cols-2 gap-4 lg:gap-6 w-fit">
    <img src="/images/home_hero.png" alt="Image 1" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 2" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 3" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 4" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
  </div>
</div>

{/* Section 4: Image left, Desc right */}
<div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 lg:gap-20 mt-16 px-4">
  <div className="grid grid-cols-2 gap-4 lg:gap-6 w-fit order-2 lg:order-1">
    <img src="/images/home_hero.png" alt="Image 1" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 2" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 3" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 4" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
  </div>
  <div className="flex-1 max-w-md flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2">
    <h1 className="text-[32px] bg-[#001F54] text-[#F4C261] px-4 py-2 rounded-xl w-fit mb-2 font-bold">2022</h1>
    <h1 className="font-bold text-[32px] mb-2">Judul</h1>
    <p className="text-[26px] md:text-[24px] lg:text-[26px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices justo ligula,
      et rhoncus sapien luctus a. Sed scelerisque consectetur nisl ut tristique. Donec eu libero 
      cursus, lobortis metus vitae, cursus arcu. 
    </p>
  </div>
</div>

{/* Section 5: Desc left, Image right */}
<div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 lg:gap-20 mt-16 px-4">
  <div className="flex-1 max-w-md flex flex-col items-center lg:items-start text-center lg:text-left">
    <h1 className="text-[32px] bg-[#001F54] text-[#F4C261] px-4 py-2 rounded-xl w-fit mb-2 font-bold">2021</h1>
    <h1 className="font-bold text-[32px] mb-2">Judul</h1>
    <p className="text-[26px] md:text-[24px] lg:text-[26px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices justo ligula,
      et rhoncus sapien luctus a. Sed scelerisque consectetur nisl ut tristique. Donec eu libero 
      cursus, lobortis metus vitae, cursus arcu. 
    </p>
  </div>
  <div className="grid grid-cols-2 gap-4 lg:gap-6 w-fit">
    <img src="/images/home_hero.png" alt="Image 1" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 2" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 3" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 4" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
  </div>
</div>

{/* Section 6: Image left, Desc right */}
<div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 lg:gap-20 mt-16 px-4">
  <div className="grid grid-cols-2 gap-4 lg:gap-6 w-fit order-2 lg:order-1">
    <img src="/images/home_hero.png" alt="Image 1" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 2" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 3" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 4" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
  </div>
  <div className="flex-1 max-w-md flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2">
    <h1 className="text-[32px] bg-[#001F54] text-[#F4C261] px-4 py-2 rounded-xl w-fit mb-2 font-bold">2020</h1>
    <h1 className="font-bold text-[32px] mb-2">Judul</h1>
    <p className="text-[26px] md:text-[24px] lg:text-[26px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices justo ligula,
      et rhoncus sapien luctus a. Sed scelerisque consectetur nisl ut tristique. Donec eu libero 
      cursus, lobortis metus vitae, cursus arcu. 
    </p>
  </div>
</div>

{/* Section 7: Desc left, Image right */}
<div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 lg:gap-20 mt-16 px-4">
  <div className="flex-1 max-w-md flex flex-col items-center lg:items-start text-center lg:text-left">
    <h1 className="text-[32px] bg-[#001F54] text-[#F4C261] px-4 py-2 rounded-xl w-fit mb-2 font-bold">2019</h1>
    <h1 className="font-bold text-[32px] mb-2">Judul</h1>
    <p className="text-[26px] md:text-[24px] lg:text-[26px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices justo ligula,
      et rhoncus sapien luctus a. Sed scelerisque consectetur nisl ut tristique. Donec eu libero 
      cursus, lobortis metus vitae, cursus arcu. 
    </p>
  </div>
  <div className="grid grid-cols-2 gap-4 lg:gap-6 w-fit">
    <img src="/images/home_hero.png" alt="Image 1" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 2" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 3" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 4" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
  </div>
</div>

{/* Section 8: Image left, Desc right */}
<div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 lg:gap-20 mt-16 px-4">
  <div className="grid grid-cols-2 gap-4 lg:gap-6 w-fit order-2 lg:order-1">
    <img src="/images/home_hero.png" alt="Image 1" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 2" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 3" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
    <img src="/images/home_hero.png" alt="Image 4" className="w-48 h-36 md:w-60 md:h-48 object-cover rounded-lg" />
  </div>
  <div className="flex-1 max-w-md flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2">
    <h1 className="text-[32px] bg-[#001F54] text-[#F4C261] px-4 py-2 rounded-xl w-fit mb-2 font-bold">2018</h1>
    <h1 className="font-bold text-[32px] mb-2">Judul</h1>
    <p className="text-[26px] md:text-[24px] lg:text-[26px]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices justo ligula,
      et rhoncus sapien luctus a. Sed scelerisque consectetur nisl ut tristique. Donec eu libero 
      cursus, lobortis metus vitae, cursus arcu. 
    </p>
  </div>
</div>

  <div className="bg-gradient-to-b from-[#F4C261] to-[#8E7138] flex flex-row gap-4 md:gap-8 lg:gap-15 mt-8 lg:mt-15 w-full rounded-3xl p-4 lg:p-0">
    <div className="flex-[2] flex flex-col justify-center p-6 lg:p-10">
        <h1 className="text-[20px] md:text-[28px] lg:text-[32px] font-bold leading-tight">
            BurnCup 2025 <br/> Compete, Explore, Conquer
        </h1>
        <p className="text-[14px] md:text-[14px] lg:text-[26px] font-semibold mt-3 lg:mt-15 leading-relaxed">
            This year, we're taking BurnCup to unprecedented heights with our most ambitious 
            edition yet. Featuring 17 diverse competition categories, we're expecting over 800 
            participants from across all departments. With enhanced production values, prestigious 
            venues, and bigger prizes, BurnCup 2025 promises to be an unforgettable experience for all involved.
        </p>
        <button className="mt-3 lg:mt-6 px-4 lg:px-8 py-2 lg:py-3 bg-[#720606] text-[#F4C261] font-bold rounded-xl shadow hover:bg-[#16396b] transition-colors text-xs md:text-sm lg:text-base">
            REGISTER FOR BURNCUP 2025
        </button>
    </div>
    <div className="flex-1 flex items-center justify-center p-2 md:p-6 lg:p-10">
        <img 
            src="/images/burncup_mascot.png" 
            alt="BurnCup 2025 Mascot" 
            className="w-full max-w-[150px] md:max-w-[300px] lg:max-w-[436px] h-auto object-contain"
        />
    </div>
</div>
        
      </main>
    </div>
  );
}