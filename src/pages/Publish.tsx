import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Video,
  Image,
  X,
  Info,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { brands, chipTypes, capacities } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const brandNames: Record<string, string> = {
  samsung: '三星',
  hynix: '海力士',
  micron: '美光',
  toshiba: '东芝',
  sandisk: '闪迪',
  intel: '英特尔',
  wd: '西部数据',
  kioxia: '铠侠',
};

const typeNames: Record<string, string> = {
  ddr3: 'DDR3',
  ddr4: 'DDR4',
  ddr5: 'DDR5',
  emmc: 'eMMC',
  ufs: 'UFS',
  ssd: 'SSD',
  other: '其他',
};

export function Publish() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    category: '',
    brand: '',
    type: '',
    model: '',
    capacity: '',
    quantity: '',
    price: '',
    unit: '颗',
    quality: '',
    description: '',
    hasTestReport: false,
    contactName: '',
    contactPhone: '',
    contactWechat: '',
  });

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Simulate image upload with URLs
      const newImages = Array.from(files).map(() =>
        `https://images.unsplash.com/photo-1518770660439-4636190af475?w=400`
      );
      setImages([...images, ...newImages].slice(0, 5));
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate video upload
      setVideo('https://example.com/video.mp4');
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const removeVideo = () => {
    setVideo(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">发布商品</h1>
          <p className="text-gray-400">
            填写以下信息，将您的芯片商品展示给更多买家
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Basic Info */}
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-400" />
              基本信息
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Category */}
              <div className="space-y-2">
                <Label className="text-white">商品类型 *</Label>
                <RadioGroup
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="raw" id="raw" />
                    <Label htmlFor="raw" className="text-gray-300 cursor-pointer">
                      毛料（原材料）
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="refurbished" id="refurbished" />
                    <Label
                      htmlFor="refurbished"
                      className="text-gray-300 cursor-pointer"
                    >
                      翻新芯片
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Brand */}
              <div className="space-y-2">
                <Label className="text-white">品牌 *</Label>
                <Select
                  value={formData.brand}
                  onValueChange={(value) =>
                    setFormData({ ...formData, brand: value })
                  }
                >
                  <SelectTrigger className="bg-[#0a0a0a] border-white/10 text-white">
                    <SelectValue placeholder="选择品牌" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brandNames[brand.id] || brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label className="text-white">芯片类型 *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger className="bg-[#0a0a0a] border-white/10 text-white">
                    <SelectValue placeholder="选择类型" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
                    {chipTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {typeNames[type.id] || type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Model */}
              <div className="space-y-2">
                <Label className="text-white">型号 *</Label>
                <Input
                  placeholder="例如：DDR4-2400"
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                  className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-500"
                />
              </div>

              {/* Capacity */}
              <div className="space-y-2">
                <Label className="text-white">容量 *</Label>
                <Select
                  value={formData.capacity}
                  onValueChange={(value) =>
                    setFormData({ ...formData, capacity: value })
                  }
                >
                  <SelectTrigger className="bg-[#0a0a0a] border-white/10 text-white">
                    <SelectValue placeholder="选择容量" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
                    {capacities.map((capacity) => (
                      <SelectItem key={capacity} value={capacity}>
                        {capacity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label className="text-white">库存数量 *</Label>
                <Input
                  type="number"
                  placeholder="请输入数量"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Price Info */}
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">价格信息</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Price */}
              <div className="space-y-2">
                <Label className="text-white">单价（元）*</Label>
                <Input
                  type="number"
                  placeholder="请输入价格"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-500"
                />
              </div>

              {/* Unit */}
              <div className="space-y-2">
                <Label className="text-white">计价单位 *</Label>
                <Select
                  value={formData.unit}
                  onValueChange={(value) =>
                    setFormData({ ...formData, unit: value })
                  }
                >
                  <SelectTrigger className="bg-[#0a0a0a] border-white/10 text-white">
                    <SelectValue placeholder="选择单位" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
                    <SelectItem value="颗">颗</SelectItem>
                    <SelectItem value="条">条</SelectItem>
                    <SelectItem value="片">片</SelectItem>
                    <SelectItem value="个">个</SelectItem>
                    <SelectItem value="批">批</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quality */}
              <div className="space-y-2">
                <Label className="text-white">质量等级</Label>
                <Select
                  value={formData.quality}
                  onValueChange={(value) =>
                    setFormData({ ...formData, quality: value })
                  }
                >
                  <SelectTrigger className="bg-[#0a0a0a] border-white/10 text-white">
                    <SelectValue placeholder="选择等级" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
                    <SelectItem value="a">A级 - 优质</SelectItem>
                    <SelectItem value="b">B级 - 良好</SelectItem>
                    <SelectItem value="c">C级 - 一般</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Test Report */}
            <div className="mt-6 flex items-center space-x-2">
              <Checkbox
                id="testReport"
                checked={formData.hasTestReport}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, hasTestReport: checked as boolean })
                }
              />
              <Label
                htmlFor="testReport"
                className="text-gray-300 cursor-pointer"
              >
                提供检测报告
              </Label>
            </div>
          </div>

          {/* Media Upload */}
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">图片/视频</h2>

            {/* Images */}
            <div className="space-y-4 mb-6">
              <Label className="text-white">商品图片（最多5张）</Label>
              <div className="flex flex-wrap gap-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 rounded-lg overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`商品图片 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ))}
                {images.length < 5 && (
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="w-24 h-24 rounded-lg border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-gray-400 hover:border-white/40 hover:text-gray-300 transition-colors"
                  >
                    <Image className="w-6 h-6 mb-1" />
                    <span className="text-xs">添加图片</span>
                  </button>
                )}
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Video */}
            <div className="space-y-4">
              <Label className="text-white">商品视频（可选）</Label>
              {video ? (
                <div className="relative w-40 h-24 rounded-lg bg-gray-800 flex items-center justify-center">
                  <Video className="w-8 h-8 text-gray-400" />
                  <button
                    type="button"
                    onClick={removeVideo}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => videoInputRef.current?.click()}
                  className="w-40 h-24 rounded-lg border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-gray-400 hover:border-white/40 hover:text-gray-300 transition-colors"
                >
                  <Video className="w-6 h-6 mb-1" />
                  <span className="text-xs">添加视频</span>
                </button>
              )}
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Description */}
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">商品描述</h2>
            <Textarea
              placeholder="请详细描述商品的来源、成色、测试情况等信息..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-500 min-h-[120px]"
            />
          </div>

          {/* Contact Info */}
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">联系方式</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-white">联系人 *</Label>
                <Input
                  placeholder="请输入联系人姓名"
                  value={formData.contactName}
                  onChange={(e) =>
                    setFormData({ ...formData, contactName: e.target.value })
                  }
                  className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">联系电话 *</Label>
                <Input
                  placeholder="请输入联系电话"
                  value={formData.contactPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPhone: e.target.value })
                  }
                  className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">微信号</Label>
                <Input
                  placeholder="请输入微信号（可选）"
                  value={formData.contactWechat}
                  onChange={(e) =>
                    setFormData({ ...formData, contactWechat: e.target.value })
                  }
                  className="bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white h-12"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  提交中...
                </span>
              ) : (
                '发布商品'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="border-white/20 text-white hover:bg-white/10 h-12 px-8"
            >
              取消
            </Button>
          </div>
        </motion.form>

        {/* Success Dialog */}
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="bg-[#1a1a2e] border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                发布成功
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                您的商品已提交审核，审核通过后将展示在平台上
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-4 mt-4">
              <Button
                onClick={() => navigate('/products')}
                className="flex-1 bg-blue-500 hover:bg-blue-600"
              >
                去浏览商品
              </Button>
              <Button
                onClick={() => {
                  setShowSuccess(false);
                  setFormData({
                    category: '',
                    brand: '',
                    type: '',
                    model: '',
                    capacity: '',
                    quantity: '',
                    price: '',
                    unit: '颗',
                    quality: '',
                    description: '',
                    hasTestReport: false,
                    contactName: '',
                    contactPhone: '',
                    contactWechat: '',
                  });
                  setImages([]);
                  setVideo(null);
                }}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                继续发布
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
