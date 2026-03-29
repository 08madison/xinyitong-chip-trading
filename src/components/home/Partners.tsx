import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { partnerLogos } from '@/data/mockData';

export function Partners() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Double the logos for seamless loop
  const allLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="py-16 bg-[#0a0a0a] overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm mb-4">
            合作伙伴
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            入驻企业
          </h2>
          <p className="text-gray-400">
            众多知名企业已加入芯易通平台
          </p>
        </motion.div>
      </div>

      {/* Scrolling Logos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

        {/* Scrolling Container */}
        <div className="flex animate-marquee">
          {allLogos.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 mx-8"
            >
              <div className="w-32 h-20 rounded-lg bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-white/10 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10">
                <span className="text-xl font-bold text-gray-400 hover:text-white transition-colors">
                  {partner.logo}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12"
      >
        <div className="flex flex-wrap justify-center gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-white mb-1">500+</div>
            <div className="text-sm text-gray-500">入驻企业</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">98%</div>
            <div className="text-sm text-gray-500">好评率</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">24h</div>
            <div className="text-sm text-gray-500">平均响应</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">7天</div>
            <div className="text-sm text-gray-500">无忧退换</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
