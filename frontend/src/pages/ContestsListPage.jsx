import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axiosClient from '../utils/axiosClient';
import { Calendar, Clock, Users, Trophy, ArrowRight, AlertCircle, Sparkles, Target, Flame, Crown } from 'lucide-react';
import { useSelector } from 'react-redux';

function ContestsListPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get('/contest');
      if (data.success) {
        setContests(data.contests);
      }
    } catch (err) {
      setError('Failed to fetch contests');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'upcoming':
        return { bg: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/50', text: 'text-blue-400', label: 'Upcoming' };
      case 'active':
        return { bg: 'bg-gradient-to-r from-emerald-500/20 to-green-500/20', border: 'border-emerald-500/50', text: 'text-emerald-400', label: 'Live Now' };
      case 'ended':
        return { bg: 'bg-gradient-to-r from-slate-500/20 to-gray-500/20', border: 'border-slate-500/50', text: 'text-slate-400', label: 'Ended' };
      default:
        return { bg: 'bg-gradient-to-r from-slate-500/20 to-gray-500/20', border: 'border-slate-500/50', text: 'text-slate-400', label: 'Unknown' };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getContestStatus = (contest) => {
    const now = new Date();
    const startTime = new Date(contest.startTime);
    const endTime = new Date(contest.endTime);

    if (now < startTime) return 'upcoming';
    if (now > endTime) return 'ended';
    return 'active';
  };

  const isParticipant = (contest) => {
    if (!user) return false;
    return contest.participants?.some(p => p.userId?._id === user._id || p.userId === user._id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-2xl font-bold text-white">Loading Contests...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse-slower"></div>
      </div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-5xl font-black text-white mb-2 flex items-center gap-3">
              <div className="relative">
                <Trophy className="w-12 h-12 text-amber-400" strokeWidth={2.5} />
                <div className="absolute inset-0 bg-amber-400/30 blur-xl animate-pulse"></div>
              </div>
              Coding Contests
            </h1>
            <p className="text-slate-400 text-lg">Compete, Code, Conquer</p>
          </div>
          {user?.role === 'admin' && (
            <button
              onClick={() => navigate('/admin/contests')}
              className="relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/30 hover:scale-105 group"
            >
              <Crown className="w-5 h-5 inline mr-2 group-hover:rotate-12 transition-transform" />
              Manage Contests
            </button>
          )}
        </div>

        {error && (
          <div className="relative group mb-6 animate-shake">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-red-500 rounded-2xl blur opacity-40"></div>
            <div className="relative bg-gradient-to-br from-rose-900/80 to-red-900/80 backdrop-blur-xl rounded-2xl p-4 border border-rose-500/50 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-rose-400" strokeWidth={2.5} />
              <span className="text-white font-bold">{error}</span>
              <button onClick={() => setError('')} className="ml-auto px-4 py-2 bg-rose-700 hover:bg-rose-600 rounded-lg text-white font-bold transition-all">
                Close
              </button>
            </div>
          </div>
        )}

        {contests.length === 0 ? (
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-20"></div>
            <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl rounded-3xl p-12 border border-slate-800/50 text-center">
              <Target className="w-20 h-20 mx-auto mb-4 text-slate-600 animate-pulse" />
              <p className="text-2xl font-bold text-white">No contests available</p>
              <p className="text-slate-400 mt-2">Check back later for exciting competitions!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {contests.map((contest, index) => {
              const status = getContestStatus(contest);
              const statusBadge = getStatusBadge(status);
              const participated = isParticipant(contest);

              return (
                <div key={contest._id} className="relative group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Glow Effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${status === 'active' ? 'from-emerald-500 to-green-500' : status === 'upcoming' ? 'from-blue-500 to-cyan-500' : 'from-slate-500 to-gray-500'} rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500`}></div>

                  <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl rounded-3xl p-8 border-2 border-slate-800/50 hover:border-slate-700/80 transition-all duration-300 shadow-2xl">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h2 className="text-3xl font-black text-white">{contest.title}</h2>
                          <span className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 ${statusBadge.bg} ${statusBadge.border} ${statusBadge.text} backdrop-blur-sm flex items-center gap-2`}>
                            {status === 'active' && <Flame className="w-4 h-4 animate-pulse" />}
                            {statusBadge.label}
                          </span>
                          {participated && (
                            <span className="px-4 py-1.5 rounded-full text-sm font-bold border-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-purple-400 backdrop-blur-sm flex items-center gap-2">
                              <Sparkles className="w-4 h-4" />
                              Joined
                            </span>
                          )}
                        </div>
                        <p className="text-slate-300 text-lg">{contest.description}</p>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="relative group/stat">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-0 group-hover/stat:opacity-20 transition-all duration-500"></div>
                        <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 hover:border-blue-500/50 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl">
                              <Calendar className="w-6 h-6 text-blue-400" strokeWidth={2.5} />
                            </div>
                            <div>
                              <p className="text-sm text-slate-400 font-medium">Start Time</p>
                              <p className="font-bold text-white">{formatDate(contest.startTime)}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative group/stat">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl blur opacity-0 group-hover/stat:opacity-20 transition-all duration-500"></div>
                        <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 hover:border-amber-500/50 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-xl">
                              <Clock className="w-6 h-6 text-amber-400" strokeWidth={2.5} />
                            </div>
                            <div>
                              <p className="text-sm text-slate-400 font-medium">Duration</p>
                              <p className="font-bold text-white">{contest.duration} minutes</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative group/stat">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover/stat:opacity-20 transition-all duration-500"></div>
                        <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 hover:border-purple-500/50 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl">
                              <Users className="w-6 h-6 text-purple-400" strokeWidth={2.5} />
                            </div>
                            <div>
                              <p className="text-sm text-slate-400 font-medium">Participants</p>
                              <p className="font-bold text-white">{contest.participants?.length || 0}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-3 flex-wrap mb-6">
                      <span className="px-4 py-2 bg-slate-800/50 border border-slate-700 text-slate-300 rounded-xl text-sm font-bold">
                        {contest.problems?.length || 0} Problems
                      </span>
                      {contest.createdBy && (
                        <span className="px-4 py-2 bg-slate-800/50 border border-slate-700 text-slate-300 rounded-xl text-sm font-bold">
                          By {contest.createdBy.firstName} {contest.createdBy.lastName}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => navigate(`/contests/${contest._id}/leaderboard`)}
                        className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 hover:border-amber-500/50 text-white font-bold rounded-xl transition-all flex items-center gap-2 group/btn"
                      >
                        <Trophy className="w-5 h-5 text-amber-400 group-hover/btn:scale-110 transition-transform" strokeWidth={2.5} />
                        Leaderboard
                      </button>
                      <button
                        onClick={() => navigate(`/contests/${contest._id}`)}
                        className="relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:scale-105 group/btn overflow-hidden"
                      >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                        <span className="relative z-10 flex items-center gap-2">
                          {participated ? 'Continue Contest' : 'Join Contest'}
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" strokeWidth={2.5} />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-pulse-slower { animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(148, 163, 184, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
}

export default ContestsListPage;
