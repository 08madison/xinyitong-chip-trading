import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle, Eye, Phone, MessageCircle } from 'lucide-react';
import type { Product } from '@/types';
import { VideoPlayer } from '@/components/common/VideoPlayer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ProductCardProps {
  product: Product;
}

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

const qualityLabels: Record<string, { label: string; color: string }> = {
  a: { label: 'A级', color: 'bg-green-500' },
  b: { label: 'B级', color: 'bg-yellow-500' },
  c: { label: 'C级', color: 'bg-orange-500' },
};

export function ProductCard({ product }: ProductCardProps) {
  const [showContact, setShowContact] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border border-white/10 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
    >
      {/* Media Section */}
      <div className="relative aspect-video bg-gray-900">
        {product.video ? (
          <VideoPlayer src={product.video} className="w-full h-full" />
        ) : (
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          <Badge className="bg-blue-500/80 text-white text-xs">
            {brandNames[product.brand] || product.brand}
          </Badge>
          <Badge className="bg-purple-500/80 text-white text-xs">
            {typeNames[product.type]}
          </Badge>
          {product.quality && (
            <Badge className={`${qualityLabels[product.quality].color} text-white text-xs`}>
              {qualityLabels[product.quality].label}
            </Badge>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute top-2 right-2">
          <Badge
            className={`text-xs ${
              product.category === 'raw'
                ? 'bg-orange-500/80'
                : 'bg-green-500/80'
            } text-white`}
          >
            {product.category === 'raw' ? '毛料' : '翻新'}
          </Badge>
        </div>

        {/* Test Report Badge */}
        {product.testReport && (
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-emerald-500/80 text-white text-xs flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              检测报告
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-white font-medium text-sm line-clamp-2 mb-2 min-h-[40px]">
          {product.title}
        </h3>

        {/* Specs */}
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            容量: <span className="text-white">{product.capacity}</span>
          </span>
          <span className="flex items-center gap-1">
            库存: <span className="text-white">{product.quantity}{product.unit}</span>
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-red-400 text-xs">¥</span>
          <span className="text-red-400 text-2xl font-bold font-mono">
            {product.price}
          </span>
          <span className="text-gray-500 text-xs">/{product.unit}</span>
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
              {product.seller.name[0]}
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-white flex items-center gap-1">
                {product.seller.name}
                {product.seller.isVerified && (
                  <CheckCircle className="w-3 h-3 text-blue-400" />
                )}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {product.seller.location}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Eye className="w-3 h-3" />
            {product.views}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Dialog open={showContact} onOpenChange={setShowContact}>
            <DialogTrigger asChild>
              <Button
                variant="default"
                size="sm"
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Phone className="w-4 h-4 mr-1" />
                联系卖家
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1a1a2e] border-white/10 text-white">
              <DialogHeader>
                <DialogTitle>联系卖家</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-lg font-bold">
                    {product.seller.name[0]}
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {product.seller.name}
                      {product.seller.isVerified && (
                        <Badge className="bg-blue-500 text-xs">已认证</Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-400">
                      {product.seller.companyName || '个体经营'}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400">电话</span>
                    <span className="font-mono">{product.seller.phone}</span>
                  </div>
                  {product.seller.wechat && (
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-gray-400">微信</span>
                      <span className="font-mono">{product.seller.wechat}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400">所在地</span>
                    <span>{product.seller.location}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-green-500 hover:bg-green-600">
                    <Phone className="w-4 h-4 mr-2" />
                    拨打电话
                  </Button>
                  <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    在线咨询
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/10"
          >
            详情
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
