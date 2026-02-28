import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Linkedin, Instagram, ArrowRight, ArrowLeft } from 'lucide-react';

// --- SVGs & Icons ---

const DoodleIcons = [
  // Owl
  () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C10 2 8 3 7 5C6 7 6 9 7 11C8 13 10 14 12 14C14 14 16 13 17 11C18 9 18 7 17 5C16 3 14 2 12 2Z" />
      <path d="M8 7H8.01M16 7H16.01" strokeLinecap="round" />
      <path d="M9 18C9 18 10 21 12 21C14 21 15 18 15 18" />
      <path d="M4 10C4 10 2 11 2 14C2 17 4 18 4 18" />
      <path d="M20 10C20 10 22 11 22 14C22 17 20 18 20 18" />
    </svg>
  ),
  // Arrow
  () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // Flower
  () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 12M12 12C14 12 16 10 16 8C16 6 14 4 12 4C10 4 8 6 8 8C8 10 10 12 12 12ZM12 12C12 14 10 16 8 16C6 16 4 14 4 12C4 10 6 8 8 8C10 8 12 10 12 12ZM12 12C10 12 8 14 8 16C8 18 10 20 12 20C14 20 16 18 16 16C16 14 14 12 12 12ZM12 12C12 10 14 8 16 8C18 8 20 10 20 12C20 14 18 16 16 16C14 16 12 14 12 12Z" />
    </svg>
  ),
  // Diamond
  () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 12L12 22L22 12L12 2Z" />
    </svg>
  ),
  // Spiral
  () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 12C12 12 13 10 15 10C17 10 18 12 18 14C18 17 15 19 12 19C8 19 5 16 5 12C5 7 9 4 14 4C20 4 23 9 23 14" />
    </svg>
  )
];

const ChalkDoodles = () => (
  <>
    {/* Juice Box */}
    <div className="chalk-doodle top-[15%] left-[2%] w-24 h-24 rotate-12">
      <svg viewBox="0 0 100 100" stroke="white" fill="none" strokeWidth="1.5" opacity="0.4">
        <rect x="30" y="30" width="40" height="60" rx="2" />
        <path d="M50 30 L50 15 Q50 10 55 10 L65 10" />
        <circle cx="50" cy="60" r="8" />
      </svg>
    </div>
    {/* Fish */}
    <div className="chalk-doodle bottom-[15%] right-[3%] w-32 h-20 -rotate-12">
      <svg viewBox="0 0 120 80" stroke="white" fill="none" strokeWidth="1.5" opacity="0.4">
        <path d="M10 40 Q30 10 60 40 T110 40 M10 40 Q30 70 60 40 T110 40" />
        <path d="M110 40 L125 25 L125 55 Z" />
        <circle cx="25" cy="35" r="2" fill="white" />
      </svg>
    </div>
    {/* Flower */}
    <div className="chalk-doodle top-[50%] right-[2%] w-20 h-20 rotate-45">
      <svg viewBox="0 0 100 100" stroke="white" fill="none" strokeWidth="1.5" opacity="0.4">
        <circle cx="50" cy="50" r="10" />
        <path d="M50 40 Q50 20 60 20 Q70 20 70 40 Q70 50 50 50" />
        <path d="M60 50 Q80 50 80 60 Q80 70 60 70 Q50 70 50 50" />
        <path d="M50 60 Q50 80 40 80 Q30 80 30 60 Q30 50 50 50" />
        <path d="M40 50 Q20 50 20 40 Q20 30 40 30 Q50 30 50 50" />
      </svg>
    </div>
  </>
);

// --- Components ---

