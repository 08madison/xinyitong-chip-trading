import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Phone, User, Building2, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

export function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: 'individual',
    name: '',
    companyName: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }

    setIsLoading(true);

    // Simulate register API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">芯</span>
            </div>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-white">创建账号</h2>
          <p className="mt-2 text-gray-400">加入芯易通，开始您的芯片交易</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-gray-500'
              }`}
            >
              1
            </div>
            <span className={`text-sm ${step >= 1 ? 'text-white' : 'text-gray-500'}`}>
              基本信息
            </span>
          </div>
          <div className="w-12 h-0.5 bg-white/10" />
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 2
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-gray-500'
              }`}
            >
              2
            </div>
            <span className={`text-sm ${step >= 2 ? 'text-white' : 'text-gray-500'}`}>
              验证完成
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl border border-white/10 p-8">
          {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Type */}
              <div className="space-y-2">
                <Label className="text-white">账号类型</Label>
                <RadioGroup
                  value={formData.userType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, userType: value })
                  }
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label
                      htmlFor="individual"
                      className="text-gray-300 cursor-pointer"
                    >
                      个人
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="company" id="company" />
                    <Label
                      htmlFor="company"
                      className="text-gray-300 cursor-pointer"
                    >
                      企业
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  {formData.userType === 'individual' ? '姓名' : '联系人姓名'}
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    id="name"
                    placeholder="请输入姓名"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="pl-10 bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Company Name */}
              {formData.userType === 'company' && (
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-white">
                    企业名称
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input
                      id="companyName"
                      placeholder="请输入企业名称"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({ ...formData, companyName: e.target.value })
                      }
                      className="pl-10 bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>
              )}

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">
                  手机号
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="请输入手机号"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="pl-10 bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  密码
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="请设置密码（6-20位）"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="pl-10 pr-10 bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  确认密码
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="请再次输入密码"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-500"
                />
              </div>

              {/* Terms */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, agreeTerms: checked as boolean })
                  }
                />
                <Label
                  htmlFor="terms"
                  className="text-sm text-gray-400 cursor-pointer"
                >
                  我已阅读并同意{' '}
                  <Link to="/terms" className="text-blue-400 hover:text-blue-300">
                    服务条款
                  </Link>{' '}
                  和{' '}
                  <Link to="/privacy" className="text-blue-400 hover:text-blue-300">
                    隐私政策
                  </Link>
                </Label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={
                  !formData.name ||
                  !formData.phone ||
                  !formData.password ||
                  !formData.confirmPassword ||
                  !formData.agreeTerms ||
                  (formData.userType === 'company' && !formData.companyName)
                }
                className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12"
              >
                <span className="flex items-center gap-2">
                  下一步
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  注册信息已提交
                </h3>
                <p className="text-gray-400">
                  我们已向您的手机 {formData.phone} 发送了验证码
                </p>
              </div>
              <div className="space-y-4">
                <Input
                  placeholder="请输入验证码"
                  className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-500 text-center text-2xl tracking-widest"
                  maxLength={6}
                />
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      注册中...
                    </span>
                  ) : (
                    '完成注册'
                  )}
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                没有收到验证码？{' '}
                <button className="text-blue-400 hover:text-blue-300">
                  重新发送
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-400">
          已有账号？{' '}
          <Link to="/login" className="text-blue-400 hover:text-blue-300">
            立即登录
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
