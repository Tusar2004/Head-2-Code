import { useState, useEffect } from 'react';
import { Code2, Mail, Lock, User, RefreshCw, ArrowRight, Shield, Github, Sparkles, Zap, Trophy, Users, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { registerUser } from "../authSlice";

// Signup schema
const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaCode, setCaptchaCode] = useState('');
  const [userCaptchaInput, setUserCaptchaInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaVerified(false);
    setUserCaptchaInput('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

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

  const verifyCaptcha = () => {
    if (userCaptchaInput === captchaCode) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
      alert('Incorrect CAPTCHA. Please try again.');
      generateCaptcha();
    }
  };

  const onSubmit = (data) => {
    if (!captchaVerified) {
      alert('Please verify the CAPTCHA first.');
      return;
    }
    dispatch(registerUser(data));
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
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full animate-float"
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
        {/* Animated Background Orbs - Fixed: Moved further down to avoid logo overlap */}
        <div className="absolute inset-0">
          <div className="absolute top-32 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slower"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slowest"></div>
        </div>

        <div className="relative z-10 space-y-8 animate-fade-in-left">
          {/* Animated GIF */}
          <br></br>
          <br></br>
          <br></br>
          <div className="mb-8 animate-float-slow">
            <img 
              src="https://user-images.githubusercontent.com/74038190/229223263-cf2e4b07-2615-4f87-9c38-e37600f8381a.gif"
              alt="Coding Animation"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl shadow-blue-500/20 border border-blue-500/20"
            />
          </div>

          {/* Hero Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              <Sparkles className="w-8 h-8 text-yellow-400 animate-spin-slow" />
              <span className="text-blue-400 font-bold text-lg uppercase tracking-wider">Join the Elite</span>
            </div>
            
            <h1 className="text-6xl font-black text-white leading-tight animate-slide-in-left bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-white" style={{ animationDelay: '0.3s' }}>
              Master Coding,
              <br />
              <span className="text-blue-400">Shape Your Future</span>
            </h1>
            
            <p className="text-xl text-slate-300 leading-relaxed animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
              Join <span className="text-blue-400 font-bold">50,000+</span> developers conquering algorithms, acing interviews, and building extraordinary careers.
            </p>
          </div>

          {/* Animated Stats Cards */}
          <div className="grid grid-cols-2 gap-4 pt-6">
            {[
              { icon: Zap, title: '2000+ Problems', desc: 'Easy to Expert Level', color: 'from-yellow-500 to-orange-500' },
              { icon: Trophy, title: 'Live Contests', desc: 'Weekly Competitions', color: 'from-purple-500 to-pink-500' },
              { icon: Users, title: 'Interview Prep', desc: 'FAANG Questions', color: 'from-blue-500 to-cyan-500' },
              { icon: Sparkles, title: 'Premium Content', desc: 'Expert Solutions', color: 'from-emerald-500 to-teal-500' }
            ].map((feature, i) => (
              <div 
                key={i}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 animate-fade-in-up cursor-pointer hover:scale-105"
                style={{ animationDelay: `${0.5 + i * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${feature.color})` }}></div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-white font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors">{feature.title}</div>
                <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{feature.desc}</div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Stats */}
          <div className="flex gap-8 pt-8 animate-slide-in-left" style={{ animationDelay: '0.9s' }}>
            {[
              { value: '50K+', label: 'Active Coders', gradient: 'from-blue-400 to-cyan-400' },
              { value: '500+', label: 'Top Companies', gradient: 'from-purple-400 to-pink-400' },
              { value: '95%', label: 'Success Rate', gradient: 'from-emerald-400 to-teal-400' }
            ].map((stat, i) => (
              <div key={i} className="relative group animate-bounce-slow" style={{ animationDelay: `${i * 0.2}s` }}>
                <div className={`text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 font-medium mt-1 group-hover:text-slate-300 transition-colors">{stat.label}</div>
                <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-4 pt-6 animate-fade-in" style={{ animationDelay: '1.1s' }}>
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-slate-900 flex items-center justify-center text-white font-bold text-sm animate-bounce-subtle" style={{ animationDelay: `${i * 0.1}s` }}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="text-slate-300 text-sm">
              <span className="font-bold text-white">1000+</span> developers joined this week
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="w-full max-w-md animate-fade-in-right">
          {/* Mobile Logo - Fixed positioning */}
          <div className="lg:hidden flex items-center justify-center mb-8 animate-slide-down">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-blue-500 p-3 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-lg shadow-blue-500/50">
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
                <h2 className="text-4xl font-black text-white mb-2 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">Create Account</h2>
                <p className="text-slate-400 font-medium">Start your coding journey today</p>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3 mb-6">
                <button className="w-full bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-4 rounded-xl transition-all hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-3 group border border-gray-200 animate-slide-in" style={{ animationDelay: '0.1s' }}>
                  <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Continue with GitHub</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </button>

                <button className="w-full bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-4 rounded-xl transition-all hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-3 group border border-gray-200 animate-slide-in" style={{ animationDelay: '0.2s' }}>
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

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* First Name */}
                <div className="animate-slide-in" style={{ animationDelay: '0.4s' }}>
                  <label className="block text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-400" />
                    First Name
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      className={`relative w-full px-4 py-4 bg-slate-800/50 backdrop-blur-sm border ${
                        errors.firstName ? 'border-rose-500/50' : 'border-slate-700'
                      } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 font-medium`}
                      {...register('firstName')}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-rose-400 text-sm mt-2 flex items-center gap-1">
                      <span className="w-4 h-4">⚠️</span>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="animate-slide-in" style={{ animationDelay: '0.5s' }}>
                  <label className="block text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-400" />
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      className={`relative w-full px-4 py-4 bg-slate-800/50 backdrop-blur-sm border ${
                        errors.emailId ? 'border-rose-500/50' : 'border-slate-700'
                      } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 font-medium`}
                      {...register('emailId')}
                    />
                  </div>
                  {errors.emailId && (
                    <p className="text-rose-400 text-sm mt-2 flex items-center gap-1">
                      <span className="w-4 h-4">⚠️</span>
                      {errors.emailId.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="animate-slide-in" style={{ animationDelay: '0.6s' }}>
                  <label className="block text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-blue-400" />
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className={`relative w-full px-4 py-4 pr-12 bg-slate-800/50 backdrop-blur-sm border ${
                        errors.password ? 'border-rose-500/50' : 'border-slate-700'
                      } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 font-medium`}
                      {...register('password')}
                    />
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
                    <p className="text-rose-400 text-sm mt-2 flex items-center gap-1">
                      <span className="w-4 h-4">⚠️</span>
                      {errors.password.message}
                    </p>
                  )}
                  <div className="flex gap-1 mt-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500 w-0 animate-width-fill" style={{ animationDelay: `${i * 0.1}s` }}></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced CAPTCHA Section */}
                <div className="animate-slide-in" style={{ animationDelay: '0.7s' }}>
                  <label className="block text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    Security Verification
                  </label>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400 font-medium">Verify you're human</span>
                      <span className="text-xs text-blue-400 font-semibold">Required</span>
                    </div>
                    
                    {/* Enhanced CAPTCHA Display Card */}
                    <div className="relative group mb-4">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
                      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 rounded-xl px-6 py-6 flex items-center justify-between overflow-hidden">
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute inset-0 bg-grid-pattern-captcha"></div>
                        </div>
                        
                        {/* Left side - Icon and Text */}
                        <div className="flex items-center gap-4 z-10">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg blur-lg opacity-60"></div>
                            <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-lg">
                              <Shield className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-400 font-medium">Enter the code below:</div>
                            <div className="text-3xl font-black tracking-widest text-white select-none font-mono bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                              {captchaCode}
                            </div>
                          </div>
                        </div>
                        
                        {/* Right side - Refresh Button */}
                        <button
                          type="button"
                          onClick={generateCaptcha}
                          className="relative group/refresh z-10"
                          title="Generate new code"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover/refresh:opacity-30 transition-all duration-300"></div>
                          <div className="relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-slate-600 hover:border-blue-500/50 rounded-lg p-3.5 transition-all duration-300 group-hover/refresh:scale-110 group-hover/refresh:rotate-12">
                            <RefreshCw className="w-5 h-5 text-blue-400 group-hover/refresh:text-purple-400 group-hover/refresh:rotate-180 transition-all duration-500" />
                          </div>
                        </button>
                      </div>
                    </div>
                    
                    {/* Enhanced Input Section */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          placeholder="Type the code exactly as shown"
                          value={userCaptchaInput}
                          onChange={(e) => setUserCaptchaInput(e.target.value)}
                          className="flex-1 px-4 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                        />
                        <button
                          type="button"
                          onClick={verifyCaptcha}
                          disabled={!userCaptchaInput}
                          className="relative group/verify"
                        >
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover/verify:opacity-30 transition-all duration-300"></div>
                          <div className={`relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl transition-all disabled:cursor-not-allowed group-hover/verify:scale-105 shadow-lg disabled:shadow-none shadow-emerald-500/30 flex items-center gap-2`}>
                            <span>Verify</span>
                            {!userCaptchaInput && (
                              <ArrowRight className="w-4 h-4 opacity-50" />
                            )}
                            {userCaptchaInput && (
                              <ArrowRight className="w-4 h-4 opacity-100 group-hover/verify:translate-x-1 transition-transform" />
                            )}
                          </div>
                        </button>
                      </div>
                      
                      {/* Verification Status */}
                      {captchaVerified && (
                        <div className="flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 rounded-xl animate-slide-down">
                          <div className="relative">
                            <div className="absolute inset-0 bg-emerald-500 rounded-full blur opacity-60"></div>
                            <CheckCircle className="relative w-5 h-5 text-emerald-400" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-emerald-400 text-sm">Successfully verified!</div>
                            <div className="text-xs text-emerald-300/70">You've proven you're human</div>
                          </div>
                          <Sparkles className="w-4 h-4 text-emerald-300 animate-spin-slow" />
                        </div>
                      )}
                      
                      {/* CAPTCHA Instructions */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Case-sensitive • No spaces • 6 characters</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={authLoading || !captchaVerified}
                  className="w-full relative group mt-8 animate-slide-in"
                  style={{ animationDelay: '0.8s' }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-all duration-500 animate-pulse-glow"></div>
                  <div className={`relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black py-5 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/30 ${
                    authLoading || !captchaVerified ? 'opacity-50 cursor-not-allowed' : 'group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-blue-500/40'
                  }`}>
                    {authLoading ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Creating Your Account...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <span>Create Account</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </span>
                    )}
                  </div>
                </button>
              </form>

              {/* Login Link - FIXED: Changed from <a> to <NavLink> */}
              <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.9s' }}>
                <span className="text-slate-400">
                  Already have an account?{' '}
                  <NavLink to="/login" className="text-blue-400 hover:text-blue-300 font-bold transition-colors relative group">
                    Sign in
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </NavLink>
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 space-y-3 animate-fade-in" style={{ animationDelay: '1s' }}>
            <p className="text-slate-400 text-sm">
              By signing up, you agree to our{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold hover:underline">Privacy Policy</a>
            </p>
            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs bg-slate-800/30 backdrop-blur-sm rounded-full px-4 py-2.5 border border-slate-700/50">
              <svg className="w-4 h-4 text-emerald-500 animate-pulse-slow" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Your data is encrypted and secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Logo - Always Visible */}
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

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.02);
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

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
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

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
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

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
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

        .bg-grid-pattern-captcha {
          background-image: 
            linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
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

export default Signup;