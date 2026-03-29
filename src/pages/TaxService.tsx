import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Receipt, 
  Calculator, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  ArrowRight,
  Phone,
  Shield,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

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

// 服务项目数据
const services = [
  {
    id: 'reverse-invoice',
    icon: Receipt,
    title: '反向开票服务',
    description: '为资源回收企业提供向自然人出售者反向开具发票的全程服务',
    features: [
      '资质审核与申请指导',
      '发票额度申请协助',
      '在线反向开票操作',
      '红字发票处理',
    ],
    color: 'from-blue-500 to-blue-600',
    badge: '核心服务',
  },
  {
    id: 'tax-filing',
    icon: Calculator,
    title: '代办税费申报',
    description: '代办增值税、附加税费及个人所得税的申报缴纳',
    features: [
      '增值税及附加税费代办',
      '个人所得税预缴（0.5%）',
      '月度申报提醒',
      '汇算清缴协助',
    ],
    color: 'from-green-500 to-green-600',
    badge: '必备服务',
  },
  {
    id: 'tax-consulting',
    icon: MessageSquare,
    title: '税务咨询',
    description: '专业税务顾问一对一解答税务问题',
    features: [
      '政策解读与适用指导',
      '税务风险评估',
      '合规方案设计',
      '在线即时咨询',
    ],
    color: 'from-purple-500 to-purple-600',
    badge: '增值服务',
  },
  {
    id: 'invoice-mgmt',
    icon: FileText,
    title: '发票管理',
    description: '发票开具、查询、统计一站式管理',
    features: [
      '发票开具记录查询',
      '销售数据统计分析',
      '台账自动生成',
      '电子发票存档',
    ],
    color: 'from-orange-500 to-orange-600',
    badge: '便捷服务',
  },
];

// 政策要点
const policyHighlights = [
  {
    title: '反向开票资格',
    content: '资源回收企业需取得危险废物经营许可证、报废机动车回收拆解资质或再生资源回收经营者备案',
    icon: Shield,
  },
  {
    title: '销售额限制',
    content: '自然人连续12个月反向开票累计销售额不超过500万元',
    icon: TrendingUp,
  },
  {
    title: '税费优惠',
    content: '月销售额10万元以下免征增值税，3%征收率减按1%计算',
    icon: CheckCircle,
  },
  {
    title: '个税预缴',
    content: '按销售额的0.5%预缴经营所得个人所得税',
    icon: Calculator,
  },
];

// 服务流程
const serviceProcess = [
  {
    step: 1,
    title: '资质审核',
    description: '提交企业资质材料，我们协助审核反向开票资格',
  },
  {
    step: 2,
    title: '申请提交',
    description: '代您向税务机关提交反向开票申请表及相关证明',
  },
  {
    step: 3,
    title: '额度申请',
    description: '根据实际经营需要申请调整发票额度',
  },
  {
    step: 4,
    title: '开票服务',
    description: '审核通过后，即可在线进行反向开票操作',
  },
  {
    step: 5,
    title: '代办申报',
    description: '每月代办税费申报，确保合规纳税',
  },
];

// 常见问题
const faqs = [
  {
    question: '什么是反向开票？',
    answer: '反向开票是指资源回收企业向自然人报废产品出售者收购报废产品时，由资源回收企业向出售者开具发票。这与传统销售中由销售方开具发票的方向相反，因此称为"反向开票"。',
  },
  {
    question: '哪些企业可以申请反向开票？',
    answer: '从事资源回收业务的企业，包括：1）取得危险废物经营许可证的企业；2）取得报废机动车回收拆解企业资质认定证书的企业；3）完成再生资源回收经营者备案的企业。',
  },
  {
    question: '自然人出售者有什么限制？',
    answer: '自然人销售报废产品，连续12个月反向开票累计销售额不得超过500万元。超过500万元的，资源回收企业不得再向其反向开票，应引导其办理经营主体登记。',
  },
  {
    question: '反向开票涉及哪些税费？',
    answer: '主要涉及：1）增值税：小规模纳税人月销售额10万元以下免征，超过部分按1%征收；2）附加税费：按增值税额计算；3）个人所得税：按销售额的0.5%预缴经营所得个税。',
  },
  {
    question: '平台如何保障税务合规？',
    answer: '平台提供全程代办服务：1）协助资质审核与申请；2）在线反向开票操作；3）代办税费申报缴纳；4）建立完整收购台账；5）提供税务咨询与风险评估。',
  },
];

