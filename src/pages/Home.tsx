// src/pages/Home.tsx

import { motion } from 'framer-motion';
import { Button as MUIButton } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-white to-[#eaf1ff] text-gray-900 px-6 md:px-16 py-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Welcome to <span className="text-[#0070f3]">Workshoply</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Effortlessly manage, schedule, and book workshops with our intuitive system.
          Save time. Boost attendance. Deliver excellence.
        </p>

        <MUIButton
          variant="contained"
          size="large"
          endIcon={<ArrowForward />}
          sx={{
            bgcolor: '#0070f3',
            '&:hover': { bgcolor: '#005ecb' },
            fontWeight: 600,
            px: 4,
            borderRadius: '12px',
            textTransform: 'none',
          }}
        >
          <Link to={'/register'}>Get Started</Link>
        </MUIButton>
      </motion.section>

      {/* Features Section */}
      <section className="mt-24 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {[
          {
            title: 'Smart Scheduling',
            desc: 'Easily manage sessions, capacities, and time slots with powerful controls.',
            icon: '🗓️',
          },
          {
            title: 'Real-time Bookings',
            desc: 'Participants can view availability and book workshops instantly.',
            icon: '⚡',
          },
          {
            title: 'Analytics & Insights',
            desc: 'Gain insights into attendance, preferences, and engagement trends.',
            icon: '📊',
          },
        ].map(({ title, desc, icon }) => (
          <motion.div
            key={title}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-md p-6 text-left transition duration-300 border hover:border-[#0070f3]"
          >
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{desc}</p>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
