import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { loginUser } from "../authSlice";
import { useEffect, useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Unlock, ShieldCheck, Github } from 'lucide-react';

const loginSchema = z.object({
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak")
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [lockState, setLockState] = useState('locked'); // 'locked', 'unlocking', 'unlocked', 'shaking'
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
      setLockState('unlocking');
      setTimeout(() => {
        setLockState('unlocked');
        setTimeout(() => navigate('/'), 1500);
      }, 800);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      setLockState('shaking');
      setTimeout(() => setLockState('locked'), 600);
    }
  }, [error]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex relative overflow-hidden">
      {/* Wave Animation Background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path className="wave-path-1" fill="url(#wave-gradient)" d="M0,160 C320,300,420,300,740,160 L740,00 L0,0 Z" />
          <path className="wave-path-2" fill="url(#wave-gradient)" d="M0,200 C240,340,520,340,740,200 L740,00 L0,0 Z" opacity="0.5" />
          <path className="wave-path-3" fill="url(#wave-gradient)" d="M0,240 C180,380,560,380,740,240 L740,00 L0,0 Z" opacity="0.3" />
        </svg>
      </div>

      {/* Left Side - Animated Lock */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="relative z-10 flex flex-col items-center animate-fade-in">
          {/* Lock Animation Container */}
          <div className={`relative transition-all duration-800 ${lockState === 'shaking' ? 'animate-shake' :
            lockState === 'unlocking' ? 'animate-unlock' :
              lockState === 'unlocked' ? 'opacity-100' : ''
            }`}>
            {/* Glow Effect */}
            <div className={`absolute -inset-12 rounded-full blur-3xl transition-all duration-1000 ${lockState === 'unlocked' ? 'bg-emerald-500/60 scale-150 animate-pulse' :
              lockState === 'shaking' ? 'bg-rose-500/50 animate-pulse' :
                'bg-blue-500/40'
              }`}></div>

            {/* Lock Icon with Keyhole */}
            <div className="relative">
              {lockState === 'unlocked' ? (
                <div className="animate-scale-in">
                  {/* Unlocked State */}
                  <div className="relative">
                    <Unlock className="w-80 h-80 text-emerald-400 drop-shadow-2xl" strokeWidth={1.5} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-emerald-400/40 rounded-full blur-2xl animate-pulse"></div>
                        <ShieldCheck className="relative w-40 h-40 text-emerald-300 animate-bounce" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  {/* Locked State with Keyhole */}
                  <Lock className="w-80 h-80 text-blue-400 drop-shadow-2xl" strokeWidth={1.5} />
                  {/* Keyhole */}
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
                    <div className="relative">
                      {/* Keyhole Circle */}
                      <div className="w-12 h-12 bg-slate-900 rounded-full border-4 border-blue-300"></div>
                      {/* Keyhole Slot */}
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-4 h-8 bg-slate-900 border-l-4 border-r-4 border-blue-300"></div>
                      {/* Keyhole Glow */}
                      <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-xl animate-pulse-slow"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Lock Status Text */}
            <div className="text-center mt-12">
              <h2 className={`text-4xl font-black mb-3 transition-all duration-500 ${lockState === 'unlocked' ? 'text-emerald-400 animate-bounce' :
                lockState === 'shaking' ? 'text-rose-400' :
                  'text-blue-400'
                }`}>
                {lockState === 'unlocked' ? '🎉 Access Granted!' :
                  lockState === 'shaking' ? '❌ Access Denied' :
                    lockState === 'unlocking' ? '🔓 Unlocking...' :
                      '🔒 Secure Login'}
              </h2>
              <p className="text-slate-300 text-xl font-medium">
                {lockState === 'unlocked' ? 'Welcome back, Developer!' :
                  lockState === 'shaking' ? 'Invalid credentials, try again' :
                    'Enter your credentials to unlock'}
              </p>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-16 flex items-center gap-3 px-8 py-4 bg-slate-900/60 backdrop-blur-xl rounded-full border-2 border-slate-700/50 shadow-xl">
            <ShieldCheck className="w-6 h-6 text-emerald-400 animate-pulse-slow" strokeWidth={2.5} />
            <span className="text-slate-200 font-bold text-lg">256-bit Encryption</span>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
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
                <div className="text-xs text-blue-400 font-bold">SECURE LOGIN</div>
              </div>
            </NavLink>
          </div>

          {/* Form Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition-all duration-500"></div>

            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-4xl font-black text-white mb-2">Welcome Back</h2>
                <p className="text-slate-400">Sign in to continue</p>
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
                <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl animate-shake">
                  <div className="flex items-center gap-3 text-rose-400">
                    <Lock className="w-5 h-5" />
                    <span className="font-bold">{error}</span>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className={`w-full px-4 py-4 pl-12 bg-slate-800/50 border ${errors.emailId ? 'border-rose-500/50' : 'border-slate-700'
                        } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                      {...register('emailId')}
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
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
                      className={`w-full px-4 py-4 pl-12 pr-12 bg-slate-800/50 border ${errors.password ? 'border-rose-500/50' : 'border-slate-700'
                        } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                      {...register('password')}
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative group mt-8"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-all duration-500"></div>
                  <div className={`relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black py-5 px-6 rounded-xl transition-all shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'group-hover:scale-[1.02]'
                    }`}>
                    {loading ? (
                      <span className="flex items-center justify-center gap-3">
                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing In...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Sign In
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </span>
                    )}
                  </div>
                </button>
              </form>

              {/* Signup Link */}
              <div className="text-center mt-8">
                <span className="text-slate-400">
                  Don't have an account?{' '}
                  <NavLink to="/signup" className="text-blue-400 hover:text-blue-300 font-bold transition-colors">
                    Sign up
                  </NavLink>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px) rotate(-2deg); }
          75% { transform: translateX(10px) rotate(2deg); }
        }
        @keyframes unlock {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(-15deg) translateY(-10px); }
          100% { transform: rotate(0deg) translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-shake { animation: shake 0.6s ease-in-out; }
        .animate-unlock { animation: unlock 0.8s ease-out; }
        .animate-scale-in { animation: scale-in 0.8s ease-out; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-fade-in-right { animation: fade-in-right 0.8s ease-out; }
        .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        
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

export default Login;