import { useState, useEffect } from 'react';
import { Mail, Lock, User, ArrowRight, Shield, Eye, EyeOff, CheckCircle, RefreshCw, Github } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { registerUser } from "../authSlice";

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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
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

  const verifyCaptcha = () => {
    if (userCaptchaInput.toUpperCase() === captchaCode) {
      setCaptchaVerified(true);
    } else {
      alert('Incorrect CAPTCHA. Please try again.');
      generateCaptcha();
      setUserCaptchaInput('');
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
      {/* Wave Animation Background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wave-gradient-signup" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path className="wave-path-1" fill="url(#wave-gradient-signup)" d="M0,160 C320,300,420,300,740,160 L740,00 L0,0 Z" />
          <path className="wave-path-2" fill="url(#wave-gradient-signup)" d="M0,200 C240,340,520,340,740,200 L740,00 L0,0 Z" opacity="0.5" />
          <path className="wave-path-3" fill="url(#wave-gradient-signup)" d="M0,240 C180,380,560,380,740,240 L740,00 L0,0 Z" opacity="0.3" />
        </svg>
      </div>

      {/* Left Side - Tagline */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="relative z-10 flex flex-col items-center animate-fade-in text-center">
          {/* Main Tagline */}
          <div className="mb-12">
            <h1 className="text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient" style={{ fontFamily: "'Orbitron', 'Inter', sans-serif" }}>
                Stop Being A
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400 bg-clip-text text-transparent animate-gradient-reverse" style={{ fontFamily: "'Orbitron', 'Inter', sans-serif" }}>
                Code Thief
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient" style={{ fontFamily: "'Orbitron', 'Inter', sans-serif" }}>
                Start Being an OG⚡
              </span>

            </h1>
            <p className="text-slate-300 text-2xl font-bold">
              Master coding the right way 🚀
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="flex gap-4">
            {['💻', '🔥', '⚡', '🎯'].map((emoji, i) => (
              <div
                key={i}
                className="w-20 h-20 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-4xl border border-slate-700/50 animate-bounce-slow"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {emoji}
              </div>
            ))}
          </div>

          {/* Security Badge */}
          <div className="mt-16 flex items-center gap-3 px-8 py-4 bg-slate-900/60 backdrop-blur-xl rounded-full border-2 border-slate-700/50 shadow-xl">
            <Shield className="w-6 h-6 text-emerald-400 animate-pulse-slow" strokeWidth={2.5} />
            <span className="text-slate-200 font-bold text-lg">Secure Registration</span>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="w-full max-w-md animate-fade-in-right">
          {/* Logo */}
          <div className="text-center mb-8">
            <NavLink to="/" className="inline-flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 p-4 rounded-xl group-hover:scale-110 transition-all duration-500 shadow-2xl">
                  <span className="text-4xl font-black text-white">H₂C</span>
                </div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">Head-2-Code</div>
                <div className="text-xs text-blue-400 font-bold">CREATE ACCOUNT</div>
              </div>
            </NavLink>
          </div>

          {/* Form Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition-all duration-500"></div>

            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-4xl font-black text-white mb-2">Join Us</h2>
                <p className="text-slate-400">Start your coding journey</p>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3 mb-6">
                <button className="w-full bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-4 rounded-xl transition-all hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-3 group border border-gray-200">
                  <Github className="w-5 h-5" />
                  <span>Continue with GitHub</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>

                <button className="w-full bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-4 rounded-xl transition-all hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-3 group border border-gray-200">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span>Continue with Google</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-slate-900 text-slate-400 text-sm font-medium">or continue with email</span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                  <p className="text-rose-400 font-bold">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className={`w-full px-4 py-4 bg-slate-800/50 border ${errors.firstName ? 'border-rose-500/50' : 'border-slate-700'
                      } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                    {...register('firstName')}
                  />
                  {errors.firstName && (
                    <p className="mt-2 text-rose-400 text-sm">{errors.firstName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className={`w-full px-4 py-4 bg-slate-800/50 border ${errors.emailId ? 'border-rose-500/50' : 'border-slate-700'
                      } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                    {...register('emailId')}
                  />
                  {errors.emailId && (
                    <p className="mt-2 text-rose-400 text-sm">{errors.emailId.message}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`w-full px-4 py-4 pr-12 bg-slate-800/50 border ${errors.password ? 'border-rose-500/50' : 'border-slate-700'
                        } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                      {...register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-all"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-rose-400 text-sm">{errors.password.message}</p>
                  )}
                </div>

                {/* Simple Captcha */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold text-slate-300">Verification</label>
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="text-blue-400 hover:text-blue-300 text-sm font-bold flex items-center gap-1"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Refresh
                    </button>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 mb-3">
                    <div className="text-center mb-3">
                      <div className="text-3xl font-black tracking-widest text-white select-none font-mono bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {captchaCode}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code above"
                        value={userCaptchaInput}
                        onChange={(e) => setUserCaptchaInput(e.target.value.toUpperCase())}
                        className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all font-mono"
                      />
                      <button
                        type="button"
                        onClick={verifyCaptcha}
                        disabled={!userCaptchaInput || captchaVerified}
                        className={`px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 text-white font-bold rounded-lg transition-all disabled:cursor-not-allowed`}
                      >
                        Verify
                      </button>
                    </div>
                  </div>

                  {captchaVerified && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 text-sm font-bold">Verified!</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !captchaVerified}
                  className="w-full relative group mt-8"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-all duration-500"></div>
                  <div className={`relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black py-5 px-6 rounded-xl transition-all shadow-lg ${loading || !captchaVerified ? 'opacity-50 cursor-not-allowed' : 'group-hover:scale-[1.02]'
                    }`}>
                    {loading ? (
                      <span className="flex items-center justify-center gap-3">
                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating Account...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Create Account
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </span>
                    )}
                  </div>
                </button>
              </form>

              {/* Login Link */}
              <div className="text-center mt-8">
                <span className="text-slate-400">
                  Already have an account?{' '}
                  <NavLink to="/login" className="text-blue-400 hover:text-blue-300 font-bold transition-colors">
                    Sign in
                  </NavLink>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes gradient-reverse {
          0%, 100% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-fade-in-right { animation: fade-in-right 0.8s ease-out; }
        .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-gradient { 
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-gradient-reverse { 
          background-size: 200% 200%;
          animation: gradient-reverse 3s ease infinite;
        }
        
        .wave-path-1 { animation: wave 8s ease-in-out infinite; }
        .wave-path-2 { animation: wave 10s ease-in-out infinite reverse; }
        .wave-path-3 { animation: wave 12s ease-in-out infinite; }
        
        @keyframes wave {
          0%, 100% { d: path("M0,160 C320,300,420,300,740,160 L740,00 L0,0 Z"); }
          50% { d: path("M0,200 C320,100,420,100,740,200 L740,00 L0,0 Z"); }
        }
      `}</style>
    </div>
  );
}

export default Signup;