const StampColumn = ({ side }: { side: 'left' | 'right' }) => {
  const tiles = Array.from({ length: 25 });
  return (
    <div className={`stamp-column ${side === 'left' ? 'left-0' : 'right-0'}`}>
      {tiles.map((_, i) => {
        const Icon = DoodleIcons[i % DoodleIcons.length];
        return (
          <div key={i} className="stamp-tile">
            <Icon />
          </div>
        );
      })}
    </div>
  );
};

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      className="fixed top-0 left-0 w-full z-[100] py-8 flex justify-center pointer-events-none"
    >
      <div className="flex gap-12 text-notebook-cream font-sans text-lg pointer-events-auto">
        <a href="#about" className="nav-link flex items-center gap-2">
          <span className="text-xl">☻</span> about
        </a>
        <a href="#work" className="nav-link">Work</a>
        <a href="#connect" className="nav-link">Connect</a>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
      <div className="w-[72vw] grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-hand text-6xl text-notebook-cream mb-2">Vallary</h2>
          <p className="font-sans text-xl text-notebook-cream/60 mb-8 tracking-wide">Marketing Student</p>
          <h1 className="font-serif text-6xl md:text-8xl leading-tight text-notebook-cream mb-8">
            Marketing should<br />
            <span className="italic text-stamp-red">feel</span> human
          </h1>
          <p className="font-sans text-sm text-notebook-cream/40 uppercase tracking-widest">
            New Delhi • GMT +5:30
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <svg viewBox="0 0 400 400" className="w-full h-auto stroke-stamp-red fill-none" strokeWidth="1.5">
            {/* Girl at desk illustration - simplified line art */}
            <path d="M100 300 L300 300 M150 300 L150 200 Q150 150 200 150 Q250 150 250 200 L250 300" />
            <circle cx="200" cy="120" r="30" />
            <path d="M180 200 L220 200 M190 220 L210 220" />
            <rect x="220" y="240" width="40" height="30" rx="2" />
            <path d="M280 250 Q300 250 300 220" />
            <path d="M80 250 Q60 250 60 220" />
            {/* Plants */}
            <path d="M320 300 Q340 250 320 200 M320 300 Q300 250 320 200" />
            <path d="M80 300 Q100 250 80 200 M80 300 Q60 250 80 200" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

