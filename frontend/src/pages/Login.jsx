import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router'; 
import { loginUser } from "../authSlice";
import { useEffect, useState } from 'react';
import { Code2, Mail, Lock, ArrowRight, Github, TrendingUp, Award, Zap, Shield, Sparkles, Users, Target, CheckCircle, Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak") 
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
          transition: 'background-image 0.3s ease'
        }}></div>
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              opacity: 0.3
            }}
          ></div>
        ))}
      </div>

      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-slower"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slowest"></div>
        </div>

        <div className="relative z-10 space-y-8 animate-fade-in-left">
          {/* Logo */}
          {/* <NavLink to="/" className="flex items-center gap-3 group mb-12 animate-slide-down">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 p-3 rounded-lg group-hover:scale-110 transition-all duration-500 shadow-lg shadow-blue-500/50">
                <span className="text-3xl font-black text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>H₂C</span>
              </div>
            </div>
            <div>
              <span className="text-3xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">Head-2-Code</span>
              <div className="text-sm text-slate-400 font-medium">Master Your Coding Skills</div>
            </div>
          </NavLink> */}

          {/* Hero Content */}
          <br></br>
          <br></br>
          <br></br>
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-full animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-300 text-sm font-semibold">Welcome Back, Coder! 👋</span>
              <Sparkles className="w-4 h-4 text-yellow-400 animate-spin-slow" />
            </div>

            <h1 className="text-6xl font-black text-white leading-tight animate-slide-in-left bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-white" style={{ animationDelay: '0.3s' }}>
              Continue Your
              <br />
              <span className="text-blue-400">Coding Journey</span>
            </h1>
            
            <p className="text-xl text-slate-300 leading-relaxed animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
              Pick up where you left off and level up your skills with our curated learning path.
            </p>
          </div>

          {/* Enhanced Progress Card */}
          <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
            
            <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/10">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <span className="bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">Your Learning Progress</span>
              </h3>
              
              <div className="space-y-6">
                {/* Progress Item 1 */}
                <div className="flex items-center justify-between group/item">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg blur opacity-20"></div>
                      <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-all duration-300">
                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                      </div>
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg group-hover/item:text-emerald-300 transition-colors">Problems Solved</div>
                      <div className="text-slate-400 text-sm">Consistency is key! 🚀</div>
                    </div>
                  </div>
                  <div className="text-3xl font-black text-emerald-400 group-hover/item:scale-110 transition-transform duration-300">247</div>
                </div>

                {/* Progress Item 2 */}
                <div className="flex items-center justify-between group/item">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg blur opacity-20"></div>
                      <div className="relative w-12 h-12 bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-all duration-300">
                        <Zap className="w-6 h-6 text-amber-400" />
                      </div>
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg group-hover/item:text-amber-300 transition-colors">Current Streak</div>
                      <div className="text-slate-400 text-sm">Don't break the chain! 🔥</div>
                    </div>
                  </div>
                  <div className="text-3xl font-black text-amber-400 group-hover/item:scale-110 transition-transform duration-300 flex items-center gap-1">
                    12 <span className="text-2xl animate-bounce-subtle">🔥</span>
                  </div>
                </div>

                {/* Progress Item 3 */}
                <div className="flex items-center justify-between group/item">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg blur opacity-20"></div>
                      <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-all duration-300">
                        <Award className="w-6 h-6 text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg group-hover/item:text-blue-300 transition-colors">Global Rank</div>
                      <div className="text-slate-400 text-sm">Top 5% worldwide 🌍</div>
                    </div>
                  </div>
                  <div className="text-3xl font-black text-blue-400 group-hover/item:scale-110 transition-transform duration-300">#1,247</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-slate-300 font-medium">Weekly Goal Progress</span>
                  </div>
                  <span className="text-sm text-blue-400 font-bold bg-blue-500/10 px-3 py-1 rounded-full">8/10 problems</span>
                </div>
                <div className="w-full bg-slate-800/50 backdrop-blur-sm rounded-full h-2.5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 rounded-full transition-all duration-1000 animate-width-fill" style={{ width: '80%' }}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Stats with Animation */}
          <div className="flex gap-6 pt-6">
            {[
              { 
                value: '247', 
                label: 'Solved', 
                gradient: 'from-emerald-400 to-emerald-300',
                icon: CheckCircle 
              },
              { 
                value: '12', 
                label: 'Day Streak', 
                gradient: 'from-amber-400 to-amber-300',
                icon: Zap 
              },
              { 
                value: 'Top 5%', 
                label: 'Global Rank', 
                gradient: 'from-blue-400 to-cyan-300',
                icon: Users 
              }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="relative group animate-fade-in-up hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${0.6 + i * 0.15}s` }}
              >
                {/* Hover Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-20 rounded-xl blur transition-all duration-500" style={{ background: `linear-gradient(135deg, ${stat.gradient})` }}></div>
                
                <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-slate-800/50 rounded-xl p-5 group-hover:border-slate-700/70 transition-all duration-300">
                  <div className={`text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400 flex items-center gap-2">
                    <stat.icon className="w-4 h-4" />
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Community Stats */}
          <div className="flex items-center gap-4 pt-6 animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="flex -space-x-3">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-slate-900 flex items-center justify-center text-white font-bold text-sm animate-bounce-subtle"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="text-slate-300 text-sm">
              <span className="font-bold text-white">500+</span> coders active right now
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="w-full max-w-md animate-fade-in-right">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8 animate-slide-down">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 p-3 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-lg shadow-blue-500/50">
                  <span className="text-3xl font-black text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>H₂C</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card with Glass Effect */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition-all duration-500 animate-pulse-glow"></div>
            
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl hover:border-blue-500/30 transition-all duration-500">
              {/* Header with Icon */}
              <div className="text-center mb-8 animate-slide-down">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 animate-bounce-subtle shadow-lg shadow-blue-500/50">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-black text-white mb-2 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">Welcome Back</h2>
                <p className="text-slate-400 font-medium">Sign in to continue your journey</p>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3 mb-6">
                <button className="w-full bg-white/90 hover:bg-white text-gray-900 font-bold py-4 px-4 rounded-xl transition-all hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-3 group border border-gray-200 animate-slide-in" style={{ animationDelay: '0.1s' }}>
                  <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Continue with GitHub</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </button>

                <button className="w-full bg-white/90 hover:bg-white text-gray-900 font-bold py-4 px-4 rounded-xl transition-all hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-3 group border border-gray-200 animate-slide-in" style={{ animationDelay: '0.2s' }}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Continue with Google</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </button>
              </div>

              {/* Divider with Animation */}
              <div className="relative my-6 animate-slide-in" style={{ animationDelay: '0.3s' }}>
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-slate-900 text-slate-400 text-sm font-medium">or continue with email</span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-gradient-to-r from-rose-500/10 to-rose-600/10 backdrop-blur-sm border border-rose-500/30 rounded-xl animate-slide-down">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-rose-500/20 border border-rose-500/30 rounded-lg">
                      <svg className="w-5 h-5 text-rose-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-rose-400 font-semibold">Authentication Failed</div>
                      <div className="text-rose-300/70 text-sm mt-1">{error}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-5">
                {/* Email */}
                <div className="animate-slide-in" style={{ animationDelay: '0.4s' }}>
                  <label className="block text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-400" />
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className={`relative w-full px-4 py-4 pl-12 bg-slate-800/50 backdrop-blur-sm border ${
                        errors.emailId ? 'border-rose-500/50' : 'border-slate-700'
                      } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 font-medium`}
                      {...register('emailId')}
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                  {errors.emailId && (
                    <div className="flex items-center gap-2 mt-2 text-rose-400 text-sm animate-fade-in">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {errors.emailId.message}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="animate-slide-in" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold text-slate-300 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-blue-400" />
                      Password
                    </label>
                    <a href="#" className="text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors group">
                      Forgot password?
                      <span className="block w-0 group-hover:w-full h-0.5 bg-blue-400 transition-all duration-300"></span>
                    </a>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`relative w-full px-4 py-4 pl-12 pr-12 bg-slate-800/50 backdrop-blur-sm border ${
                        errors.password ? 'border-rose-500/50' : 'border-slate-700'
                      } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 font-medium`}
                      {...register('password')}
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="flex items-center gap-2 mt-2 text-rose-400 text-sm animate-fade-in">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {errors.password.message}
                    </div>
                  )}
                  
                  {/* Password Strength */}
                  <div className="flex gap-1 mt-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-300 w-full animate-width-fill" style={{ animationDelay: `${i * 0.1}s` }}></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading}
                  className="w-full relative group mt-8 animate-slide-in"
                  style={{ animationDelay: '0.6s' }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-all duration-500 animate-pulse-glow"></div>
                  <div className={`relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black py-5 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/30 ${
                    loading ? 'opacity-50 cursor-not-allowed' : 'group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-blue-500/40'
                  }`}>
                    {loading ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Signing In...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <span>Sign In</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </span>
                    )}
                  </div>
                </button>
              </div>

              {/* Signup Link */}
              <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
                <span className="text-slate-400">
                  Don't have an account?{' '}
                  <NavLink to="/signup" className="text-blue-400 hover:text-blue-300 font-bold transition-colors relative group">
                    Sign up for free
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </NavLink>
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 space-y-3 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-slate-400 text-sm">
              Protected by reCAPTCHA and subject to our{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold hover:underline">Privacy Policy</a>
            </p>
            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs bg-slate-800/30 backdrop-blur-sm rounded-full px-4 py-2.5 border border-slate-700/50">
              <Shield className="w-4 h-4 text-emerald-500 animate-pulse-slow" />
              <span className="font-medium">End-to-end encrypted • 100% secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Logo */}
      <div className="absolute top-6 left-6 z-50 animate-slide-down">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500 animate-pulse-glow"></div>
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 p-4 rounded-xl group-hover:scale-110 transition-all duration-500 shadow-2xl shadow-blue-500/50 border border-blue-400/20">
              <span className="text-4xl font-black text-white drop-shadow-lg" style={{ 
                fontFamily: 'Inter, system-ui, sans-serif',
                textShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
              }}>H₂C</span>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="text-2xl font-black text-white tracking-tight group-hover:text-blue-300 transition-colors">Head-2-Code</div>
            <div className="text-xs text-blue-400 font-bold uppercase tracking-widest">Master Coding Skills</div>
          </div>
        </NavLink>
      </div>

      <style>{`
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

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

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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

        @keyframes float {
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

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
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

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
          animation-fill-mode: both;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
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
          animation: width-fill 0.8s ease-out forwards;
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
}

export default Login;