import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, Package, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ParticleBackground } from '@/components/common/ParticleBackground';
import { platformStats } from '@/data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
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

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-mono">
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f1a] to-[#0a0a0a]">
        <ParticleBackground />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      {/* Circuit Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              深圳领先的存储芯片交易平台
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            专业二手存储芯片
            <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              交易平台
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl"
          >
            连接毛料供应商、翻新加工商与贸易商，让每一颗芯片发挥最大价值。
            实名认证、质量保障、价格透明、交易便捷。
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link to="/products">
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8"
              >
                浏览芯片市场
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/publish">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8"
              >
                发布供应信息
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Package,
                value: platformStats.totalProducts,
                suffix: '+',
                label: '商品数量',
              },
              {
                icon: Users,
                value: platformStats.totalUsers,
                suffix: '+',
                label: '入驻企业',
              },
              {
                icon: TrendingUp,
                value: Math.floor(platformStats.totalTransactions / 10000),
                suffix: '万+',
                label: '月交易量',
              },
              {
                icon: Award,
                value: platformStats.totalBrands,
                suffix: '',
                label: '覆盖品牌',
              },
            ].map((stat, index) => (
              <div key={index} className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <stat.icon className="w-4 h-4 text-blue-400" />
                  <span className="text-2xl sm:text-3xl font-bold text-white">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </span>
                </div>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
