import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';
import { Code2, Trophy, Target, Zap, Filter, User, LogOut, Shield, CheckCircle2, Circle, Flame, Users, Sparkles, TrendingUp, BarChart3, Clock, Award, ChevronRight, Search, Bell, Star, Crown, Calendar, Hash, ArrowRight, Eye, Clock as ClockIcon, Lock, Unlock, Sun, Moon } from 'lucide-react';
import BadgeUnlockPopup from '../components/BadgeUnlockPopup';

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [userStreak, setUserStreak] = useState({ currentStreak: 0 });
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all'
  });
  const [hoveredProblem, setHoveredProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [particles, setParticles] = useState([]);
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to 'dark'
    return localStorage.getItem('homepage-theme') || 'dark';
  });
  const [unseenBadges, setUnseenBadges] = useState([]);
  const [currentBadgePopup, setCurrentBadgePopup] = useState(null);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('homepage-theme', newTheme);
  };

  // Theme-aware colors
  const themeColors = {
    dark: {
      bg: 'from-slate-950 via-slate-900 to-blue-950',
      cardBg: 'from-slate-900/80 to-slate-950/80',
      navBg: 'from-slate-900/95 to-slate-900/80',
      text: 'text-white',
      textSecondary: 'text-slate-300',
      textMuted: 'text-slate-400',
      border: 'border-slate-800/50',
      cardHover: 'hover:border-blue-500/50',
      inputBg: 'from-slate-800/60 to-slate-900/40',
      inputBorder: 'border-slate-700',
      statBg: 'from-slate-900/90 to-slate-950/90',
      particleColors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']
    },
    light: {
      bg: 'from-slate-50 via-blue-50 to-slate-100',
      cardBg: 'from-white/95 to-slate-50/95',
      navBg: 'from-white/98 to-slate-50/95',
      text: 'text-slate-900',
      textSecondary: 'text-slate-700',
      textMuted: 'text-slate-600',
      border: 'border-slate-200',
      cardHover: 'hover:border-blue-400',
      inputBg: 'from-white to-slate-50',
      inputBorder: 'border-slate-300',
      statBg: 'from-white/95 to-slate-50/95',
      particleColors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']
    }
  };

  const colors = themeColors[theme];

  // Initialize particles for background
  useEffect(() => {
    const newParticles = [];
    const particleColors = colors.particleColors;
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 0.5,
        delay: Math.random() * 5,
        color: particleColors[i % particleColors.length]
      });
    }
    setParticles(newParticles);
  }, [theme]);

  // Check for unseen badges on mount
  useEffect(() => {
    const checkUnseenBadges = async () => {
      try {
        const response = await axiosClient.get('/achievements/unseen');
        if (response.data && response.data.length > 0) {
          setUnseenBadges(response.data);
          // Show first badge immediately
          setCurrentBadgePopup(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching unseen badges:', error);
      }
    };
    if (user) {
      checkUnseenBadges();
    }
  }, [user]);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [problemsRes, solvedRes, streakRes] = await Promise.all([
          axiosClient.get('/problem/getAllProblem'),
          user ? axiosClient.get('/problem/problemSolvedByUser') : Promise.resolve({ data: [] }),
          user ? axiosClient.get('/daily-challenge/streak') : Promise.resolve({ data: { currentStreak: 0 } })
        ]);

        setProblems(problemsRes.data);
        setSolvedProblems(solvedRes.data);
        setUserStreak(streakRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]);
  };

  const filteredProblems = problems.filter(problem => {
    const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
    const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
    const statusMatch = filters.status === 'all' ||
      (filters.status === 'solved' ? solvedProblems.some(sp => sp._id === problem._id) : true);
    return difficultyMatch && tagMatch && statusMatch;
  });

  const stats = {
    total: problems.length,
    solved: solvedProblems.length,
    easy: problems.filter(p => p.difficulty === 'easy').length,
    medium: problems.filter(p => p.difficulty === 'medium').length,
    hard: problems.filter(p => p.difficulty === 'hard').length,
    solvedPercentage: problems.length ? Math.round((solvedProblems.length / problems.length) * 100) : 0,
    dailyGoal: Math.min(solvedProblems.length + 3, 10)
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} relative overflow-hidden transition-colors duration-500`}>
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-grid-pattern"></div>
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
              opacity: 0.2
            }}
          ></div>
        ))}
      </div>

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse-slower"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse-slowest"></div>
      </div>

      {/* Professional Navigation Bar with Glass Effect */}
      <nav className={`bg-gradient-to-b ${colors.navBg} backdrop-blur-xl border-b ${colors.border} sticky top-0 z-50 shadow-2xl ${theme === 'dark' ? 'shadow-blue-500/5' : 'shadow-slate-200'} transition-colors duration-500`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <NavLink to="/" className="flex items-center gap-3 group animate-slide-down">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500 animate-pulse-glow"></div>
                <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 p-3 rounded-xl group-hover:scale-110 transition-all duration-500 shadow-2xl shadow-blue-500/50 border border-blue-400/20">
                  <span className="text-3xl font-black text-white drop-shadow-lg" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>H₂C</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="text-2xl font-black text-white tracking-tight group-hover:text-blue-300 transition-colors">Head-2-Code</div>
                <div className="text-xs text-blue-400 font-bold uppercase tracking-widest">Master Coding Skills</div>
              </div>
            </NavLink>

            <div className="flex items-center gap-4">
              {/* Quick Stats */}
              <div className="hidden lg:flex items-center gap-4">
                {/* Daily Challenge */}
                <NavLink
                  to="/daily-challenge"
                  className="relative group transform transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition-all duration-300"></div>
                  <div className="relative flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 px-4 py-2.5 rounded-lg border border-orange-500/50 hover:from-orange-500 hover:to-red-500 transition-all shadow-lg shadow-orange-500/20">
                    <Flame className="w-4 h-4 text-white animate-pulse" />
                    <span className="text-sm font-bold text-white">Daily Challenge</span>
                  </div>
                </NavLink>

                {/* Friend Arena */}
                <NavLink
                  to="/friend-arena"
                  className="relative group transform transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition-all duration-300"></div>
                  <div className="relative flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-slate-700 hover:bg-slate-700/80 transition-all">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-bold text-white">Friend Arena</span>
                  </div>
                </NavLink>

                {/* Contests */}
                <NavLink
                  to="/contests"
                  className="relative group transform transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition-all duration-300"></div>
                  <div className="relative flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-slate-700 hover:bg-slate-700/80 transition-all">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-bold text-white">Contests</span>
                  </div>
                </NavLink>
              </div>

              {/* Stats Badges */}
              <div className="hidden md:flex items-center gap-3">
                {/* Streak */}
                <div className="relative group">
                  <div className={`absolute -inset-0.5 rounded-lg blur opacity-0 group-hover:opacity-30 transition-all duration-300 ${userStreak.currentStreak > 0 ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-slate-500 to-slate-600'
                    }`}></div>
                  <div className={`relative flex items-center gap-2 px-3 py-2 rounded-lg border backdrop-blur-sm ${userStreak.currentStreak > 0
                    ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/40'
                    : 'bg-slate-800/80 border-slate-700'
                    }`}>
                    <Flame
                      className={`w-4 h-4 ${userStreak.currentStreak > 0 ? 'text-orange-400 animate-pulse' : 'text-slate-500'}`}
                      fill={userStreak.currentStreak > 0 ? '#fb923c' : 'none'}
                    />
                    <span className="text-sm font-bold text-white">{userStreak.currentStreak || 0}</span>
                    <span className="text-xs text-slate-300">days</span>
                  </div>
                </div>

                {/* Solved */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition-all duration-300"></div>
                  <div className="relative flex items-center gap-2 px-3 py-2 bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-700">
                    <Target className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-bold text-white">{solvedProblems.length}</span>
                    <span className="text-xs text-slate-300">solved</span>
                  </div>
                </div>
              </div>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`relative group transform transition-all duration-300 hover:scale-105 p-3 rounded-xl ${theme === 'dark'
                  ? 'bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700'
                  : 'bg-white/80 hover:bg-slate-100 border border-slate-300'
                  } backdrop-blur-sm`}
                aria-label="Toggle theme"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-all duration-300"></div>
                <div className="relative">
                  {theme === 'dark' ? (
                    <Sun className={`w-5 h-5 ${theme === 'dark' ? 'text-yellow-400' : 'text-orange-500'} transition-all duration-300 group-hover:rotate-180`} />
                  ) : (
                    <Moon className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-slate-700'} transition-all duration-300 group-hover:-rotate-12`} />
                  )}
                </div>
              </button>

              {/* User Profile */}
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="flex items-center gap-3 px-4 py-2.5 bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700/80 rounded-xl cursor-pointer transition-all border border-slate-700 group transform hover:scale-105">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur opacity-60 group-hover:opacity-100 transition-all duration-300"></div>
                    <div className="relative w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center border border-blue-400/30">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="text-white font-bold text-sm">{user?.firstName}</div>
                    <div className="text-xs text-slate-400">{user?.role === 'admin' ? 'Admin' : 'Coder'}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <ul className="mt-2 p-2 shadow-2xl menu menu-sm dropdown-content bg-slate-900/95 backdrop-blur-xl rounded-2xl w-56 border border-slate-700/50">
                  <li className="p-3 border-b border-slate-700/50">
                    <div className="text-sm text-slate-300 font-medium">Signed in as</div>
                    <div className="text-white font-bold truncate">{user?.emailId}</div>
                  </li>
                  {user?.role === 'admin' && (
                    <li>
                      <NavLink to="/admin" className="hover:bg-slate-800/80 text-slate-200 rounded-xl py-3">
                        <Shield className="w-4 h-4" />
                        Admin Panel
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <NavLink to="/profile" className="hover:bg-slate-800/80 text-slate-200 rounded-xl py-3">
                      <User className="w-4 h-4" />
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="hover:bg-red-500/10 text-red-400 rounded-xl py-3">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Welcome Banner */}
        <div className="mb-10 animate-fade-in">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
            <div className={`relative bg-gradient-to-br ${colors.cardBg} backdrop-blur-xl rounded-3xl p-8 border ${colors.border} shadow-2xl ${theme === 'dark' ? 'shadow-blue-500/10' : 'shadow-slate-200'} transition-colors duration-500`}>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h1 className={`text-4xl font-black ${colors.text} mb-3 bg-gradient-to-r ${theme === 'dark' ? 'from-white via-blue-200 to-white' : 'from-slate-900 via-blue-600 to-slate-900'} bg-clip-text text-transparent transition-colors duration-500`}>
                    Welcome back, <span className="text-blue-400">{user?.firstName}!</span>
                  </h1>
                  <p className={`${colors.textMuted} text-lg flex items-center gap-2`}>
                    <Sparkles className="w-5 h-5 text-yellow-400 animate-spin-slow" />
                    Ready to conquer some coding challenges today?
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl">
                    <Award className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-black ${colors.text}">Rank #1,247</div>
                    <div className={`text-sm ${colors.textMuted}`}>Top 5% globally</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Dashboard with Enhanced Animations */}
        <div className="mb-10">
          <h2 className={`text-3xl font-black ${colors.text} mb-8 flex items-center gap-3 animate-slide-in-left transition-colors duration-500`}>
            <BarChart3 className="w-8 h-8 text-blue-400" />
            Your Coding Dashboard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              {
                title: 'Total Problems',
                value: stats.total,
                icon: Target,
                color: 'from-blue-500 to-cyan-500',
                gradient: 'from-blue-500/20 to-cyan-500/20',
                border: 'border-blue-500/30',
                iconColor: 'text-blue-400'
              },
              {
                title: 'Solved Problems',
                value: stats.solved,
                icon: CheckCircle2,
                color: 'from-emerald-500 to-teal-500',
                gradient: 'from-emerald-500/20 to-teal-500/20',
                border: 'border-emerald-500/30',
                iconColor: 'text-emerald-400',
                progress: stats.solvedPercentage
              },
              {
                title: 'Easy',
                value: stats.easy,
                icon: Circle,
                color: 'from-emerald-400 to-green-500',
                gradient: 'from-emerald-500/20 to-green-500/20',
                border: 'border-emerald-500/30',
                iconColor: 'text-emerald-400'
              },
              {
                title: 'Medium',
                value: stats.medium,
                icon: Circle,
                color: 'from-amber-500 to-orange-500',
                gradient: 'from-amber-500/20 to-orange-500/20',
                border: 'border-amber-500/30',
                iconColor: 'text-amber-400'
              },
              {
                title: 'Hard',
                value: stats.hard,
                icon: Circle,
                color: 'from-rose-500 to-pink-500',
                gradient: 'from-rose-500/20 to-pink-500/20',
                border: 'border-rose-500/30',
                iconColor: 'text-rose-400'
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="relative group animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Animated Glow */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500 animate-pulse-slow`}></div>

                <div className={`relative bg-gradient-to-br ${colors.statBg} backdrop-blur-xl rounded-2xl p-5 border-2 ${stat.border} hover:border-opacity-80 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl`}>
                  {/* Icon Section - Large and Prominent */}
                  <div className="flex items-center justify-center mb-3">
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                      {/* Icon Glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-md opacity-50 group-hover:opacity-70 transition-all`}></div>
                      <stat.icon className={`relative w-8 h-8 ${stat.iconColor} drop-shadow-lg`} strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Value - Large and Bold */}
                  <div className="text-center mb-2">
                    <div className={`text-3xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent drop-shadow-lg`}>
                      {stat.value}
                    </div>
                  </div>

                  {/* Title */}
                  <div className={`text-center mb-2`}>
                    <div className={`${colors.text} font-bold text-sm group-hover:text-blue-300 transition-colors`}>
                      {stat.title}
                    </div>
                  </div>

                  {/* Progress Bar for Solved Problems */}
                  {stat.progress && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-400">Progress</span>
                        <span className="text-xs font-bold text-emerald-400">{stat.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000"
                          style={{ width: `${stat.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Bottom Accent Line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-all duration-500`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-10 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
            <div className={`relative bg-gradient-to-br ${colors.cardBg} backdrop-blur-xl rounded-2xl p-8 border ${colors.border} shadow-2xl ${theme === 'dark' ? 'shadow-blue-500/10' : 'shadow-slate-200'} transition-colors duration-500`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl">
                    <Filter className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className={`text-2xl font-bold ${colors.text} transition-colors duration-500`}>Filter Problems</h3>
                </div>
                <div className={`flex items-center gap-2 ${colors.textMuted} text-sm`}>
                  <Sparkles className="w-4 h-4 text-yellow-400 animate-spin-slow" />
                  <span>Refine your challenge search</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { label: 'Status', value: filters.status, options: ['all', 'solved'], display: ['All Problems', 'Solved Only'] },
                  { label: 'Difficulty', value: filters.difficulty, options: ['all', 'easy', 'medium', 'hard'], display: ['All Levels', 'Easy', 'Medium', 'Hard'] },
                  { label: 'Topic', value: filters.tag, options: ['all', 'array', 'linkedList', 'graph', 'dp', 'string', 'tree', 'stack', 'queue', 'heap', 'hash', 'sorting', 'searching', 'greedy', 'backtracking'], display: ['All Topics', 'Array', 'Linked List', 'Graph', 'Dynamic Programming', 'String', 'Tree', 'Stack', 'Queue', 'Heap', 'Hash Table', 'Sorting', 'Searching', 'Greedy', 'Backtracking'] },
                ].map((filter, index) => (
                  <div key={index} className="relative group/filter">
                    <label className={`text-sm font-bold ${colors.textSecondary} mb-3 block flex items-center gap-2 transition-colors duration-500`}>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      {filter.label}
                    </label>
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover/filter:opacity-20 transition-all duration-300"></div>
                      <select
                        className={`relative w-full bg-gradient-to-br ${colors.inputBg} border-2 ${colors.inputBorder} ${colors.text} rounded-xl px-5 py-4 focus:border-blue-500 focus:outline-none focus:ring-3 focus:ring-blue-500/30 transition-all backdrop-blur-sm appearance-none`}
                        value={filter.value}
                        onChange={(e) => setFilters({ ...filters, [filter.label.toLowerCase()]: e.target.value })}
                      >
                        {filter.options.map((opt, i) => (
                          <option key={opt} value={opt} className={theme === 'dark' ? 'bg-slate-900' : 'bg-white'}>
                            {filter.display[i]}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronRight className="w-5 h-5 text-slate-400 rotate-90" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Problems List - Enhanced Layout */}
        <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-white mb-2">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-20 animate-pulse-slow"></div>
                    <div className="relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-3 rounded-xl border border-blue-500/30">
                      <Code2 className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span>Coding Challenges</span>
                      <span className="text-sm text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full">
                        {filteredProblems.length} Problems
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
                      <Target className="w-3 h-3 text-blue-400" />
                      Master your skills with curated problems
                    </p>
                  </div>
                </div>
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-all duration-300"></div>
                <div className="relative flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 group-hover:border-blue-500/50 transition-all duration-300">
                  <Search className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-400">Search problems...</span>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-20 animate-pulse-glow"></div>
                  <div className="relative w-20 h-20 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Loading Challenges</h3>
                  <p className="text-slate-400">Preparing your coding journey...</p>
                </div>
              </div>
            </div>
          ) : filteredProblems.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="relative inline-block">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-lg opacity-20"></div>
                <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl rounded-3xl p-12 border border-slate-800/50">
                  <div className="w-24 h-24 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-700">
                    <Target className="w-12 h-12 text-slate-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">No challenges found</h3>
                  <p className="text-slate-400 mb-6">Try adjusting your filters to discover more problems</p>
                  <button
                    onClick={() => setFilters({ difficulty: 'all', tag: 'all', status: 'all' })}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Problems List */}
              <div className="lg:col-span-2 space-y-4">
                {filteredProblems.map((problem, index) => {
                  const isSolved = solvedProblems.some(sp => sp._id === problem._id);
                  const isFeatured = index < 3;
                  const isPremium = index % 5 === 0;

                  return (
                    <div
                      key={problem._id}
                      className="relative group animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                      onMouseEnter={() => setHoveredProblem(problem._id)}
                      onMouseLeave={() => setHoveredProblem(null)}
                    >
                      {/* Hover Glow Effect */}
                      <div className={`absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-all duration-500 ${isSolved ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                        }`}></div>

                      <div className={`relative bg-gradient-to-br ${colors.cardBg} backdrop-blur-xl rounded-2xl p-6 border ${isSolved ? 'border-emerald-500/20' : colors.border}
                        } ${colors.cardHover} transition-all duration-300 transform group-hover:scale-[1.02]`}>

                        {/* Header with problem number and featured badges */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSolved ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20' : 'bg-slate-800/50'
                              }`}>
                              <span className={`text-lg font-bold ${isSolved ? 'text-emerald-400' : 'text-slate-400'
                                }`}>
                                {index + 1}
                              </span>
                            </div>
                            {isFeatured && (
                              <span className="px-2 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 text-xs font-bold rounded-lg border border-amber-500/30 flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                Featured
                              </span>
                            )}
                            {isPremium && (
                              <span className="px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-400 text-xs font-bold rounded-lg border border-yellow-500/30 flex items-center gap-1">
                                <Crown className="w-3 h-3" />
                                Premium
                              </span>
                            )}
                          </div>

                          {/* Status Badge */}
                          <div className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${isSolved
                            ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800/50 text-slate-400 border border-slate-700'
                            }`}>
                            {isSolved ? '✓ Solved' : 'Not Attempted'}
                          </div>
                        </div>

                        {/* Problem Title and Description */}
                        <div className="mb-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <NavLink
                                to={`/problem/${problem._id}`}
                                className={`text-xl font-bold ${colors.text} hover:text-blue-400 transition-colors flex items-center gap-2 group/title`}
                              >
                                <span className="truncate">{problem.title}</span>
                                {hoveredProblem === problem._id && (
                                  <ArrowRight className="w-4 h-4 text-blue-400 animate-slide-in-left" />
                                )}
                              </NavLink>
                              <p className={`${colors.textMuted} text-sm mt-2 line-clamp-2`}>
                                A comprehensive challenge to test your {problem.tags} skills and algorithmic thinking...
                              </p>
                            </div>
                            {isSolved && (
                              <div className="ml-4 p-2 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 rounded-xl">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400 animate-bounce-subtle" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Tags and Difficulty */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 transform hover:scale-105 ${getDifficultyStyle(problem.difficulty)}`}>
                            {problem.difficulty.toUpperCase()}
                          </span>
                          <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800/50 text-slate-300 border border-slate-700 transition-all duration-300 hover:bg-slate-700/50 hover:border-slate-600 transform hover:scale-105 flex items-center gap-1">
                            <Hash className="w-3 h-3" />
                            {problem.tags}
                          </span>
                          <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800/50 text-slate-300 border border-slate-700 transition-all duration-300 hover:bg-slate-700/50 hover:border-slate-600 transform hover:scale-105 flex items-center gap-1">
                            <ClockIcon className="w-3 h-3" />
                            30 mins
                          </span>
                        </div>

                        {/* Progress Line */}
                        <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transform origin-left transition-all duration-500 ${isSolved ? 'scale-x-100 bg-gradient-to-r from-emerald-500 to-teal-400' : 'scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-blue-500 to-purple-500'
                          }`}></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Sidebar - Enhanced */}
              <div className="space-y-5">
                {/* Quick Actions */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/50">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <NavLink to="/daily-challenge" className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20 rounded-xl border border-orange-500/30 transition-all group/action">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-lg">
                            <Flame className="w-4 h-4 text-orange-400" />
                          </div>
                          <div>
                            <div className="text-white font-bold">Daily Challenge</div>
                            <div className="text-xs text-slate-400">Today's special problem</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover/action:translate-x-1 transition-transform" />
                      </NavLink>

                      <NavLink to="/contests" className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 hover:from-amber-500/20 hover:to-yellow-500/20 rounded-xl border border-amber-500/30 transition-all group/action">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded-lg">
                            <Trophy className="w-4 h-4 text-amber-400" />
                          </div>
                          <div>
                            <div className="text-white font-bold">Upcoming Contests</div>
                            <div className="text-xs text-slate-400">Compete with others</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover/action:translate-x-1 transition-transform" />
                      </NavLink>

                      <button className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 rounded-xl border border-blue-500/30 transition-all group/action">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg">
                            <TrendingUp className="w-4 h-4 text-blue-400" />
                          </div>
                          <div>
                            <div className="text-white font-bold">Track Progress</div>
                            <div className="text-xs text-slate-400">View detailed analytics</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover/action:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recommended Topics */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/50">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-emerald-400" />
                      Recommended Topics
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: 'Arrays', count: 15, color: 'from-blue-500 to-cyan-500' },
                        { name: 'DP', count: 8, color: 'from-purple-500 to-pink-500' },
                        { name: 'Graphs', count: 12, color: 'from-emerald-500 to-teal-500' },
                        { name: 'Trees', count: 10, color: 'from-amber-500 to-orange-500' },
                        { name: 'Strings', count: 7, color: 'from-rose-500 to-pink-500' },
                        { name: 'Sorting', count: 5, color: 'from-indigo-500 to-violet-500' },
                      ].map((topic, idx) => (
                        <div key={idx} className="relative group/topic">
                          <div className={`absolute -inset-0.5 bg-gradient-to-br ${topic.color} rounded-xl blur opacity-0 group-hover/topic:opacity-30 transition-all duration-300`}></div>
                          <div className="relative p-3 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-slate-600 transition-all">
                            <div className="text-white font-bold text-sm mb-1">{topic.name}</div>
                            <div className="text-xs text-slate-400">{topic.count} problems</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats Summary */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/50">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-amber-400" />
                      Your Progress
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-300">Daily Goal</span>
                          <span className="text-sm font-bold text-emerald-400">
                            {solvedProblems.length}/{stats.dailyGoal}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                            style={{ width: `${(solvedProblems.length / stats.dailyGoal) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                          <div className="text-2xl font-bold text-white">{userStreak.currentStreak || 0}</div>
                          <div className="text-xs text-slate-400">Day Streak</div>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                          <div className="text-2xl font-bold text-white">{stats.solvedPercentage}%</div>
                          <div className="text-xs text-slate-400">Completion</div>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-slate-800">
                        <div className="text-sm text-slate-400 mb-2">Weekly Activity</div>
                        <div className="flex items-center justify-between">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                              <div
                                className={`w-2 h-8 rounded-full mb-1 ${idx < userStreak.currentStreak
                                  ? 'bg-gradient-to-t from-emerald-500 to-teal-400'
                                  : 'bg-slate-700'
                                  }`}
                              ></div>
                              <div className="text-xs text-slate-500">{day}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pro Tip */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-lg">
                        <Sparkles className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Pro Tip</h3>
                        <div className="text-xs text-slate-400">Boost your learning</div>
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm mb-4">
                      Try solving at least one problem from each difficulty level daily. This balanced approach helps build a strong foundation while challenging your skills.
                    </p>
                    <button className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 text-sm">
                      Set Daily Reminder
                    </button>
                  </div>
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

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-in-left {
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

        @keyframes width-fill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
          animation-fill-mode: both;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
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

        .animate-width-fill {
          animation: width-fill 1s ease-out forwards;
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

        /* Line clamp for text truncation */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Badge Unlock Popup */}
      {currentBadgePopup && (
        <BadgeUnlockPopup
          badge={currentBadgePopup}
          onClose={async () => {
            try {
              // Mark badge as seen
              await axiosClient.post(`/achievements/seen/${currentBadgePopup.badgeId}`);

              // Remove from unseen list
              const remaining = unseenBadges.filter(b => b.badgeId !== currentBadgePopup.badgeId);
              setUnseenBadges(remaining);

              // Show next badge if any
              if (remaining.length > 0) {
                setTimeout(() => {
                  setCurrentBadgePopup(remaining[0]);
                }, 500);
              } else {
                setCurrentBadgePopup(null);
              }
            } catch (error) {
              console.error('Error marking badge as seen:', error);
              setCurrentBadgePopup(null);
            }
          }}
        />
      )}
    </div>
  );
}

const getDifficultyStyle = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30';
    case 'medium':
      return 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30';
    case 'hard':
      return 'bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-rose-400 border border-rose-500/30';
    default:
      return 'bg-slate-800/50 text-slate-300 border border-slate-700';
  }
};

export default Homepage;