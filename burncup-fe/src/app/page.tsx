import Image from 'next/image';
import '@/app/globals.css';
import EventTimeline from '@/components/home/event_timeline';
import CompetitionCategoriesCard from '@/components/home/competition_categories_card';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="w-screen h-[50vh]" style={{
        backgroundImage: 'url(/images/home_hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className='h-full flex flex-row justify-center items-center bg-gradient-to-b from-black/60 to-black/30'>
          <Image
            src="/images/burncup_logo.png"
            alt="Burncup Logo"
            width={250}
            height={150}
            className='object-contain'
          />
          <div className='flex flex-col items-center justify-center text-center space-y-2 w-1/3'>
            <p className='text-4xl font-bold text-text-primary'>Burncup 2025</p>
            <p className='text-2xl font-bold text-white'>COMPETE, EXPLORE, CONQUER</p>
            <p className='text-2xl font-font-semibold text-white'>The biggest internal competition event at Binus University Bekasi. Join us and showcase your talents!</p>
            
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className='mt-10 mb-20'>
        <div className='flex flex-row items-center'>
          <div className='p-10 flex flex-col justify-center items-start space-y-4'>
            <h2 className='text-3xl font-bold text-text-secondary'>WHAT IS BURNCUP?</h2>
            <p className='text-lg text-text-secondary'>
              Burncup adalah Kompetisi tahunan yang digelar oleh Binus University Bekasi. Sampai sekarang, Acara ini terus menjadi ajang bagi para mahasiswa BINUS Bekasi dan para pelajar SMA/SMK/MA Jabodetabek untuk menunjukkan bakat, menjalin persahabatan dan memperebutkan piala bergilir.
            </p>
            <p className='text-lg text-text-secondary'>
              Kompetisi BurnCup 2025 hadir dengan konsep dan tema baru yaitu “The Global Odessey”. Dalam konteks acara ini, “The Global Odessey” melambangkan perjalanan penuh rintangan bagi peserta dalam meraih gelar juara. Adapun Slogan Burncup kali ini yaitu “Compete, Explore and Conquer”.
            </p>
          </div>
          <Image
            src="/images/burncup_mascot.png"
            alt="About Burncup"
            width={1000}
            height={1000}
            className='object-contain h-100'
          />
        </div>
      </section>
      <CompetitionCategoriesCard />

      <EventTimeline />
    </div>
  );
}
