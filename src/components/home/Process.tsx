import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Upload, MessageCircle, FileCheck, Truck, Star } from 'lucide-react';
import { processSteps } from '@/data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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
  Upload,
  MessageCircle,
  FileCheck,
  Truck,
  Star,
};

export function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 bg-[#0a0a0a]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm mb-4">
            交易流程
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            简单五步，轻松交易
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            清晰透明的交易流程，让您的每一笔交易都安心无忧
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative"
        >
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => {
              const Icon = iconMap[step.icon] || Upload;
              return (
                <motion.div
                  key={step.id}
                  variants={itemVariants}
                  className="relative"
                >
                  <div className="text-center">
                    {/* Step Number & Icon */}
                    <div className="relative inline-block mb-6">
                      {/* Glow */}
                      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl" />
                      
                      {/* Circle */}
                      <div className="relative w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-blue-500/30 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-blue-400" />
                      </div>

                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                        {step.id}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow - Mobile/Tablet */}
                  {index < processSteps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-4">
                      <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500/50 to-transparent" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">
            已有 <span className="text-white font-bold">500+</span> 家企业入驻平台
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-white font-medium">免费发布</span>
            </div>
            <div className="px-6 py-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-white font-medium">快速成交</span>
            </div>
            <div className="px-6 py-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-white font-medium">安全保障</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
