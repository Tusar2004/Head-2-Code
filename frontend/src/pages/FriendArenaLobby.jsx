import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Users, Plus, LogIn, Code2, Trophy, Zap, AlertTriangle, Sparkles, Target, Shield, Clock, Crown, Swords, Brain, Star } from 'lucide-react';
import axiosClient from '../utils/axiosClient';

const FriendArenaLobby = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('create'); // 'create' or 'join'
  const [topic, setTopic] = useState('array');
  const [roomCode, setRoomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  const topics = [
    { value: 'array', label: 'Array', icon: '🔢', color: 'from-cyan-500 to-blue-500' },
    { value: 'linkedList', label: 'Linked List', icon: '⛓️', color: 'from-purple-500 to-pink-500' },
    { value: 'string', label: 'String', icon: '📝', color: 'from-emerald-500 to-teal-500' },
    { value: 'binarySearch', label: 'Binary Search', icon: '🎯', color: 'from-orange-500 to-red-500' },
    { value: 'tree', label: 'Tree / BST', icon: '🌳', color: 'from-green-500 to-emerald-500' },
    { value: 'heap', label: 'Heap / Priority Queue', icon: '📊', color: 'from-yellow-500 to-amber-500' },
    { value: 'graph', label: 'Graph', icon: '🕸️', color: 'from-indigo-500 to-purple-500' },
    { value: 'dp', label: 'Dynamic Programming', icon: '⚡', color: 'from-blue-500 to-cyan-500' },
    { value: 'greedy', label: 'Greedy', icon: '💰', color: 'from-amber-500 to-orange-500' },
    { value: 'trie', label: 'Trie', icon: '🔤', color: 'from-pink-500 to-rose-500' },
  ];

  // Initialize particles
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 2 + 0.5,
        delay: Math.random() * 5,
        color: i % 3 === 0 ? '#60a5fa' : i % 3 === 1 ? '#a855f7' : '#10b981'
      });
    }
    setParticles(newParticles);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCreateRoom = async () => {
    if (!topic) {
      setError('Please select a topic');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axiosClient.post('/friend-arena/create', { topic });
      navigate(`/friend-arena/${response.data.arena.roomCode}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create room');
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!roomCode || roomCode.length !== 6) {
      setError('Please enter a valid 6-character room code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axiosClient.post('/friend-arena/join', { roomCode });
      navigate(`/friend-arena/${response.data.arena.roomCode}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to join room');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15) 0%, transparent 50%)`,
          }}
        ></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-float-slow"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.speed * 10}s`,
              opacity: 0.3
            }}
          ></div>
        ))}
      </div>

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse-slower"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse-slowest"></div>
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-b from-slate-900/90 to-transparent backdrop-blur-xl border-b border-slate-800/50 shadow-2xl shadow-blue-500/10">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-all duration-500 animate-pulse-glow"></div>
              <div className="relative bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700 p-4 rounded-xl group-hover:scale-110 transition-all duration-500 shadow-2xl shadow-cyan-500/30 border border-cyan-400/20">
                <Swords className="w-10 h-10 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-black text-white mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-slide-down">
                Friend Arena
              </h1>
              <p className="text-lg text-slate-300 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-spin-slow" />
                Real-time coding battles with friends • Prove your skills
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Target, label: 'Live Battles', value: '128', color: 'from-cyan-500 to-blue-500' },
              { icon: Crown, label: 'Active Players', value: '2.5K', color: 'from-amber-500 to-orange-500' },
              { icon: Brain, label: 'Problems Solved', value: '50K+', color: 'from-emerald-500 to-teal-500' },
            ].map((stat, i) => (
              <div 
                key={i}
                className="group relative animate-fade-in-up bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-500 hover:scale-105 cursor-pointer"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-all duration-500`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className={`text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mb-10">
            <button
              onClick={() => setActiveTab('create')}
              className={`flex-1 relative group animate-slide-in transform transition-all duration-500 hover:scale-105 ${
                activeTab === 'create' ? 'z-10' : ''
              }`}
              style={{ animationDelay: '0.3s' }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              <div className={`relative flex items-center justify-center gap-4 px-8 py-6 rounded-2xl font-bold text-xl transition-all ${
                activeTab === 'create'
                  ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 text-white shadow-2xl shadow-purple-500/40 border border-cyan-400/30'
                  : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800/80 backdrop-blur-sm border border-slate-700'
              }`}>
                <Plus className="w-7 h-7" />
                Create Battle Room
                {activeTab === 'create' && <Sparkles className="w-5 h-5 text-yellow-400 animate-spin-slow" />}
              </div>
            </button>
            <button
              onClick={() => setActiveTab('join')}
              className={`flex-1 relative group animate-slide-in transform transition-all duration-500 hover:scale-105 ${
                activeTab === 'join' ? 'z-10' : ''
              }`}
              style={{ animationDelay: '0.4s' }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              <div className={`relative flex items-center justify-center gap-4 px-8 py-6 rounded-2xl font-bold text-xl transition-all ${
                activeTab === 'join'
                  ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 text-white shadow-2xl shadow-purple-500/40 border border-cyan-400/30'
                  : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800/80 backdrop-blur-sm border border-slate-700'
              }`}>
                <LogIn className="w-7 h-7" />
                Join Battle Room
                {activeTab === 'join' && <Sparkles className="w-5 h-5 text-yellow-400 animate-spin-slow" />}
              </div>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-5 bg-gradient-to-r from-red-500/10 to-rose-500/10 backdrop-blur-sm border border-red-500/30 rounded-2xl text-red-400 flex items-center gap-4 animate-slide-down">
              <div className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg">Battle Alert!</div>
                <div>{error}</div>
              </div>
            </div>
          )}

          {/* Create Room Form */}
          {activeTab === 'create' && (
            <div className="relative group animate-fade-in-right">
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl rounded-3xl p-10 border border-slate-800/50 shadow-2xl shadow-blue-500/10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl">
                    <Code2 className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Forge Your Battle Arena</h2>
                    <p className="text-slate-400">Select your battlefield and summon friends to the challenge</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Topic Selection */}
                  <div>
                    <label className="block text-lg font-bold text-slate-300 mb-5 flex items-center gap-3">
                      <Target className="w-5 h-5 text-cyan-400" />
                      Choose Your Battlefield
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {topics.map((t) => (
                        <button
                          key={t.value}
                          onClick={() => setTopic(t.value)}
                          className={`relative group/item transform transition-all duration-300 hover:scale-105 ${
                            topic === t.value ? 'z-10' : ''
                          }`}
                        >
                          <div className={`absolute -inset-0.5 bg-gradient-to-br ${t.color} rounded-xl blur opacity-0 group-hover/item:opacity-30 group-hover/item:scale-105 transition-all duration-300 ${
                            topic === t.value ? 'opacity-30' : ''
                          }`}></div>
                          <div className={`relative flex flex-col items-center justify-center gap-2 px-4 py-5 rounded-xl font-semibold transition-all ${
                            topic === t.value
                              ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-500/50 text-white shadow-lg shadow-cyan-500/30'
                              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 border border-slate-700'
                          }`}>
                            <span className="text-2xl">{t.icon}</span>
                            <span className="text-sm">{t.label}</span>
                            {topic === t.value && (
                              <div className="absolute -top-2 -right-2">
                                <Star className="w-5 h-5 text-yellow-400 animate-bounce-subtle fill-yellow-400" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Info Card */}
                  <div className="relative group/info">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover/info:opacity-50 transition-all duration-500"></div>
                    <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                      <div className="flex items-start gap-5">
                        <div className="p-3 bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl">
                          <Trophy className="w-8 h-8 text-amber-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            Battle Rules & Rewards
                            <Crown className="w-5 h-5 text-yellow-400" />
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3 group/item">
                              <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg group-hover/item:scale-110 transition-all">
                                <Zap className="w-4 h-4 text-cyan-400" />
                              </div>
                              <div>
                                <div className="text-white font-semibold">2 Challenge Problems</div>
                                <div className="text-sm text-slate-400">Medium-Hard difficulty</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 group/item">
                              <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg group-hover/item:scale-110 transition-all">
                                <Clock className="w-4 h-4 text-purple-400" />
                              </div>
                              <div>
                                <div className="text-white font-semibold">Live Leaderboard</div>
                                <div className="text-sm text-slate-400">Real-time rankings</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 group/item">
                              <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg group-hover/item:scale-110 transition-all">
                                <Shield className="w-4 h-4 text-emerald-400" />
                              </div>
                              <div>
                                <div className="text-white font-semibold">Anti-Cheat System</div>
                                <div className="text-sm text-slate-400">Strict monitoring</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 group/item">
                              <div className="p-2 bg-pink-500/10 border border-pink-500/20 rounded-lg group-hover/item:scale-110 transition-all">
                                <Crown className="w-4 h-4 text-pink-400" />
                              </div>
                              <div>
                                <div className="text-white font-semibold">Glory Awaits</div>
                                <div className="text-sm text-slate-400">First to solve wins!</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Create Button */}
                  <button
                    onClick={handleCreateRoom}
                    disabled={loading || !topic}
                    className="w-full relative group/btn transform transition-all duration-500 hover:scale-105"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 rounded-2xl blur-lg opacity-50 group-hover/btn:opacity-75 transition-all duration-500 animate-pulse-glow"></div>
                    <div className={`relative bg-gradient-to-r from-cyan-600 to-purple-700 hover:from-cyan-500 hover:to-purple-600 text-white font-black py-6 px-8 rounded-2xl text-xl transition-all shadow-2xl shadow-purple-500/50 ${
                      loading || !topic ? 'opacity-60 cursor-not-allowed' : 'group-hover/btn:shadow-3xl group-hover/btn:shadow-purple-500/70'
                    }`}>
                      {loading ? (
                        <span className="flex items-center justify-center gap-3">
                          <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Forging Battle Arena...</span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-3">
                          <Swords className="w-6 h-6" />
                          <span>Forge Battle Arena</span>
                          <Sparkles className="w-5 h-5 group-hover/btn:animate-spin-slow" />
                        </span>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Join Room Form */}
          {activeTab === 'join' && (
            <div className="relative group animate-fade-in-right">
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl rounded-3xl p-10 border border-slate-800/50 shadow-2xl shadow-blue-500/10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl">
                    <LogIn className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Enter the Battlefield</h2>
                    <p className="text-slate-400">Join an existing arena and prove your coding prowess</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Room Code Input */}
                  <div>
                    <label className="block text-lg font-bold text-slate-300 mb-5 flex items-center gap-3">
                      <Target className="w-5 h-5 text-blue-400" />
                      Enter Battle Arena Code
                    </label>
                    <div className="relative group/input">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-0 group-hover/input:opacity-20 transition-all duration-500"></div>
                      <input
                        type="text"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value.toUpperCase().slice(0, 6))}
                        placeholder="ABCD12"
                        maxLength={6}
                        className="relative w-full bg-gradient-to-br from-slate-800/60 to-slate-900/40 border-2 border-slate-700 text-white text-center text-5xl font-black tracking-widest px-8 py-10 rounded-2xl focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 transition-all uppercase backdrop-blur-sm shadow-lg"
                      />
                      <div className="absolute inset-0 rounded-2xl pointer-events-none border border-transparent group-hover/input:border-cyan-500/30 transition-all duration-500"></div>
                    </div>
                    <div className="text-center mt-4">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full">
                        <span className="text-sm text-slate-400">Format: 6 characters</span>
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                      </div>
                    </div>
                  </div>

                  {/* Rules Card */}
                  <div className="relative group/info">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-hover/info:opacity-50 transition-all duration-500"></div>
                    <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                      <div className="flex items-start gap-5">
                        <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl">
                          <Shield className="w-8 h-8 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            Strict Battle Protocols
                            <AlertTriangle className="w-5 h-5 text-amber-400" />
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3 group/item">
                              <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg group-hover/item:scale-110 transition-all">
                                <div className="w-4 h-4 text-red-400 font-bold">⚠️</div>
                              </div>
                              <div>
                                <div className="text-white font-semibold">Fullscreen Required</div>
                                <div className="text-sm text-slate-400">No distractions allowed</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 group/item">
                              <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg group-hover/item:scale-110 transition-all">
                                <div className="w-4 h-4 text-amber-400 font-bold">1</div>
                              </div>
                              <div>
                                <div className="text-white font-semibold">Single Tab Only</div>
                                <div className="text-sm text-slate-400">Strict tab monitoring</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 group/item">
                              <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg group-hover/item:scale-110 transition-all">
                                <Clock className="w-4 h-4 text-purple-400" />
                              </div>
                              <div>
                                <div className="text-white font-semibold">Sync Start</div>
                                <div className="text-sm text-slate-400">Battle begins together</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 group/item">
                              <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg group-hover/item:scale-110 transition-all">
                                <Zap className="w-4 h-4 text-emerald-400" />
                              </div>
                              <div>
                                <div className="text-white font-semibold">Speed Matters</div>
                                <div className="text-sm text-slate-400">Fastest solution wins</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Join Button */}
                  <button
                    onClick={handleJoinRoom}
                    disabled={loading || roomCode.length !== 6}
                    className="w-full relative group/btn transform transition-all duration-500 hover:scale-105"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 rounded-2xl blur-lg opacity-50 group-hover/btn:opacity-75 transition-all duration-500 animate-pulse-glow"></div>
                    <div className={`relative bg-gradient-to-r from-cyan-600 to-purple-700 hover:from-cyan-500 hover:to-purple-600 text-white font-black py-6 px-8 rounded-2xl text-xl transition-all shadow-2xl shadow-purple-500/50 ${
                      loading || roomCode.length !== 6 ? 'opacity-60 cursor-not-allowed' : 'group-hover/btn:shadow-3xl group-hover/btn:shadow-purple-500/70'
                    }`}>
                      {loading ? (
                        <span className="flex items-center justify-center gap-3">
                          <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Entering Battle Arena...</span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-3">
                          <LogIn className="w-6 h-6" />
                          <span>Enter Battle Arena</span>
                          <Sparkles className="w-5 h-5 group-hover/btn:animate-spin-slow" />
                        </span>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-15px) translateX(5px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }

        @keyframes pulse-slower {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.05);
          }
        }

        @keyframes pulse-slowest {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.15) rotate(5deg);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
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

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
          animation-fill-mode: both;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out;
          animation-fill-mode: both;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out;
          animation-fill-mode: both;
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
          animation-fill-mode: both;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }

        .animate-pulse-slowest {
          animation: pulse-slowest 8s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Smooth scrolling */
        * {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #0f172a;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }

        /* Prevent text selection on decorative elements */
        .select-none {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        /* Smooth transitions for all interactive elements */
        button, a, input {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Glass morphism effect */
        .backdrop-blur-xl {
          backdrop-filter: blur(16px);
        }

        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
      `}</style>
    </div>
  );
};

export default FriendArenaLobby;