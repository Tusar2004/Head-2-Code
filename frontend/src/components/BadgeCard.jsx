import { Lock } from 'lucide-react';

const BadgeCard = ({ badge, progress, unlocked }) => {
    const rarityColors = {
        common: 'from-gray-500 to-gray-600',
        rare: 'from-blue-500 to-cyan-500',
        epic: 'from-purple-500 to-pink-500',
        legendary: 'from-yellow-500 to-orange-500'
    };

    const rarityBorders = {
        common: 'border-gray-500/50',
        rare: 'border-blue-500/50',
        epic: 'border-purple-500/50',
        legendary: 'border-yellow-500/50'
    };

    return (
        <div className={`relative group ${unlocked ? '' : 'opacity-60'}`}>
            {/* Glow Effect */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${rarityColors[badge.rarity]} rounded-xl blur opacity-0 group-hover:opacity-30 transition-all duration-300`}></div>

            {/* Card */}
            <div className={`relative bg-slate-900 rounded-xl p-4 border-2 ${rarityBorders[badge.rarity]} transition-all duration-300 hover:scale-105`}>
                {/* Badge Icon */}
                <div className="text-center mb-3">
                    <div className={`text-5xl ${unlocked ? '' : 'grayscale'}`}>
                        {badge.icon}
                    </div>
                    {!unlocked && (
                        <div className="absolute top-2 right-2">
                            <Lock className="w-4 h-4 text-slate-500" />
                        </div>
                    )}
                </div>

                {/* Badge Info */}
                <div className="text-center">
                    <h3 className="text-white font-bold text-sm mb-1">{badge.name}</h3>
                    <p className="text-slate-400 text-xs mb-2">{badge.description}</p>

                    {/* Rarity Badge */}
                    <span className={`inline-block px-2 py-1 rounded text-xs font-bold bg-gradient-to-r ${rarityColors[badge.rarity]} text-white`}>
                        {badge.rarity.toUpperCase()}
                    </span>

                    {/* Progress Bar (for locked badges) */}
                    {!unlocked && progress && (
                        <div className="mt-3">
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                <span>{progress.current}/{progress.required}</span>
                                <span>{progress.percentage}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-gradient-to-r ${rarityColors[badge.rarity]} transition-all duration-500`}
                                    style={{ width: `${progress.percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* Points */}
                    <div className="mt-2 text-yellow-400 text-xs font-bold">
                        +{badge.points} pts
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BadgeCard;
