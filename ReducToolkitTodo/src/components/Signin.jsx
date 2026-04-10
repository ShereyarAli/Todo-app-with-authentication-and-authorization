import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { updateDBPost } from '../../hook';
import { setAddUser } from '../features/todo/todoSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';


const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    let token = null
    let user_id = ''
    const dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.getItem('jwtToken')) {
            navigate('/todos');
        }
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await updateDBPost({ email, password, method: 'login' })
        console.log(res);
        if (res.success) {
            localStorage.setItem('jwtToken', res.payload.token)
            localStorage.setItem('user_id', res.payload.user_id)
            localStorage.setItem('userRole', res.payload.userRole)
            token = localStorage.getItem('jwtToken')
            user_id = localStorage.getItem('user_id')
            dispatch(setAddUser(false))
            if (token) {
                navigate('/todos');
                toast.success(res.message)
                console.log(token)
            }
        }
        else {
            toast.error(res.message)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-6">
            <div className="w-full max-w-md bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800/80 rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-all duration-500 hover:shadow-[0_20px_70px_rgba(0,0,0,0.7)] animate-in fade-in zoom-in slide-in-from-bottom-10">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black tracking-tight text-white mb-2">Welcome Back</h2>
                    <p className="text-zinc-500 font-medium tracking-wide">Enter your credentials to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2 group">
                        <label className="block text-xs font-bold text-zinc-500 ml-2 tracking-[0.2em] uppercase transition-colors group-focus-within:text-zinc-300">Email Address</label>
                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-zinc-200">
                                <i className="fa fa-envelope-o text-lg"></i>
                            </span>
                            <input
                                type="email"
                                required
                                className="w-full bg-zinc-950/40 border border-zinc-800/50 rounded-2xl py-4 pl-12 pr-6 text-white placeholder-zinc-700 outline-none focus:ring-2 focus:ring-zinc-700/30 focus:border-zinc-700/50 transition-all duration-300 shadow-inner"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2 group">
                        <label className="block text-xs font-bold text-zinc-500 ml-2 tracking-[0.2em] uppercase transition-colors group-focus-within:text-zinc-300">Password</label>
                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-zinc-200">
                                <i className="fa fa-lock text-xl"></i>
                            </span>
                            <input
                                type="password"
                                required
                                minLength={3}
                                className="w-full bg-zinc-950/40 border border-zinc-800/50 rounded-2xl py-4 pl-12 pr-6 text-white placeholder-zinc-700 outline-none focus:ring-2 focus:ring-zinc-700/30 focus:border-zinc-700/50 transition-all duration-300 font-sans tracking-widest shadow-inner"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <p className="text-[10px] text-zinc-600 font-medium ml-2 uppercase tracking-widest">Min 8 characters</p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-zinc-100 hover:bg-white text-zinc-950 font-black py-5 rounded-[1.5rem] shadow-2xl hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.3)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95 text-lg uppercase tracking-[0.2em] mt-4"
                    >
                        Authenticate
                    </button>
                </form>
                <p className="mt-12 text-zinc-400 text-sm font-medium tracking-wide">
                    Don't have an account?{' '}
                    <Link
                        to="/signup"
                        className="text-white font-black underline decoration-zinc-600 underline-offset-8 hover:decoration-white transition-all ml-2"
                    >
                        Sign Up Free
                    </Link>
                </p>
            </div>
        </div>

    );
};

export default Signin;
