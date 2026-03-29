import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, BadgeCheck, Eye, Zap } from 'lucide-react';
import { advantages } from '@/data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  BadgeCheck,
  Eye,
  Zap,
};

export function Advantages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f1a]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-green-500/10 text-green-400 text-sm mb-4">
            平台优势
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            为什么选择芯易通
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            我们致力于为用户提供安全、便捷、透明的交易环境
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {advantages.map((advantage) => {
            const Icon = iconMap[advantage.icon] || ShieldCheck;
            return (
              <motion.div
                key={advantage.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group text-center p-8 rounded-2xl bg-gradient-to-br from-[#1a1a2e]/50 to-[#16213e]/50 border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:from-blue-500/30 group-hover:to-purple-500/30 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-8 h-8 text-blue-400" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center gap-8"
        >
          {[
            '实名认证',
            '企业资质审核',
            '第三方检测',
            '交易担保',
            '隐私保护',
          ].map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-gray-400"
            >
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm">{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