export function TaxService() {
  const [showConsultDialog, setShowConsultDialog] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
            国家税务总局2024年第5号公告
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            税务合规服务
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            专为二手存储芯片行业打造的一站式税务合规解决方案
            <br />
            <span className="text-blue-400">反向开票 · 代办申报 · 税务咨询</span>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => setShowConsultDialog(true)}
            >
              <Phone className="w-4 h-4 mr-2" />
              免费咨询
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
            >
              了解政策详情
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        {/* 服务统计 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { value: '200+', label: '服务企业', icon: Users },
            { value: '5000+', label: '反向开票笔数', icon: Receipt },
            { value: '98%', label: '合规通过率', icon: CheckCircle },
            { value: '24h', label: '响应时间', icon: Clock },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border border-white/10 p-6 text-center"
            >
              <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* 政策要点 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            反向开票政策要点
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {policyHighlights.map((item, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-white/10"
              >
                <CardContent className="p-6">
                  <item.icon className="w-10 h-10 text-blue-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400">{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* 服务项目 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            我们的服务
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Card
                key={service.id}
                className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-white/10 hover:border-blue-500/30 transition-all cursor-pointer group"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge className="bg-white/10 text-white">
                      {service.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-white mt-4">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center text-blue-400 text-sm group-hover:text-blue-300">
                    了解详情
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* 服务流程 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            服务流程
          </h2>
          <div className="relative">
            {/* 连接线 */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {serviceProcess.map((step) => (
                <div key={step.step} className="relative text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="text-white font-bold">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 常见问题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            常见问题
          </h2>
          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue={faqs[0].question} className="w-full">
              <TabsList className="w-full flex-wrap h-auto bg-[#1a1a2e] border border-white/10 mb-4">
                {faqs.map((faq, index) => (
                  <TabsTrigger
                    key={index}
                    value={faq.question}
                    className="flex-1 text-left data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
                  >
                    <span className="truncate">{faq.question}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              {faqs.map((faq, index) => (
                <TabsContent
                  key={index}
                  value={faq.question}
                  className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border border-white/10 p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </motion.div>

        {/* 联系我们 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20 p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            需要税务合规服务？
          </h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            我们的专业税务团队随时为您提供咨询服务，帮助企业实现税务合规，降低税务风险
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => setShowConsultDialog(true)}
            >
              <Phone className="w-4 h-4 mr-2" />
              预约咨询
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              在线咨询
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              400-888-8888
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              工作日 9:00-18:00
            </div>
          </div>
        </motion.div>

        {/* 咨询弹窗 */}
        <Dialog open={showConsultDialog} onOpenChange={setShowConsultDialog}>
          <DialogContent className="bg-[#1a1a2e] border-white/10 text-white max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl">预约税务咨询</DialogTitle>
              <DialogDescription className="text-gray-400">
                填写以下信息，我们的税务顾问将在24小时内与您联系
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">联系人</label>
                  <input 
                    type="text" 
                    placeholder="请输入姓名"
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">联系电话</label>
                  <input 
                    type="tel" 
                    placeholder="请输入手机号"
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder:text-gray-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">企业名称</label>
                <input 
                  type="text" 
                  placeholder="请输入企业名称（如有）"
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">咨询内容</label>
                <textarea 
                  rows={3}
                  placeholder="请简要描述您的税务问题或需求"
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder:text-gray-500 resize-none"
                />
              </div>
              <Button 
                className="w-full bg-blue-500 hover:bg-blue-600"
                onClick={() => {
                  setShowConsultDialog(false);
                  alert('预约成功！我们的税务顾问将在24小时内与您联系。');
                }}
              >
                提交预约
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
