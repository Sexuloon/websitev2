"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

function Bot() {
  const [isBotHovered, setIsBotHovered] = useState(false);
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { duration: 1.5, repeat: Infinity },
  };

  return (
    <div>
      <Link href="/bot/consult">
        <section>
          <motion.div
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-16 w-16 flex flex-col items-center justify-center text-center rounded-full z-10 right-4 bottom-4 fixed shadow-lg cursor-pointer text-white"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onHoverStart={() => setIsBotHovered(true)}
            onHoverEnd={() => setIsBotHovered(false)}
          >
            <motion.div animate={isBotHovered ? pulseAnimation : {}}>
              <MessageCircle size={28} />
            </motion.div>
            <motion.span
              className="text-xs font-medium mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Chat
            </motion.span>

            {/* Ripple Effect */}
            <motion.div
              className="absolute w-full h-full rounded-full bg-green-400 -z-10"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </section>
      </Link>
    </div>
  );
}

export default Bot;
