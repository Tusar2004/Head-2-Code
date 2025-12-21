import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import {
    User, MapPin, GraduationCap, Github, Linkedin, Edit, Save, X,
    Camera, Trophy, Target, Flame, TrendingUp, Award, Code2,
    CheckCircle2, Calendar, BarChart3, Zap, Star, Crown
} from 'lucide-react';

function ProfilePage() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { user: currentUser } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        bio: '',
        location: '',
        college: '',
        githubId: '',
        linkedinId: ''
    });

    const isOwnProfile = !userId || userId === currentUser?._id;

    useEffect(() => {
        fetchProfile();
    }, [userId]);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const endpoint = userId ? `/profile/${userId}` : '/profile/me';
            const response = await axiosClient.get(endpoint);
            setProfile(response.data);
            setFormData({
                bio: response.data.user.bio || '',
                location: response.data.user.location || '',
                college: response.data.user.college || '',
                githubId: response.data.user.githubId || '',
                linkedinId: response.data.user.linkedinId || ''
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            await axiosClient.put('/profile/update', formData);
            setEditMode(false);
            fetchProfile();
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size must be less than 5MB');
            return;
        }

        setUploading(true);
        try {
            // Convert to base64
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64Image = reader.result;
                await axiosClient.post('/profile/upload-picture', { imageData: base64Image });
                fetchProfile();
                setUploading(false);
            };
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <h3 className="text-2xl font-bold text-white">Loading Profile...</h3>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">Profile not found</h3>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    const { user, statistics, badges } = profile;
    const languageEntries = Object.entries(statistics.languageStats || {});
    const totalLanguageSubmissions = languageEntries.reduce((sum, [, count]) => sum + count, 0);

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
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="mb-6 flex items-center gap-2 px-4 py-2 bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700/80 rounded-xl text-white transition-all"
                >
                    <X className="w-4 h-4" />
                    Back to Home
                </button>

                {/* Profile Header */}
                <div className="relative group mb-8 animate-fade-in">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                    <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-800/50">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                            {/* Profile Picture */}
                            <div className="relative group/avatar">
                                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur opacity-60 group-hover/avatar:opacity-100 transition-all duration-500"></div>
                                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-slate-800">
                                    {user.profilePicture ? (
                                        <img src={user.profilePicture} alt={user.firstName} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                            <User className="w-16 h-16 text-white" />
                                        </div>
                                    )}
                                    {isOwnProfile && (
                                        <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-all cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                disabled={uploading}
                                            />
                                            <Camera className="w-8 h-8 text-white" />
                                        </label>
                                    )}
                                </div>
                                {uploading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-full">
                                        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>

                            {/* User Info */}
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h1 className="text-4xl font-black text-white mb-2">
                                            {user.firstName} {user.lastName}
                                        </h1>
                                        <p className="text-slate-400 text-lg">{user.emailId}</p>
                                        {user.role === 'admin' && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 text-sm font-bold rounded-lg border border-amber-500/30 mt-2">
                                                <Crown className="w-4 h-4" />
                                                Admin
                                            </span>
                                        )}
                                    </div>
                                    {isOwnProfile && (
                                        <button
                                            onClick={() => editMode ? handleUpdateProfile() : setEditMode(true)}
                                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30"
                                        >
                                            {editMode ? (
                                                <>
                                                    <Save className="w-4 h-4" />
                                                    Save Changes
                                                </>
                                            ) : (
                                                <>
                                                    <Edit className="w-4 h-4" />
                                                    Edit Profile
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>

                                {/* Bio */}
                                {editMode ? (
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        placeholder="Tell us about yourself..."
                                        className="w-full bg-slate-800/60 border-2 border-slate-700 text-white rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none resize-none"
                                        rows="3"
                                        maxLength="500"
                                    />
                                ) : (
                                    <p className="text-slate-300 mb-4">
                                        {user.bio || 'No bio yet. Click Edit Profile to add one!'}
                                    </p>
                                )}

                                {/* Location, College, Social Links */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    {editMode ? (
                                        <>
                                            <div>
                                                <label className="text-sm text-slate-400 mb-1 block">Location</label>
                                                <input
                                                    type="text"
                                                    value={formData.location}
                                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                    placeholder="City, Country"
                                                    className="w-full bg-slate-800/60 border-2 border-slate-700 text-white rounded-xl px-4 py-2 focus:border-blue-500 focus:outline-none"
                                                    maxLength="100"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm text-slate-400 mb-1 block">College/University</label>
                                                <input
                                                    type="text"
                                                    value={formData.college}
                                                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                                                    placeholder="Your institution"
                                                    className="w-full bg-slate-800/60 border-2 border-slate-700 text-white rounded-xl px-4 py-2 focus:border-blue-500 focus:outline-none"
                                                    maxLength="200"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm text-slate-400 mb-1 block">GitHub Username</label>
                                                <input
                                                    type="text"
                                                    value={formData.githubId}
                                                    onChange={(e) => setFormData({ ...formData, githubId: e.target.value })}
                                                    placeholder="github-username"
                                                    className="w-full bg-slate-800/60 border-2 border-slate-700 text-white rounded-xl px-4 py-2 focus:border-blue-500 focus:outline-none"
                                                    maxLength="100"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm text-slate-400 mb-1 block">LinkedIn Username</label>
                                                <input
                                                    type="text"
                                                    value={formData.linkedinId}
                                                    onChange={(e) => setFormData({ ...formData, linkedinId: e.target.value })}
                                                    placeholder="linkedin-username"
                                                    className="w-full bg-slate-800/60 border-2 border-slate-700 text-white rounded-xl px-4 py-2 focus:border-blue-500 focus:outline-none"
                                                    maxLength="100"
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {user.location && (
                                                <div className="flex items-center gap-2 text-slate-300">
                                                    <MapPin className="w-4 h-4 text-blue-400" />
                                                    {user.location}
                                                </div>
                                            )}
                                            {user.college && (
                                                <div className="flex items-center gap-2 text-slate-300">
                                                    <GraduationCap className="w-4 h-4 text-purple-400" />
                                                    {user.college}
                                                </div>
                                            )}
                                            {user.githubId && (
                                                <a
                                                    href={`https://github.com/${user.githubId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
                                                >
                                                    <Github className="w-4 h-4" />
                                                    {user.githubId}
                                                </a>
                                            )}
                                            {user.linkedinId && (
                                                <a
                                                    href={`https://linkedin.com/in/${user.linkedinId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
                                                >
                                                    <Linkedin className="w-4 h-4" />
                                                    {user.linkedinId}
                                                </a>
                                            )}
                                        </>
                                    )}
                                </div>

                                {editMode && (
                                    <button
                                        onClick={() => {
                                            setEditMode(false);
                                            setFormData({
                                                bio: user.bio || '',
                                                location: user.location || '',
                                                college: user.college || '',
                                                githubId: user.githubId || '',
                                                linkedinId: user.linkedinId || ''
                                            });
                                        }}
                                        className="mt-4 flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    {[
                        {
                            title: 'Problems Solved',
                            value: statistics.problemsSolved,
                            icon: Target,
                            color: 'from-blue-500 to-cyan-500',
                            gradient: 'from-blue-500/20 to-cyan-500/20',
                            border: 'border-blue-500/30',
                            iconColor: 'text-blue-400'
                        },
                        {
                            title: 'Current Streak',
                            value: `${statistics.currentStreak} days`,
                            icon: Flame,
                            color: 'from-orange-500 to-red-500',
                            gradient: 'from-orange-500/20 to-red-500/20',
                            border: 'border-orange-500/30',
                            iconColor: 'text-orange-400'
                        },
                        {
                            title: 'Acceptance Rate',
                            value: `${statistics.acceptanceRate}%`,
                            icon: CheckCircle2,
                            color: 'from-emerald-500 to-teal-500',
                            gradient: 'from-emerald-500/20 to-teal-500/20',
                            border: 'border-emerald-500/30',
                            iconColor: 'text-emerald-400'
                        },
                        {
                            title: 'Total Submissions',
                            value: statistics.totalSubmissions,
                            icon: Code2,
                            color: 'from-purple-500 to-pink-500',
                            gradient: 'from-purple-500/20 to-pink-500/20',
                            border: 'border-purple-500/30',
                            iconColor: 'text-purple-400'
                        }
                    ].map((stat, index) => (
                        <div key={index} className="relative group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                            {/* Animated Glow */}
                            <div className={`absolute -inset-1 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500 animate-pulse-slow`}></div>

                            <div className={`relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl rounded-2xl p-6 border-2 ${stat.border} hover:border-opacity-80 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl`}>
                                {/* Icon Section - Large and Prominent */}
                                <div className="flex items-center justify-center mb-4">
                                    <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                                        {/* Icon Glow */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-md opacity-50 group-hover:opacity-70 transition-all`}></div>
                                        <stat.icon className={`relative w-10 h-10 ${stat.iconColor} drop-shadow-lg`} strokeWidth={2.5} />
                                    </div>
                                </div>

                                {/* Value - Large and Bold */}
                                <div className="text-center mb-3">
                                    <div className={`text-4xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent drop-shadow-lg`}>
                                        {stat.value}
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="text-center">
                                    <div className="text-white font-bold text-base group-hover:text-blue-300 transition-colors">
                                        {stat.title}
                                    </div>
                                </div>

                                {/* Bottom Accent Line */}
                                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-all duration-500`}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Difficulty Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
                    {[
                        { difficulty: 'Easy', count: statistics.difficultyBreakdown.easy, color: 'from-emerald-500 to-green-500', bg: 'from-emerald-500/20 to-green-500/20' },
                        { difficulty: 'Medium', count: statistics.difficultyBreakdown.medium, color: 'from-amber-500 to-orange-500', bg: 'from-amber-500/20 to-orange-500/20' },
                        { difficulty: 'Hard', count: statistics.difficultyBreakdown.hard, color: 'from-rose-500 to-pink-500', bg: 'from-rose-500/20 to-pink-500/20' }
                    ].map((item, index) => (
                        <div key={index} className="relative group">
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-20 group-hover:opacity-30 transition-all duration-500`}></div>
                            <div className={`relative bg-gradient-to-br ${item.bg} backdrop-blur-xl rounded-2xl p-6 border border-slate-800/50`}>
                                <div className="text-center">
                                    <div className={`text-5xl font-black bg-gradient-to-br ${item.color} bg-clip-text text-transparent mb-2`}>
                                        {item.count}
                                    </div>
                                    <div className="text-white font-bold text-xl">{item.difficulty}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Badges Section */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                        <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/50">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Award className="w-6 h-6 text-amber-400" />
                                Badges & Achievements
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {badges.length > 0 ? (
                                    badges.map((badge, index) => (
                                        <div key={index} className="relative group/badge">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl blur opacity-0 group-hover/badge:opacity-30 transition-all duration-300"></div>
                                            <div className="relative p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-amber-500/50 transition-all text-center">
                                                <div className="text-4xl mb-2">{badge.icon}</div>
                                                <div className="text-white font-bold text-sm mb-1">{badge.name}</div>
                                                <div className="text-xs text-slate-400">{badge.description}</div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-2 text-center py-8 text-slate-400">
                                        No badges earned yet. Keep solving problems!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Languages Used */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                        <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/50">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Code2 className="w-6 h-6 text-blue-400" />
                                Languages Used
                            </h3>
                            <div className="space-y-4">
                                {languageEntries.length > 0 ? (
                                    languageEntries.map(([language, count], index) => {
                                        const percentage = Math.round((count / totalLanguageSubmissions) * 100);
                                        const colors = {
                                            javascript: { bar: 'from-yellow-500 to-amber-500', text: 'text-yellow-400' },
                                            'c++': { bar: 'from-blue-500 to-cyan-500', text: 'text-blue-400' },
                                            java: { bar: 'from-red-500 to-orange-500', text: 'text-red-400' }
                                        };
                                        const color = colors[language.toLowerCase()] || { bar: 'from-purple-500 to-pink-500', text: 'text-purple-400' };

                                        return (
                                            <div key={index}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className={`text-sm font-bold ${color.text} uppercase`}>{language}</span>
                                                    <span className="text-sm font-bold text-white">{count} ({percentage}%)</span>
                                                </div>
                                                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full bg-gradient-to-r ${color.bar} rounded-full transition-all duration-1000`}
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-8 text-slate-400">
                                        No submissions yet. Start solving problems!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
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
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
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

export default ProfilePage;
