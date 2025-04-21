"use client";

import { motion } from "framer-motion";

export default function Events() {
  return (
    <motion.section
      id="events"
      className="min-h-screen px-6 py-12 bg-gray-100"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold text-center mb-6">Events Us</h2>
      <p className="max-w-3xl mx-auto text-lg text-center">私たちのNPOは〜</p>
    </motion.section>
  );
}
