import React, { useState } from "react";
import { FiCpu, FiZap, FiPlus, FiAlertCircle, FiArrowRight, FiLoader, FiCheckCircle, FiLayers, FiEye, FiCode, FiArrowLeft, FiRefreshCw, FiUploadCloud, FiPackage, FiSave } from "react-icons/fi";
import { TbX, TbApi, TbSettingsFilled} from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {setUserData} from "../redux/userSlice.js";
import LiveComponentPreview from "../components/LiveComponentPreview.jsx";
import { SiDeepgram } from "react-icons/si";
import { LiaToggleOnSolid, LiaToggleOffSolid } from "react-icons/lia";
import { FaRegEdit } from "react-icons/fa";

const ServerURL = import.meta.env.VITE_API_URL;

const Toast = ({message, type, onClose})=>{
    return(
        <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        className='fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl'
        style={{
            background: type === "success" ? "#0d9f6e" : type === "error" ? "#e02424" : "#1c1c2e",
            color: "#fff",
            minWidth: "220px",
        }}
        >
            {type === "success" ? <FiCheckCircle size={18} /> : <FiAlertCircle size={18} />}
            <p className='text-sm font-medium'>{message}</p>
            <button onClick={onClose} className='ml-auto text-white/60 hover:text-white text-xs'>
                <TbX size={18}/>
            </button>


        </motion.div>

    )
}

