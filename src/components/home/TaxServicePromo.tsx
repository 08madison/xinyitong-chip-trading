import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Receipt, 
  Calculator, 
  FileText, 
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const services = [
  {
    icon: Receipt,
    title: '反向开票',
    description: '资源回收企业向自然人出售者反向开具发票',
  },
  {
    icon: Calculator,
    title: '代办申报',
    description: '代办增值税、附加税费及个人所得税',
  },
  {
    icon: FileText,
    title: '发票管理',
    description: '发票开具、查询、统计一站式管理',
  },
  {
    icon: MessageSquare,
    title: '税务咨询',
    description: '专业税务顾问一对一解答',
  },
];

const benefits = [
  '符合国家税务总局2024年第5号公告要求',
  '专业团队全程代办，无需跑腿',
  '确保税务合规，降低税务风险',
  '月销售额10万以下免征增值税',
];

export function TaxServicePromo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 bg-[#0a0a0a]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-[#1a1a2e] rounded-3xl border border-blue-500/20 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Content */}
            <div className="p-8 lg:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
                  政策依据：国家税务总局2024年第5号公告
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  税务合规服务
                </h2>
                <p className="text-gray-400 text-lg mb-6">
                  专为二手存储芯片行业打造的一站式税务合规解决方案，
                  解决个人/个体户卖货不开票、企业买货无票据的合规难题
                </p>

                {/* Benefits */}
                <ul className="space-y-3 mb-8">
                  {benefits.map((benefit, index) => (
                    <li 
                      key={index}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-4">
                  <Link to="/tax-service">
                    <Button 
                      size="lg" 
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      了解详情
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    免费咨询
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Right Services Grid */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-[#1a1a2e]/50 to-transparent">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="grid grid-cols-2 gap-4"
              >
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/10 transition-all group"
                  >
                    <service.icon className="w-10 h-10 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {service.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
                className="mt-6 grid grid-cols-3 gap-4 text-center"
              >
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="text-2xl font-bold text-white">200+</div>
                  <div className="text-xs text-gray-400">服务企业</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="text-2xl font-bold text-white">5000+</div>
                  <div className="text-xs text-gray-400">开票笔数</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-xs text-gray-400">合规通过率</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
