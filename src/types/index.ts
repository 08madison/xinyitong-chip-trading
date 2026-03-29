// 用户类型
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  type: 'individual' | 'company';
  companyName?: string;
  isVerified: boolean;
  createdAt: string;
}

// 商品类型
export interface Product {
  id: string;
  title: string;
  brand: string;
  model: string;
  category: 'raw' | 'refurbished';
  type: 'ddr3' | 'ddr4' | 'ddr5' | 'emmc' | 'ufs' | 'ssd' | 'other';
  capacity: string;
  quantity: number;
  price: number;
  unit: string;
  description: string;
  images: string[];
  video?: string;
  seller: Seller;
  status: 'available' | 'sold' | 'reserved';
  quality?: 'a' | 'b' | 'c';
  testReport?: boolean;
  createdAt: string;
  views: number;
}

// 卖家信息
export interface Seller {
  id: string;
  name: string;
  type: 'individual' | 'company';
  companyName?: string;
  avatar?: string;
  isVerified: boolean;
  location: string;
  rating: number;
  transactionCount: number;
  phone?: string;
  wechat?: string;
}

// 品牌
export interface Brand {
  id: string;
  name: string;
  logo?: string;
  country: string;
}

// 分类
export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
}

// 订单
export interface Order {
  id: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'completed' | 'cancelled';
  createdAt: string;
}

// 消息
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}

// 筛选条件
export interface FilterOptions {
  category?: string;
  brand?: string;
  type?: string;
  capacity?: string;
  priceMin?: number;
  priceMax?: number;
  quality?: string;
  location?: string;
}

// 平台统计数据
export interface PlatformStats {
  totalProducts: number;
  totalUsers: number;
  totalTransactions: number;
  totalBrands: number;
}
