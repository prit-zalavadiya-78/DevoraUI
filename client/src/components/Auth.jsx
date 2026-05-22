import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { TbLogin2, TbSettings, TbCopy, TbDownload } from "react-icons/tb";
import { HiSparkles } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { SiDeepgram } from "react-icons/si";

const ServerURL = import.meta.env.VITE_API_URL;

const steps = [

    {icon: TbLogin2, title:"Login with Google", desc:"To unlock AI tools instantly."},
    {icon: HiSparkles, title:"Get 100 AI Credits", desc:"For free to generate premium UI components."},
    {icon: TbSettings, title:"Customize Props", desc:"Fine tune and preview every change live."},
    {icon: TbCopy, title:"Generate Components", desc:"AI builds production ready JSX components."},
    {icon: TbDownload, title:"Copy or Save", desc:"Export clean code straight into your project."}
];

function Auth({onClose}){

    const [active, setActive] = useState(0);

    const dispatch = useDispatch();

    useEffect(()=>{
        const interval = setInterval(() => {
            setActive((prevActive) => (prevActive + 1) % steps.length);
        }, 2400);

        return () => clearInterval(interval);
    },[]);

    const googleAuth = async ()=>{
        try {
            const res = await signInWithPopup(auth, provider);
            // console.log(res);
            const User = res.user;
            const name = User.displayName;
            const email = User.email;

            const result = await axios.post(`${ServerURL}/api/auth/google`, {name, email}, {
                withCredentials: true
            });
            dispatch(setUserData(result.data));
            // console.log(result);
            onClose();

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <AnimatePresence>
        <motion.div 
            initial={{opacity:0}} 
            animate={{opacity:1}} 
            exit={{opacity:0}} 
            transition={{duration:0.3}} 
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4"
        >
            <motion.div 
                initial={{opacity:0, scale:0.9, y:20}} 
                animate={{opacity:1, scale:1, y:0}} 
                exit={{opacity:0, scale:0.9, y:20}} 
                transition={{duration:0.3}} 
                className="flex flex-col sm:flex-row w-full max-w-[800px] bg-[#0a0a0a] max-h-[90vh] overflow-y-auto rounded-2xl border border-[#3be8ff]/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] relative overflow-x-hidden"
            >
                {/* X button */}
                <button onClick={onClose} className="z-50 absolute top-4 right-4 text-white/70 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* left box */}
                <div className="w-full sm:w-1/2 bg-[#0a0a0a] p-8 flex flex-col justify-center">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3be8ff]/10 to-[#000000]/10 pointer-events-none"/>
                    <motion.div
                        initial={{opacity:0, x:20}}
                        animate={{opacity:1, x:0}}
                        transition={{delay:0.3}}
                        className="flex items-center gap-3 mb-7 sm:mb-9"
                    >
                        <div className="w-8 h-8 bg-white rounded-lg grid place-items-center">
                            <SiDeepgram size={17} color="#000000ff" />
                        </div>
                        <span className="text-2xl font-bold bg-white bg-clip-text text-transparent">
                            DevoraUI
                        </span>
                    </motion.div>

                    <p className="text-[10px] font-semibold tracking-[3px] text-[#3be8ff] uppercase mb-4 sm:mb-5">How it works</p>

                    <div className="flex sm:flex-col gap-2 sm:gap-1 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 -mx-1 px-1">
                        {
                            steps.map((item, i)=>(
                                <motion.div key={i} className={`flex-shrink-0 sm:flex-shrink flex items-start gap-3 px-3 py-2.5 rounded-xl border transition-all duration-300 min-w-[200px] sm:min-w-0 ${active === i ? "border-[#3be8ff]/[0.07] bg-[#3be8ff]/20" : "border-transparent bg-transparent"} `}>
                                    <div className={`min-w-[28px] h-7 rounded-lg flex items-center justify-center border transition-all duration-300 ${active === i ? "bg-gradient-to-br from-[#3be8ff] to-[#0ab8d6] border-transparent":"border-[#3be8ff]/[0.08] bg-[#3be8ff]/20"}`}>
                                    {<item.icon size={14} className={`${active === i ? "text-black" : "text-[#3be8ff]"}`} />}</div>
                                    <div className="flex-1">
                                        <p className={`text-[12.5px] font-semibold transition-colors duration-300 whitespace-nowrap sm:whitespace-normal  ${active === i ? "text-[#d4f5fa]" : "text-white/60"}`}>
                                            {item.title}
                                        </p>
                                        <div className={`overflow-hidden transition-all duration-500 ${active === i ? "max-h-8 opacity-100 mt-0.5" : "max-h-0 opacity-0"}`}>
                                            <p className={`text-xs transition-all duration-300 ${active === i ? "text-[#3be8ff]/[0.8]" : "text-white/60"}`}>
                                            {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        }
                    </div>

                </div>

                {/* right box */}
                <motion.div
                    initial={{opacity:0, x:20}}
                    animate={{opacity:1, x:0}}
                    transition={{delay:0.3, duration:0.3}}
                    className="sm:w-[50%] bg-[#040f12] px-6 z-0 sm:px-10 py-8 sm:py-12 flex flex-col items-center justify-center relative overflow-hidden"> 
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,232,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,232,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"/>
                    
                    <div className="relative z-10 w-full max-w-[280px] sm:max-w-[260px] text-center mx-auto">
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mb-5 sm:mb-6 mx-auto
                                        bg-gradient-to-br from-[#3be8ff]/15 to-[#040f12]/15
                                        border border-[#3be8ff]/20
                                        flex items-center justify-center"
                            >
                            <SiDeepgram 
                                className="w-6 h-6"
                            />
                        </motion.div>
                        
                        <h3 className="text-xl font-bold text-[#e4f6f8] mb-2 tracking-tight">
                            Welcome to <span className="text-[#3be8ff]">DevoraUI</span>
                        </h3>
                        <p className="text-[13px] text-[#96bec8]/55 leading-relaxed mb-6 sm:mb-7">
                            Sign in to generate AI-powered UI components in seconds
                        </p>

                        <div className="flex justify-center gap-4 sm:gap-5 mb-6 sm:mb-7">
                            {
                                [["100", "AI Credits"], ["∞", "Components"], ["JSX", "Ready"]].map(([v, l], i) => (
                                    <div key={i} className="text-center">
                                        <div className="text-base font-bold text-[#3be8ff] drop-shadow-[0_0_10px_rgba(59,232,255,0.5)]">{v}</div>
                                        <div className="text-xs text-[#96bec8] uppercase tracking-wider">{l}</div>
                                    </div>
                                ))
                            }

                        </div>

                        <motion.button
                        onClick={googleAuth}
                        whileHover={{y:-2, scale:1.02}}
                        whileTap={{scale:0.98}}
                        className='w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-white text-[#0a1a1d] font-semibold text-sm cursor-pointer border-none shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(59,232,255,0.2)] transition-shadow'>
                            <FcGoogle size={20} />
                            <span>Continue with Google</span>
                        </motion.button>
                        
                        <p className='text-[11px] text-[#64919b]/45 mt-4 sm:mt-5'>
                        No account needed for npm.{" "}
                        <span onClick={onClose} className='text-[#3be8ff]/50 border-bborder- border-[#3be8ff]/20 cursor-pointer hover: text-[#3be8ff]/8 transition-colors'>
                            View docs →
                        </span>
                        </p>
                    </div>

                </motion.div>

            </motion.div>
        </motion.div>
        </AnimatePresence>
    )
}

export default Auth