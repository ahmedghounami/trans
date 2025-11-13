"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 1.2, // Delay button animation
      },
    },
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center overflow-x-hidden overflow-y-auto text-white">
      {/* Background Frames/Shapes - UNCHANGED */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#7b5ddf44] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#bfb8e744] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-48 h-48 bg-[#0e066e44] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 1 }}
      />

      {/* Logo in top-left corner */}
      <motion.div
        className="fixed top-4 left-4 z-20"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img
          src="/logo.png"
          alt="Logo"
          className="shadow-md w-[90px] h-[60px] object-contain"
          width={150}
          height={150}
        />
      </motion.div>

      {/* Main content (Hero and Features) - Centered */}
      <motion.div
        className="relative z-10 flex flex-col items-center w-full max-w-4xl px-4 py-6 my-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <div className="flex flex-col text-center items-center justify-center mb-8">
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            Ping Pong, Anytime, <br /> Anywhere
          </motion.h1>
          <motion.h2 variants={itemVariants} className="text-base sm:text-lg md:text-xl font-semibold text-gray-400 mt-6 mb-6">
            Play solo, with friends, or jump into online <br /> tournaments — right now!
          </motion.h2>
          <motion.div variants={buttonVariants}>
            <Link
              className="bg-[#fffdfd] text-[#0e066e] text-center px-6 py-3 rounded-[15px] font-extrabold hover:bg-[#0e066e] hover:text-white transition-colors duration-300 text-lg shadow-lg"
              href="/home"
            >
              Get Started
            </Link>
          </motion.div>
        </div>

        {/* Features Section (Placeholder) */}
        <motion.div
          className="mt-8 w-full text-center pb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="bg-[#352c523d] p-5 rounded-xl shadow-lg border border-[#7b5ddf44] backdrop-blur-sm"
              whileHover={{ translateY: -5, boxShadow: "0 0 20px #7b5ddf99" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4 className="text-lg font-semibold mb-2">Solo Play</h4>
              <p className="text-gray-300 text-sm">Hone your skills against advanced AI opponents.</p>
            </motion.div>
            <motion.div
              className="bg-[#352c523d] p-5 rounded-xl shadow-lg border border-[#7b5ddf44] backdrop-blur-sm"
              whileHover={{ translateY: -5, boxShadow: "0 0 20px #7b5ddf99" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4 className="text-lg font-semibold mb-2">Multiplayer</h4>
              <p className="text-gray-300 text-sm">Challenge friends or random players online.</p>
            </motion.div>
            <motion.div
              className="bg-[#352c523d] p-5 rounded-xl shadow-lg border border-[#7b5ddf44] backdrop-blur-sm"
              whileHover={{ translateY: -5, boxShadow: "0 0 20px #7b5ddf99" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4 className="text-lg font-semibold mb-2">Tournaments</h4>
              <p className="text-gray-300 text-sm">Compete in thrilling tournaments for glory.</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
