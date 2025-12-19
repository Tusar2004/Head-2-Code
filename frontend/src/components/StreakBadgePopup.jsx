import { useEffect, useState, useRef } from 'react';
import { Trophy, X, Sparkles, Flame, Zap, Star, Crown, Target, Award, CheckCircle, TrendingUp } from 'lucide-react';

const StreakBadgePopup = ({ isOpen, onClose, dayNumber, currentStreak }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [particles, setParticles] = useState([]);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const confettiRef = useRef(null);

  // Generate particles
  useEffect(() => {
    if (isOpen) {
      setShowAnimation(true);
      
      // Generate confetti particles
      const newParticles = [];
      for (let i = 0; i < 150; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100 - 100,
          rotation: Math.random() * 360,
          size: Math.random() * 15 + 5,
          color: [
            '#FFD700', // Gold
            '#FF6B35', // Orange
            '#FF3366', // Pink
            '#3ABEFF', // Blue
            '#75D701', // Green
            '#FFD166', // Yellow
          ][Math.floor(Math.random() * 6)],
          speed: Math.random() * 3 + 2,
          delay: Math.random() * 0.5,
        });
      }
      setParticles(newParticles);

      // Animate progress bar
      const duration = 2000;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setProgress(progress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    } else {
      setParticles([]);
      setProgress(0);
    }
  }, [isOpen]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Get streak milestone
  const getMilestone = () => {
    if (currentStreak >= 30) return { icon: Crown, name: 'Legend', color: 'from-purple-500 to-pink-500' };
    if (currentStreak >= 14) return { icon: Award, name: 'Champion', color: 'from-blue-500 to-cyan-500' };
    if (currentStreak >= 7) return { icon: Star, name: 'Unstoppable', color: 'from-green-500 to-emerald-500' };
    if (currentStreak >= 3) return { icon: Flame, name: 'On Fire', color: 'from-orange-500 to-red-500' };
    return { icon: Sparkles, name: 'Beginner', color: 'from-yellow-500 to-amber-500' };
  };

  const milestone = getMilestone();

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 animate-gradient-shift"></div>
        
        {/* Twinkling stars */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Confetti Container */}
      <div 
        ref={confettiRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              transform: `rotate(${particle.rotation}deg)`,
              animation: `confetti-fall 2s ${particle.delay}s ease-out forwards`,
              boxShadow: `0 0 ${particle.size}px ${particle.color}`
            }}
          />
        ))}
      </div>

      {/* Popup Container */}
      <div 
        ref={containerRef}
        className={`relative bg-gradient-to-br ${milestone.color} rounded-3xl shadow-2xl p-8 max-w-lg w-full mx-4 border-4 border-white/20 backdrop-blur-xl transform transition-all duration-700 ${
          showAnimation 
            ? 'scale-100 opacity-100 rotate-0 translate-y-0' 
            : 'scale-0 opacity-0 rotate-12 translate-y-10'
        }`}
        style={{
          background: `linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))`,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px rgba(245, 158, 11, 0.5)',
        }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-orange-500/30 to-red-500/30 rounded-3xl blur-3xl -z-10 animate-pulse-slow"></div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 group"
          aria-label="Close"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
            <div className="relative w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/30 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
              <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
            </div>
          </div>
        </button>

        {/* Content */}
        <div className="text-center space-y-8 relative z-10">
          {/* Animated Trophy Container */}
          <div className="relative">
            {/* Orbiting stars */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-yellow-300 to-amber-300 animate-orbit"
                style={{
                  '--orbit-radius': '80px',
                  '--orbit-speed': `${3 + i * 0.5}s`,
                  '--orbit-delay': `${i * 0.2}s`,
                }}
              />
            ))}
            
            {/* Trophy */}
            <div className="relative inline-block">
              {/* Trophy glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-3xl animate-ping opacity-40"></div>
              
              {/* Trophy with shine effect */}
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-400 rounded-full transform rotate-45"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-yellow-300 via-amber-300 to-orange-300 rounded-full shadow-inner"></div>
                <Trophy className="absolute inset-8 w-16 h-16 text-white drop-shadow-2xl animate-bounce" />
              </div>
              
              {/* Sparkle effect */}
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-yellow-300 animate-spin-slow" />
              </div>
              <div className="absolute -bottom-2 -left-2">
                <Zap className="w-8 h-8 text-orange-300 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Header Text */}
          <div className="space-y-3">
            <h2 className="text-5xl font-bold text-white drop-shadow-2xl animate-float">
              🎉 Congratulations! 🎉
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              <p className="text-2xl text-white/90 font-semibold animate-slide-up">
                Challenge Complete!
              </p>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-white/80 text-sm">
              <span>Streak Progress</span>
              <span className="font-bold">{Math.round(progress * 100)}%</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress * 100}%` }}
              >
                <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/30 relative overflow-hidden group">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative">
              {/* Milestone Icon */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
                  <div className="relative w-16 h-16 flex items-center justify-center bg-gradient-to-br from-white/20 to-white/10 rounded-full border border-white/30">
                    {milestone.icon === Crown && <Crown className="w-8 h-8 text-yellow-300 animate-pulse" />}
                    {milestone.icon === Award && <Award className="w-8 h-8 text-blue-300 animate-pulse" />}
                    {milestone.icon === Star && <Star className="w-8 h-8 text-green-300 animate-pulse" />}
                    {milestone.icon === Flame && <Flame className="w-8 h-8 text-orange-300 animate-pulse" />}
                    {milestone.icon === Sparkles && <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-center gap-3">
                  <Target className="w-6 h-6 text-yellow-300 animate-bounce" />
                  <span className="text-4xl font-bold text-white">
                    Day {dayNumber} Complete!
                  </span>
                  <TrendingUp className="w-6 h-6 text-yellow-300 animate-bounce" />
                </div>
                <div className="text-white/90 text-xl">
                  Current streak: <span className="font-bold text-yellow-300 animate-count">{currentStreak} days</span>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg">
                  <span className="text-lg font-semibold text-yellow-200">
                    {milestone.name} Level
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-xl p-5 border border-white/20 transform transition-all duration-300 hover:scale-[1.02] hover:border-white/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-emerald-300" />
              <p className="text-lg font-semibold text-white">Achievement Unlocked!</p>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              {currentStreak === 1 && "🌟 Incredible start! The journey of a thousand miles begins with a single step!"}
              {currentStreak === 2 && "🔥 Back-to-back wins! You're building unstoppable momentum!"}
              {currentStreak === 3 && "💪 Three days strong! Consistency transforms dreams into reality!"}
              {currentStreak >= 4 && currentStreak < 7 && "🚀 Amazing consistency! You're developing elite coding habits!"}
              {currentStreak >= 7 && currentStreak < 14 && "⭐ A full week! You're joining the ranks of dedicated coders!"}
              {currentStreak >= 14 && currentStreak < 30 && "🏆 Two weeks of excellence! You're a true coding warrior!"}
              {currentStreak >= 30 && "👑 A month of unwavering dedication! You've achieved legendary status!"}
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="group relative w-full bg-gradient-to-r from-white to-white/90 text-orange-600 font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-95 overflow-hidden"
          >
            {/* Button shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {/* Button content */}
            <div className="relative flex items-center justify-center gap-3">
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-lg">Continue Your Journey</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            
            {/* Button glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
          </button>
        </div>

        {/* Floating emojis */}
        <div className="absolute -top-6 -left-6 text-3xl animate-float-slow">🚀</div>
        <div className="absolute -top-8 -right-6 text-4xl animate-float-slower">⭐</div>
        <div className="absolute -bottom-6 -left-8 text-4xl animate-float-slowest">🔥</div>
        <div className="absolute -bottom-8 -right-8 text-5xl animate-float-slower">🎯</div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
          }
        }
        
        @keyframes float-slower {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(-5deg);
          }
        }
        
        @keyframes float-slowest {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-25px) scale(1.1);
          }
        }
        
        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes count {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 8s ease infinite;
          background-size: 200% 200%;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-orbit {
          animation: orbit var(--orbit-speed) linear infinite var(--orbit-delay);
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        
        .animate-float-slower {
          animation: float-slower 5s ease-in-out infinite;
        }
        
        .animate-float-slowest {
          animation: float-slowest 6s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.3s both;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        
        .animate-count {
          animation: count 0.5s ease-out 1s both;
        }
      `}</style>
    </div>
  );
};

export default StreakBadgePopup;