function ApiKeySettings({ userApiKey, onClose, onSave, onRemove }) {
    const [apiKey, setApiKey] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            await onSave(apiKey);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-lg mx-4 rounded-3xl overflow-hidden"
                    style={{
                        background: "rgba(13,13,40,0.95)",
                        border: "1px solid rgba(99,102,241,0.25)",
                        boxShadow: "0 0 40px rgba(99,102,241,0.15)",
                    }}
                >
                    {/* Header */}
                    <div
                        className="flex items-center justify-between px-6 py-3 border-b"
                        style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{
                                    background:
                                        "rgba(99,102,241,0.15)",
                                }}
                            >
                                <TbApi
                                    size={20}
                                    className="text-indigo-400"
                                />
                            </div>

                            <div>
                                <h3 className="font-semibold text-white">
                                    API Settings
                                </h3>
                                <p className="text-xs text-white/40">
                                    Manage your personal API key
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="text-white/40 hover:text-white transition"
                        >
                            <TbX size={22} />
                        </button>
                    </div>


                    {/* Body */}
                    <form
                        className="px-6 py-3"
                    >
                        {/* Warning */}
                        <div className="px-3 py-2 rounded-xl border border-red-500/20 bg-red-500/10">
                            <p className="text-xs font-medium text-red-400">
                                Once your API key is saved, it will not be visible again for security reasons.
                            </p>
                        </div>

                        <label className="block text-sm text-white/70 my-2">
                            {userApiKey
                                ? "Update API Key"
                                : "Enter API Key"}
                        </label>

                        <input
                            type="text"
                            value={apiKey}
                            onChange={(e) =>
                                setApiKey(e.target.value)
                            }
                            placeholder="sk-xxxxxxxxxxxxxxxx"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 outline-none focus:border-indigo-500 transition"
                        />

                        {
                            !userApiKey && (
                                <div className="mt-5 rounded-xl bg-white/5 border border-white/10 p-4">
                                    <h4 className="text-sm font-semibold text-white mb-3">
                                        How to get your OpenRouter API Key
                                    </h4>

                                    <ol className="space-y-1 text-sm text-white/60 list-decimal list-inside">
                                        <li>
                                            Visit{" "}
                                            <a
                                                href="https://openrouter.ai"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-indigo-400 hover:underline"
                                            >
                                                openrouter.ai
                                            </a>
                                        </li>

                                        <li>
                                            Sign in or create a free account
                                        </li>

                                        <li>
                                            Click on your profile avatar in the top-right corner
                                        </li>

                                        <li>
                                            Click on the Workspaces and Open the <span className="text-white">API Keys</span> section
                                        </li>

                                        <li>
                                            Generate a new API key
                                        </li>

                                        <li>
                                            Copy the generated key and paste it here
                                        </li>
                                    </ol>
                                </div>
                            )
                        }

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-xl text-sm font-medium"
                                style={{
                                    background:
                                        "rgba(255,255,255,0.05)",
                                    border:
                                        "1px solid rgba(255,255,255,0.08)",
                                    color:
                                        "rgba(255,255,255,0.6)",
                                }}
                            >
                                Cancel
                            </button>

                            {
                                userApiKey && (
                                    <button
                                        onClick={onRemove}
                                        className="px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40"
                                        style={{
                                            background:
                                                "linear-gradient(135deg,#6366f1 0%,#4f46e5 100%)",
                                            boxShadow:
                                                "0 0 20px rgba(99,102,241,0.3)",
                                            color: "#fff",
                                        }}
                                    >
                                        {saving
                                            ? "Removing..."
                                            : "Remove Key"}
                                    </button>
                                )
                            }


                            <button
                                onClick={handleSubmit}
                                disabled={
                                    saving || !apiKey.trim()
                                }
                                className="px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40"
                                style={{
                                    background:
                                        "linear-gradient(135deg,#6366f1 0%,#4f46e5 100%)",
                                    boxShadow:
                                        "0 0 20px rgba(99,102,241,0.3)",
                                    color: "#fff",
                                }}
                            >
                                {saving
                                    ? "Saving..."
                                    : userApiKey
                                    ? "Update Key"
                                    : "Save Key"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function Generate(){

    const {userData} = useSelector((state) => state.user);
    const userRole = userData?.role;
    const aiCredits = userData?.aiCredits;
    const lowCredits = userRole === "user" && aiCredits <= 50;
    const userApiKey = userData?.apiKey;
    // console.log(userRole, lowCredits);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [prompt, setPrompt] = useState("");
    const [generated, setGenerated] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [toast, setToast] = useState(null);
    const [activeTab, setActiveTab] = useState("preview");
    const [savedComponentId, setSavedComponentId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [published, setPublished] = useState(false);
    const [apiModalOpen, setApiModalOpen] = useState(false);
    const [useApi, setUseApi] = useState(false);

    const showToast = (message, type = 'info') => {
        setToast({message, type});
        setTimeout(() => setToast(null), 3000);
    };

    const handleGenerate = async () => {    
        if(!prompt.trim() || (lowCredits && !useApi)) return;
        setGenerated(null);
        setGenerating(true);
        try {
            const {data} = await axios.post(`${ServerURL}/api/component/generate`,{prompt, userApi: useApi}, {withCredentials: true});
            setGenerated(data.parsedContent);
            dispatch(setUserData({...userData, aiCredits:data.remainingCredits}));
            setGenerating(false);
            showToast("AI Component Generated", "success");
        } catch (error) {
            setGenerating(false);
            showToast("Error generating component", "error");
        }
    }

    const handleKeyDown = (e)=>{
        if(e.key === "Enter" && (e.ctrlKey || e.metaKey) && !lowCredits && prompt.trim() && !generating){
            handleGenerate();
        }
    }

    const handleSave = async ()=>{
        if(!generated) return;
        setSaving(true);
        try{
            const res = await axios.post(`${ServerURL}/api/component/save`, {name:generated.name, code:generated.code,props:generated.props}, {withCredentials: true});
            console.log(res);
            setSavedComponentId(res.data.component._id);
            setSaving(false);
            showToast("Component Saved", "success");
        }catch(error){
            console.log(error);
            setSaving(false);
            showToast("Error saving component", "error");
        }
    }    
    // console.log(savedComponentId);

    const handlePublish = async () => {
        if(!savedComponentId || publishing || published) return;
        setPublishing(true);
        try {
            const res = await axios.post(`${ServerURL}/api/component/publish`, {componentId:savedComponentId}, {withCredentials: true});
            setPublished(true);
            setPublishing(false);
            showToast("Component Published", "success");
        } catch (error) {
            setPublishing(false);
            showToast("Error publishing component", "error");
        }
    } 

    return(
        <div className='min-h-screen text-white relative overflow-hidden'
            style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0d0d28 60%, #0a1628 100%)" }}>
                <div className='absolute inset-0 pointer-events-none opacity-10'
                    style={{
                        backgroundImage: "linear-gradient(rgba(99,102,241,0.3) 2px,transparent 2px),linear-gradient(90deg,rgba(99,102,241,0.3) 2px,transparent 2px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                <div className='absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full pointer-events-none opacity-20' style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", filter: "blur(60px)" }} />
                <div className='absolute bottom-[-10%] right-[-5%] w-80 h-80 rounded-full pointer-events-none opacity-15' style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)", filter: "blur(60px)" }} />

                <nav className="sticky top-0 z-50 flex items-center justify-between px-6 sm:px-8 lg:px-12 py-3
                    bg-[rgba(3, 11, 13, 0.39)]
                    backdrop-blur-xl
                    border-b border-white/10
                    shadow-[0_8px_32px_rgba(0,0,0,0.25)]">

                    <div onClick={() => navigate("/")} className="flex items-center gap-2.5 cursor-pointer">
                        <div className='w-8 h-8 rounded-xl bg-gradient-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.4)]'>
                            <SiDeepgram size={17} color="#051c20"/>
                        </div>  
                        <span className="text-xl font-bold bg-gradient-to-br text-white bg-clip-text text-transparent" style={{fontFamily:"'Syne', sans-serif"}}>
                            DevoraUI
                        </span>
                    </div>

                    <div className="hidden md:flex text-sm items-center gap-4 lg:gap-6">

                        <button
                            onClick={() => navigate("/components")}
                            className="
                                px-6 py-1.5 rounded-xl
                                border border-white/10
                                bg-white/[0.03]
                                text-white/70
                                transition-all duration-300
                                hover:text-white
                                hover:bg-white/[0.06]
                                hover:border-cyan-400/30
                                hover:shadow-[0_0_20px_rgba(59,232,255,0.15)]
                            "
                        >
                            Components
                        </button>

                        <button
                            onClick={() => navigate("/my-components")}
                            className="
                                px-6 py-1.5 rounded-xl
                                border border-white/10
                                bg-white/[0.03]
                                text-white/70
                                transition-all duration-300
                                hover:text-white
                                hover:bg-white/[0.06]
                                hover:border-cyan-400/30
                                hover:shadow-[0_0_20px_rgba(59,232,255,0.15)]
                            "
                        >
                            My Components
                        </button>
                    </div>
                </nav>

                <div className='relative z-10 max-w-5xl mx-auto px-4 py-12'>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='text-center mb-12'>

                        <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6' style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}>
                            <FiCpu size={14} className="text-indigo-400" />
                            <span className='text-xs font-semibold tracking-widest text-indigo-300 uppercase'>
                                AI Component Studio
                            </span>
                        </div>
                        <h2 className='text-5xl font-bold mb-3 leading-tight'
                            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}>
                            <span className='text-white'>Build with</span>
                            <span style={{ background: "linear-gradient(135deg, #818cf8 0%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}> AI</span>
                        </h2>
                        <p className='text-white/40 text-base max-w-md mx-auto'>
                            Describe your React component in plain English. Preview, save, and publish - all in one place.
                        </p>


                    </motion.div>

                    {
                        userRole === "user" && (
                            <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{delay: 0.05}}
                            className="flex justify-end mb-4 gap-2">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{background: lowCredits ? "rgba(239,68,68,0.1)" : "rgba(99,102,241,0.1)", border: "1px solid" + (lowCredits ? "rgba(239,68,68,0.3)" : "rgba(99,102,241,0.3)") ,}}>
                                    <FiZap size={13} style={{ color: lowCredits ? "#f87171" : "#818cf8" }}/>
                                    <span className="text-xs font-semibold" style={{ color: lowCredits ? "#f87171" : "#818cf8" }}>
                                        {aiCredits} AI Credits
                                    </span>

                                    <button className='flex items-center justify-center w-5 h-5 rounded-md transition-all cursor-pointer border-none' style={{ background: lowCredits ? "rgba(239,68,68,0.2)" : "rgba(99,102,241,0.2)" }}
                                    onClick={() => navigate("/pricing")}>
                                        <FiPlus size={11} style={{ color: lowCredits ? "#f87171" : "#818cf8" }}/>
                                    </button>

                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)" }}>
                                    <TbApi size={22} style={{ color: "#818cf8" }}/>
                                    <span className="text-xs font-semibold" style={{ color: "#818cf8" }}>
                                        Your API Key
                                    </span>

                                    <button className='flex items-center justify-center w-5 h-5 rounded-md transition-all cursor-pointer border-none'
                                    onClick={() =>{
                                        if (userApiKey !== ""){
                                            setUseApi(!useApi);
                                        } else {
                                            setApiModalOpen(true);
                                        }
                                    }}>
                                        {
                                            useApi ? <LiaToggleOnSolid size={22} style={{ color: "#818cf8" }}/> : <LiaToggleOffSolid size={22} style={{ color: "#818cf8" }}/>
                                        }
                                    </button>

                                    {
                                        userApiKey !== "" ? (
                                            <button className='flex items-center justify-center w-5 h-5 rounded-md transition-all cursor-pointer border-none'
                                            onClick={()=>setApiModalOpen(true)}
                                            style={{background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)"}}>
                                                <FaRegEdit size={11} style={{ color: "#818cf8" }}/>
                                            </button>
                                        ) : (
                                            <button className='flex items-center justify-center w-5 h-5 rounded-md transition-all cursor-pointer border-none'
                                            onClick={()=>setApiModalOpen(true)}
                                            style={{background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)"}}>
                                                <TbSettingsFilled size={13} style={{ color: "#818cf8" }}/>
                                            </button>
                                        )
                                    }

                                    {
                                        apiModalOpen && (
                                            <ApiKeySettings
                                                userApiKey={userApiKey}
                                                onClose={() => setApiModalOpen(false)}
                                                onSave={async (key) => {
                                                    const res = await axios.post(
                                                        `${ServerURL}/api/user/set-api-key`,
                                                        { apiKey: key },
                                                        { withCredentials: true }
                                                    );
                                                    dispatch(
                                                        setUserData({
                                                            ...userData,
                                                            apiKey: res.data.apiKey,
                                                            iv: res.data.iv
                                                        })
                                                    );

                                                    showToast("API Key Updated", "success");
                                                }}
                                                onRemove={async ()=>{
                                                    await axios.post(
                                                        `${ServerURL}/api/user/remove-api-key`,
                                                        {},
                                                        { withCredentials: true }
                                                    );
                                                    dispatch(
                                                        setUserData({
                                                            ...userData,
                                                            apiKey: "",
                                                            iv: ""
                                                        })
                                                    );

                                                    showToast("API Key Removed", "success");
                                                }}
                                            />
                                        )
                                    }

                                </div>
                            </motion.div>
                        )
                    }

                    {lowCredits && !useApi && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='flex items-center gap-3 px-4 py-3 rounded-2xl mb-5'
                            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                            <FiAlertCircle size={16} className="text-red-400 shrink-0"/>
                            <p className='text-sm text-red-300'>
                                You need at least <span className="font-bold text-red-400">50 credits</span> to generate a component.
                            </p>
                            <button
                                onClick={() => navigate("/pricing")}
                                className='ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border-none whitespace-nowrap' 
                                style={{ background: "rgba(239, 68, 68, 0.2)", color: "#f87171" }}>
                                Buy Credits <FiArrowRight size={11}/>
                            </button>

                        </motion.div>
                    )}

                    {/* prompt box */}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className='rounded-2xl p-1 mb-8'
                        style={{
                            background: "rgba(255,255,255,0.04)",
                            border: lowCredits ? "1px solid rgba(239,68,68,0.15)" : "1px solid rgba(255,255,255,0.08)",
                            opacity: lowCredits ? 0.6 : 1,
                        }}
                        >
                        <div className='flex items-start gap-3 p-4'>
                            <FiZap className="text-indigo-400 mt-1 shrink-0" size={20}/>
                            <textarea
                                onKeyDown={handleKeyDown}
                                onChange={(e)=>setPrompt(e.target.value)}
                                value={prompt}
                                placeholder={lowCredits && !useApi ? "Not enough credits to generate..." : "A glassmorphism pricing card with a toggle for monthly/annual billing..."}
                                disabled={lowCredits && !useApi}
                                rows={3}
                                className='w-full bg-transparent text-white placeholder-white/20 text-[15px] resize-none outline-none leading-relaxed disabled:cursor-not-allowed'
                            />
                        </div>

                        <div className='flex items-center justify-between px-4 pb-3'>
                        <span className='text-xs text-white/20'>
                            Ctrl + Enter to generate
                        </span>
                        <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={handleGenerate}
                        disabled={generating || (lowCredits && !useApi) || !prompt.trim()}
                        className='flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all'
                        style={{
                            background: generating ? "rgba(99,102,241,0.3)" : "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                            boxShadow: generating ? "none" : "0 0 24px rgba(99,102,241,0.4)"
                        }}
                        >
                        {generating ? (
                        <motion.span 
                            animate={{ rotate: 360 }} 
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="inline-block"
                        >
                            <FiLoader size={15} />
                        </motion.span>
                        ) : (
                        <FiZap size={15} />
                        )}

                        {generating ? "Generating..." : "Generate"}
                        </motion.button>

                        </div>


                    </motion.div>


                    <AnimatePresence>
                        {generated && (
                            <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            className='rounded-2xl overflow-hidden'
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                            >

                                <div className='flex items-center justify-between px-5 py-4 border-b' style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                                <div className='flex items-center gap-3'>
                                    <div className='w-8 h-8 rounded-lg flex items-center justify-center' style={{ background: "rgba(99,102,241,0.2)" }}>
                                    <FiLayers size={14} className="text-indigo-400"/>
                                    </div>
                                    <div>
                                    <p className='text-sm font-semibold text-white'>{generated.name}</p>
                                    <p className='text-xs text-white/30'>
                                        {generated.props?.length > 0 ? `Props: ${generated.props.join(", ")}` : "No props"}
                                    </p>
                                    </div>

                                </div>

                                <div className="flex gap-1 rounded-xl p-1" style={{ background: "rgba(0,0,0,0.3)" }}>
                                {
                                    ["preview", "code"].map((tab)=>(
                                    <button key={tab} onClick={()=>setActiveTab(tab)}
                                        className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize'
                                        style={{
                                        background: activeTab === tab ? "rgba(99,102,241,0.5)" : "transparent",
                                        color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.4)",
                                        }}
                                    >
                                        {
                                            tab==="preview" ? <FiEye size={15}/> : <FiCode size={15} />
                                        }

                                    </button>
                                    ))
                                }
                                </div>


                                </div>

                                <div className='p-5'>
                                <AnimatePresence mode='wait'>
                                    {activeTab === "preview" ? (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        key="preview"
                                    >
                                        {
                                        generated?.code && (
                                            <LiveComponentPreview code={generated.code}/>
                                        )
                                        }
                                    </motion.div>
                                    ) : (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        key="code" className='rounded-xl overflow-auto'
                                        style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.06)", maxHeight: "340px" }}
                                        >
                                        <pre className='p-5 text-xs leading-relaxed text-green-300 font-mono whitespace-pre-wrap'>
                                            {generated.code}
                                        </pre>
                                        </motion.div>

                                    )}
                                </AnimatePresence>
                                </div>

                                <div className='flex items-center gap-3 px-5 pb-5 pt-1 flex-wrap'>
                                {userRole === "admin" && (
                                    <>
                                    <motion.button onClick={handleSave} whileTap={{ scale: 0.97 }}
                                        // disabled={saving || savedComponentId}
                                        className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed'
                                        style={{
                                            background: savedComponentId ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.06)",
                                            border: savedComponentId ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(255,255,255,0.1)",
                                            color: savedComponentId ? "#34d399" : "#fff",
                                        }}
                                    >

                                        {saving ? (
                                        <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                            <FiLoader size={14} />
                                        </motion.span>
                                        ) : savedComponentId ? (
                                        <FiCheckCircle size={14} />
                                        ) : (
                                        <FiSave size={14} />
                                        )}
                                        {saving ? "Saving..." : savedComponentId ? "Saved" : "Save Component"}




                                    </motion.button>
                                        {savedComponentId && !published && (
                                            <motion.button onClick={handlePublish}
                                                whileTap={{ scale: 0.97 }}
                                            className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40'
                                            style={{
                                                background: publishing ? "rgba(6,182,212,0.2)" : "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                                                boxShadow: publishing ? "none" : "0 0 20px rgba(6,182,212,0.3)",
                                                color: "#fff",
                                            }}
                                            >
                                                {publishing ? (
                                                    <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                                        <FiLoader size={14} />
                                                    </motion.span>
                                                ) : (
                                                    <FiUploadCloud size={14} />
                                                )}
                                                {publishing ? "Publishing..." : "Publish to npm"}


                                            </motion.button>
                                        )}

                                        {published && (
                                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
                                            style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399" }}
                                        >
                                            <FiCheckCircle size={14} /> Published
                                        </motion.div>
                                        )}

                                        {savedComponentId && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-center gap-2 ml-auto"
                                        >
                                            <motion.button
                                            onClick={()=>navigate("/")}
                                            whileTap={{scale: 0.97}}
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                                            style={{
                                                background: "rgba(255,255,255,0.05)",
                                                border: "1px solid rgba(255,255,255,0.1)",
                                                color: "rgba(255,255,255,0.5)",
                                            }}
                                            >
                                                <FiArrowLeft size={16}/> Back
                                            </motion.button>

                                            <motion.button
                                            onClick={()=>{
                                                setPrompt("");
                                                setGenerated(null);
                                                setSavedComponentId(null);
                                                setPublished(false);
                                                setActiveTab("preview");
                                            }}
                                            whileTap={{ scale: 0.97 }}
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                                            style={{ background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)", boxShadow: "0 0 20px rgba(99,102,241,0.3)", color: "#fff" }}
                                            >
                                                <FiRefreshCw size={16} />
                                                Generate New
                                            </motion.button>

                                        </motion.div>
                                        )}
                                    </>
                                )}

                                {userRole === "user" && (
                                    <>
                                    <motion.button onClick={handleSave} whileTap={{ scale: 0.97 }}
                                        disabled={saving || savedComponentId}
                                        className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed'
                                        style={{
                                            background: savedComponentId ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.06)",
                                            border: savedComponentId ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(255,255,255,0.1)",
                                            color: savedComponentId ? "#34d399" : "#fff",
                                        }}
                                    >
                                        {saving ? (
                                        <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                            <FiLoader size={14} />
                                        </motion.span>
                                        ) : savedComponentId ? (
                                        <FiCheckCircle size={14} />
                                        ) : (
                                        <FiSave size={14} />
                                        )}
                                        {saving ? "Saving..." : savedComponentId ? "Saved" : "Save Component"}
                                    </motion.button>

                                        {savedComponentId && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-center gap-2 ml-auto"
                                        >
                                            <motion.button
                                            onClick={()=>navigate("/")}
                                            whileTap={{scale: 0.97}}
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                                            style={{
                                                background: "rgba(255,255,255,0.05)",
                                                border: "1px solid rgba(255,255,255,0.1)",
                                                color: "rgba(255,255,255,0.5)",
                                            }}
                                            >
                                                <FiArrowLeft size={16}/> Back
                                            </motion.button>

                                            <motion.button
                                            onClick={()=>{
                                                setPrompt("");
                                                setGenerated(null);
                                                setSavedComponentId(null);
                                                setPublished(false);
                                                setActiveTab("preview");
                                            }}
                                            whileTap={{ scale: 0.97 }}
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                                            style={{ background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)", boxShadow: "0 0 20px rgba(99,102,241,0.3)", color: "#fff" }}
                                            >
                                                <FiRefreshCw size={16} />
                                                Generate New
                                            </motion.button>

                                        </motion.div>
                                        )}

                                        <motion.button
                                        whileTap={{ scale: 0.97 }}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                                        style={{
                                            background: "rgba(99,102,241,0.15)",
                                            border: "1px solid rgba(99,102,241,0.3)",
                                            color: "#818cf8",
                                        }}
                                        >
                                        <FiPackage size={14} /> My Components
                                        </motion.button>
                                    </>
                                )}
                                </div>

                                

                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>


                

        {!generated && !generating && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className='text-center py-16'
            >
                <div className='w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4'
                style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}
                >
                <FiCpu size={28} className="text-indigo-400"/>
                </div>
                <p className='text-white/20 text-sm'>
                Describe your component above and hit Generate
                </p>


            </motion.div>   
        )}

        {
            generating && (
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-center py-16'
                >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    style={{ borderTopColor: "#6366f1", borderRightColor: "#06b6d4" }}
                    className='w-12 h-12 rounded-full border-2 border-transparent mx-auto mb-4'
                />
                <p className="text-white/30 text-sm">AI is crafting your component...</p>
                </motion.div>
            )
        }


        <AnimatePresence>
        {toast && ( <Toast message={toast.message} type={toast.type} onClose={() =>setToast(null)}/>)}
        </AnimatePresence>


        </div>
    );
};

export default Generate;