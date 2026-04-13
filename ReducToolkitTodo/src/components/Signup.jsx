import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { updateDBPost } from '../../hook';
import { toast } from 'sonner';



const Signup = ({ addUser }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
        method: 'signup',
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('jwtToken')) {
            navigate('/todos');
        }
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updateDBPost(formData)
            if (res.success) {
                if (!addUser) {
                    navigate('/login');
                }
                toast.success(res.message)
                console.log(res)
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    role: 'user',
                    method: 'signup'
                })
            }
            else {
                toast.error(res.message)
            }
        } catch (error) {
            console.error('Signup error:', error);
            toast.error(error?.message || error || 'Something went wrong');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-6">
            <div className="w-full max-w-lg bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800/80 rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-all duration-500 hover:shadow-[0_20px_70px_rgba(0,0,0,0.7)] animate-in fade-in zoom-in slide-in-from-top-10">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black tracking-tight text-white mb-2">Create Account</h2>
                    <p className="text-zinc-500 font-medium tracking-wide">Join our professional community today</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2 group">
                        <label className="block text-xs font-bold text-zinc-500 ml-2 tracking-[0.2em] uppercase transition-colors group-focus-within:text-zinc-300">Full Name</label>
                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-zinc-200">
                                <i className="fa fa-user-circle-o text-lg"></i>
                            </span>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full bg-zinc-950/40 border border-zinc-800/50 rounded-2xl py-4 pl-12 pr-6 text-white placeholder-zinc-700 outline-none focus:ring-2 focus:ring-zinc-700/30 focus:border-zinc-700/50 transition-all duration-300 shadow-inner"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-2 group">
                        <label className="block text-xs font-bold text-zinc-500 ml-2 tracking-[0.2em] uppercase transition-colors group-focus-within:text-zinc-300">Email Address</label>
                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-zinc-200">
                                <i className="fa fa-envelope-o text-lg"></i>
                            </span>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full bg-zinc-950/40 border border-zinc-800/50 rounded-2xl py-4 pl-12 pr-6 text-white placeholder-zinc-700 outline-none focus:ring-2 focus:ring-zinc-700/30 focus:border-zinc-700/50 transition-all duration-300 shadow-inner"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-2 group">
                        <label className="block text-xs font-bold text-zinc-500 ml-2 tracking-[0.2em] uppercase transition-colors group-focus-within:text-zinc-300">Password</label>
                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-zinc-200">
                                <i className="fa fa-lock text-xl"></i>
                            </span>
                            <input
                                type="password"
                                name="password"
                                required
                                minLength={3}
                                className="w-full bg-zinc-950/40 border border-zinc-800/50 rounded-2xl py-4 pl-12 pr-6 text-white placeholder-zinc-700 outline-none focus:ring-2 focus:ring-zinc-700/30 focus:border-zinc-700/50 transition-all duration-300 font-sans tracking-widest shadow-inner text-sm"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <p className="text-[10px] text-zinc-600 font-medium ml-2 uppercase tracking-widest">Min 8 characters</p>
                    </div>

                    {addUser && (
                        <div className="md:col-span-2 space-y-4">
                            <label className="block text-xs font-bold text-zinc-500 ml-2 tracking-[0.2em] uppercase">Select Role</label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`cursor-pointer flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300 ${formData.role === 'admin' ? 'bg-zinc-100 border-white text-zinc-950 font-black shadow-xl' : 'bg-zinc-900/40 border-zinc-800/50 text-zinc-500 hover:text-white hover:bg-zinc-800/50'}`}>
                                    <input type="radio" name="role" value="admin" className="hidden" checked={formData.role === 'admin'} onChange={handleChange} />
                                    <i className="fa fa-shield text-lg"></i>
                                    <span className="font-bold">Admin</span>
                                </label>
                                <label className={`cursor-pointer flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300 ${formData.role === 'user' ? 'bg-zinc-100 border-white text-zinc-950 font-black shadow-xl' : 'bg-zinc-900/40 border-zinc-800/50 text-zinc-500 hover:text-white hover:bg-zinc-800/50'}`}>
                                    <input type="radio" name="role" value="user" className="hidden" checked={formData.role === 'user'} onChange={handleChange} />
                                    <i className="fa fa-user text-lg"></i>
                                    <span className="font-bold">User</span>
                                </label>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="md:col-span-2 w-full bg-zinc-100 hover:bg-white text-zinc-950 font-black py-5 rounded-[1.5rem] shadow-2xl hover:shadow-[0_0_40_rgba(255,255,255,0.3)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95 text-lg uppercase tracking-[0.2em] mt-4"
                    >
                        Create My Account
                    </button>
                </form>

                {!addUser && (
                    <div className="mt-12 pt-10 border-t border-zinc-800/30 flex flex-col items-center">
                        <p className="text-zinc-400 text-sm font-medium tracking-wide">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-white font-black underline decoration-zinc-600 underline-offset-8 hover:decoration-white transition-all ml-2"
                            >
                                Log In Instead
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </div>

    );
};

export default Signup;
