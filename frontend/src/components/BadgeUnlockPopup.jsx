import { X, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const BadgeUnlockPopup = ({ badge, onClose }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        const timer = setTimeout(() => {
            handleClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setShow(false);
        setTimeout(onClose, 300);
    };

    const rarityColors = {
        common: 'from-gray-500 to-gray-600',
        rare: 'from-blue-500 to-cyan-500',
        epic: 'from-purple-500 to-pink-500',
        legendary: 'from-yellow-500 to-orange-500'
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose}></div>

            {/* Popup */}
            <div className={`relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-8 max-w-md w-full border-2 ${badge.rarity === 'legendary' ? 'border-yellow-500' : badge.rarity === 'epic' ? 'border-purple-500' : badge.rarity === 'rare' ? 'border-blue-500' : 'border-gray-500'} shadow-2xl transform transition-all duration-500 ${show ? 'scale-100 rotate-0' : 'scale-50 rotate-12'}`}>
                {/* Close Button */}
                <button onClick={handleClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>

                {/* Confetti Effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-confetti"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `-10%`,
                                animationDelay: `${Math.random() * 0.5}s`,
                                animationDuration: `${1 + Math.random()}s`
                            }}
                        ></div>
                    ))}
                </div>

                {/* Content */}
                <div className="text-center relative z-10">
                    <div className="mb-4">
                        <div className={`inline-block p-4 rounded-full bg-gradient-to-r ${rarityColors[badge.rarity]} animate-bounce-slow`}>
                            <div className="text-6xl">{badge.icon}</div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-black text-white mb-2">
                        Badge Unlocked!
                    </h2>

                    <h3 className={`text-2xl font-bold bg-gradient-to-r ${rarityColors[badge.rarity]} bg-clip-text text-transparent mb-3`}>
                        {badge.name}
                    </h3>

                    <p className="text-slate-300 mb-4">{badge.description}</p>

                    <div className="flex items-center justify-center gap-4 mb-4">
                        <span className={`px-4 py-2 rounded-lg bg-gradient-to-r ${rarityColors[badge.rarity]} text-white font-bold text-sm`}>
                            {badge.rarity.toUpperCase()}
                        </span>
                        <span className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-400 font-bold text-sm flex items-center gap-1">
                            <Star className="w-4 h-4" fill="currentColor" />
                            +{badge.points} Points
                        </span>
                    </div>

                    <button
                        onClick={handleClose}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all"
                    >
                        Awesome!
                    </button>
                </div>
            </div>

            <style>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default BadgeUnlockPopup;