const AboutNotebook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const totalSpreads = 3;
  const touchStart = useRef(0);

  const handleNext = () => {
    if (currentPage < totalSpreads - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const delta = touchStart.current - touchEnd;
    if (delta > 50) handleNext();
    if (delta < -50) handlePrev();
  };

  const spreads = [
    // Spread 1
    {
      left: (
        <div className="p-12 h-full flex flex-col justify-center">
          <h2 className="font-hand text-5xl text-stamp-red mb-4">Vallary</h2>
          <p className="font-sans text-dark-text/60 mb-6">Marketing Student</p>
          <p className="font-sans text-dark-text text-lg leading-relaxed">
            Hi! I'm Vallary — a marketing student obsessed with how brands make people feel things. 
            I think the best marketing is barely noticeable because it just feels right.
          </p>
        </div>
      ),
      right: (
        <div className="p-12 h-full relative flex items-center justify-center">
          <div className="w-64 h-80 bg-outer/10 border-2 border-stamp-red/20 rounded-lg flex items-center justify-center relative overflow-hidden">
             <img src="https://picsum.photos/seed/vallary/400/500" alt="Portrait" className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
             <div className="absolute top-4 right-4 font-hand text-stamp-red -rotate-12 bg-white/80 px-2 py-1 rounded shadow-sm">that's me!</div>
          </div>
          <div className="absolute top-10 left-10 font-hand text-dark-text/70 rotate-6">Age: 21</div>
          <div className="absolute bottom-10 left-20 font-hand text-dark-text/70 -rotate-3">City: New Delhi</div>
          <div className="absolute top-20 right-10 font-hand text-dark-text/70 -rotate-12">Swiftie 🧣</div>
          <div className="absolute bottom-20 right-20 font-hand text-dark-text/70 rotate-2">Iced Coffee ☕</div>
        </div>
      )
    },
    // Spread 2
    {
      left: (
        <div className="p-12 h-full flex flex-col justify-center">
          <h3 className="font-hand text-2xl text-stamp-red mb-8">what i do</h3>
          <div className="grid grid-cols-2 gap-4">
            {['Brand Strategy', 'Content Creation', 'Campaign Design', 'Social Media', 'Consumer Research', 'Storytelling'].map((item, i) => (
              <div key={i} className="sticky-note" style={{ transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)` }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      ),
      right: (
        <div className="p-12 h-full flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-64 h-64 stroke-stamp-red fill-none" strokeWidth="1.5">
            <path d="M100 100 Q100 60 140 60 Q180 60 180 100 Q180 140 140 140 Q100 140 100 100" />
            <path d="M100 100 Q100 60 60 60 Q20 60 20 100 Q20 140 60 140 Q100 140 100 100" />
            <circle cx="150" cy="50" r="10" />
            <path d="M50 50 L70 70 M50 70 L70 50" />
            <path d="M150 150 L170 170" />
          </svg>
        </div>
      )
    },
    // Spread 3
    {
      left: (
        <div className="p-12 h-full flex flex-col justify-center relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-stamp-red/20 -translate-x-1/2">
             <svg className="h-full w-4 absolute left-1/2 -translate-x-1/2" preserveAspectRatio="none">
                <path d="M2 0 Q8 50 2 100 T2 200 T2 300 T2 400 T2 500" stroke="#C0392B" fill="none" strokeWidth="2" />
             </svg>
          </div>
          <div className="space-y-12 relative z-10">
            {[
              { year: '2022', desc: 'Started Marketing Degree' },
              { year: '2023', desc: 'First Brand Internship' },
              { year: '2024', desc: 'Freelance Content Strategy' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-8">
                <div className="w-1/2 text-right font-hand text-2xl text-stamp-red">{item.year}</div>
                <div className="w-4 h-4 rounded-full bg-stamp-red border-4 border-notebook-cream shadow-sm" />
                <div className="w-1/2 font-sans text-dark-text">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      ),
      right: (
        <div className="p-12 h-full flex flex-col items-center justify-center relative">
          <h2 className="font-serif italic text-4xl text-center text-dark-text leading-tight">
            "Everything you do,<br />do it with care."
          </h2>
          <div className="absolute top-1/4 right-10 sticky-note bg-accent-blue/40 -rotate-6">
             Note to self: Stay curious.
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20">
      <div 
        className="w-[85vw] h-[80vh] relative book-perspective"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Book Base */}
        <div className="absolute inset-0 bg-notebook-cream rounded-[20px] border-[5px] border-stamp-red shadow-2xl overflow-hidden flex">
          <div className="w-1/2 h-full grid-pattern border-r border-black/5 shadow-[inset_-4px_0_8px_rgba(0,0,0,0.1)]" />
          <div className="w-1/2 h-full grid-pattern shadow-[inset_4px_0_8px_rgba(0,0,0,0.1)]" />
          
          {/* Spine Shadow */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-20 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none z-20" />
          
          {/* Content */}
          <div className="absolute inset-0 flex z-10">
            <div className="w-1/2 h-full overflow-hidden">
              <div className="h-full">
                {spreads[currentPage].left}
              </div>
            </div>
            <div className="w-1/2 h-full overflow-hidden">
              <div className="h-full">
                {spreads[currentPage].right}
              </div>
            </div>
          </div>

          {/* Flipping Page Overlay */}
          <AnimatePresence>
            {isFlipping && (
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -180 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{ transformOrigin: "left center", left: "50%" }}
                className="absolute top-0 bottom-0 right-0 w-1/2 bg-notebook-cream border-l border-black/10 z-40 shadow-2xl"
              >
                <div className="w-full h-full grid-pattern opacity-10" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Page Turn Controls */}
        <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
          <button 
            onClick={handleNext} 
            disabled={currentPage === totalSpreads - 1 || isFlipping}
            className="p-4 bg-stamp-red text-white rounded-full shadow-lg disabled:opacity-30 transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ArrowRight size={24} />
          </button>
          <button 
            onClick={handlePrev} 
            disabled={currentPage === 0 || isFlipping}
            className="p-4 bg-stamp-red text-white rounded-full shadow-lg disabled:opacity-30 transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={24} />
          </button>
        </div>

        {/* Page Number */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-dark-text/40 z-30">
          0{currentPage + 1} / 0{totalSpreads}
        </div>
      </div>
    </section>
  );
};

const VideoItem = ({ src, title }: { src: string, title: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="project-card cursor-pointer group relative" onClick={togglePlay}>
      <video ref={videoRef} src={src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <ArrowRight className="text-white fill-white ml-1" size={32} />
          </div>
        </div>
      )}
    </div>
  );
};

const Projects = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const items = [
    { title: 'Brand Campaign', type: 'image', src: 'https://picsum.photos/seed/campaign/800/600', rot: -2 },
    { title: 'Social Strategy', type: 'image', src: 'https://picsum.photos/seed/social/600/800', rot: 3 },
    { title: 'Content Series', type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', rot: -1 },
    { title: 'Research Project', type: 'image', src: 'https://picsum.photos/seed/research/800/600', rot: 2 },
  ];

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const x = (touch.clientX / window.innerWidth - 0.5) * 10;
    const y = (touch.clientY / window.innerHeight - 0.5) * 10;
    setParallax({ x, y });
  };

  const handleTouchEnd = () => {
    setParallax({ x: 0, y: 0 });
  };

  return (
    <section 
      id="work" 
      className="py-32 flex flex-col items-center"
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-[72vw]">
        <h2 className="font-hand text-4xl text-notebook-cream mb-16">things i've made</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              animate={{ 
                x: parallax.x * (i % 2 === 0 ? 1 : -1), 
                y: parallax.y * (i < 2 ? 1 : -1) 
              }}
              className="flex flex-col gap-4"
              style={{ rotate: `${item.rot}deg` }}
            >
              {item.type === 'image' ? (
                <div 
                  className="project-card cursor-pointer group"
                  onClick={() => setSelectedImage(item.src)}
                >
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
              ) : (
                <VideoItem src={item.src} title={item.title} />
              )}
              <p className="font-hand text-xl text-notebook-cream/80">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-8 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage}
              className="max-w-full max-h-full rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const InfiniteTicker = () => {
  const items = ['Vallary', 'Marketing nerd', 'Brand obsessed', 'Delhi girl', 'Night owl', 'Swiftie', 'Iced coffee', 'Creative chaos'];
  const [dragX, setDragX] = useState(0);
  const tickerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    const handleStart = (e: MouseEvent | TouchEvent) => {
      isDragging.current = true;
      startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
      lastX.current = startX.current;
      lastTime.current = performance.now();
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const delta = x - lastX.current;
      const now = performance.now();
      const dt = now - lastTime.current;
      
      if (dt > 0) {
        velocity.current = delta / dt;
      }
      
      setDragX(prev => (prev + delta) % 1000);
      lastX.current = x;
      lastTime.current = now;
    };

    const handleEnd = () => {
      isDragging.current = false;
      const decay = () => {
        if (Math.abs(velocity.current) < 0.01) return;
        setDragX(prev => (prev + velocity.current * 16) % 1000);
        velocity.current *= 0.95;
        animationFrame.current = requestAnimationFrame(decay);
      };
      animationFrame.current = requestAnimationFrame(decay);
    };

    ticker.addEventListener('mousedown', handleStart);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    ticker.addEventListener('touchstart', handleStart);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);

    return () => {
      ticker.removeEventListener('mousedown', handleStart);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      ticker.removeEventListener('touchstart', handleStart);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, []);

  return (
    <div className="py-20 bg-stamp-red/5 border-y border-stamp-red/20 overflow-hidden flex cursor-grab active:cursor-grabbing" ref={tickerRef}>
      <motion.div
        style={{ x: dragX }}
        animate={!isDragging.current && velocity.current === 0 ? { x: [dragX, dragX - 1000] } : {}}
        transition={!isDragging.current && velocity.current === 0 ? { duration: 20, repeat: Infinity, ease: "linear" } : { duration: 0 }}
        className="flex whitespace-nowrap"
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="ticker-item select-none">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Contact = () => {
  return (
    <section id="connect" className="py-32 flex justify-center">
      <div className="w-[72vw] grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h2 className="font-hand text-5xl text-notebook-cream mb-12">let's chat!</h2>
          <h3 className="font-hand text-xl text-stamp-red mb-6">what i'm looking for</h3>
          <ul className="space-y-4 font-sans text-lg text-notebook-cream/80">
            {['Meaningful work', 'Creative challenges', 'People who care deeply', 'Brands with a point of view'].map((text, i) => (
              <li key={i} className="flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-stamp-red" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-12 justify-center relative">
          {/* Envelope Doodle */}
          <div className="absolute -top-20 -right-10 w-24 h-24 rotate-12 opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 100" stroke="#C0392B" fill="none" strokeWidth="2">
              <rect x="10" y="20" width="80" height="60" rx="5" />
              <path d="M10 20 L50 60 L90 20" />
            </svg>
          </div>
          {[
            { label: 'vallarynegi@gmail.com', icon: Mail, href: 'mailto:vallarynegi@gmail.com' },
            { label: 'linkedin.com/in/vallary16/', icon: Linkedin, href: 'https://linkedin.com/in/vallary16/' },
            { label: '@vallary_negi', icon: Instagram, href: 'https://instagram.com/vallary_negi' }
          ].map((link, i) => (
            <a 
              key={i} 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 text-2xl font-sans hover:text-stamp-red transition-colors duration-300 relative py-2 w-fit"
            >
              <div className="flex items-center gap-4">
                <link.icon className="text-stamp-red" />
                {link.label}
              </div>
              <svg className="w-full h-2 text-stamp-red overflow-visible" viewBox="0 0 100 10" preserveAspectRatio="none">
                <motion.path
                  d="M0 5 Q 25 0, 50 5 T 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileHover={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </svg>
              {link.icon === Mail && (
                <div className="absolute -right-12 top-2 text-stamp-red opacity-0 group-hover:opacity-100 transition-opacity">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                   </svg>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return <div ref={cursorRef} className="custom-cursor hidden md:block" />;
};

export default function App() {
  return (
    <div className="relative min-h-screen selection:bg-stamp-red selection:text-white bg-outer">
      <CustomCursor />
      <StampColumn side="left" />
      <StampColumn side="right" />
      <ChalkDoodles />
      
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <AboutNotebook />
        <Projects />
        <InfiniteTicker />
        <Contact />
      </main>
      
      <footer className="py-12 text-center font-hand text-notebook-cream/20">
        built with care • 2026
      </footer>
    </div>
  );
}
