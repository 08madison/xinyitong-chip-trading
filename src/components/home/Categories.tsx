import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, CheckCircle, ArrowRight } from 'lucide-react';
import { categories } from '@/data/mockData';

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
  Cpu,
  CheckCircle,
};

export function Categories() {
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
          <span className="inline-block px-4 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm mb-4">
            产品分类
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            选择您需要的芯片类型
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            我们提供毛料原材料和翻新芯片两大类别，满足不同客户的需求
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Cpu;
            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                <Link to={`/products?category=${category.id}`}>
                  <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-white/10 overflow-hidden transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-lg group-hover:shadow-blue-500/10">
                    {/* Glow Effect */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors" />

                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-colors">
                        <Icon className="w-8 h-8 text-blue-400" />
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {category.name}
                      </h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        {category.description}
                      </p>

                      {/* Stats & CTA */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-white">
                            {category.count.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500">个SKU</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors">
                          <span className="text-sm font-medium">浏览全部</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {[
            { label: '严格筛选', desc: '每颗芯片都经过检测' },
            { label: '品质分级', desc: 'A/B/C级清晰标注' },
            { label: '价格透明', desc: '市场行情实时更新' },
            { label: '售后保障', desc: '质量问题可退换' },
          ].map((feature, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-lg bg-white/5 border border-white/5"
            >
              <div className="text-white font-medium mb-1">{feature.label}</div>
              <div className="text-sm text-gray-500">{feature.desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
