import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Grid3X3, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterSidebar } from '@/components/product/FilterSidebar';
import { ProductGrid } from '@/components/product/ProductGrid';
import { products } from '@/data/mockData';

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [filters, setFilters] = useState<{
    category: string[];
    brand: string[];
    type: string[];
    capacity: string[];
    priceRange: [number, number];
    quality: string[];
  }>({
    category: categoryParam ? [categoryParam] : [],
    brand: [],
    type: [],
    capacity: [],
    priceRange: [0, 1000],
    quality: [],
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.model.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.category.length > 0) {
      result = result.filter((p) => filters.category.includes(p.category));
    }

    if (filters.brand.length > 0) {
      result = result.filter((p) => filters.brand.includes(p.brand));
    }

    if (filters.type.length > 0) {
      result = result.filter((p) => filters.type.includes(p.type));
    }

    if (filters.capacity.length > 0) {
      result = result.filter((p) => filters.capacity.includes(p.capacity));
    }

    if (filters.quality.length > 0) {
      result = result.filter((p) =>
        p.quality ? filters.quality.includes(p.quality) : false
      );
    }

    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'popular':
        result.sort((a, b) => b.views - a.views);
        break;
    }

    return result;
  }, [filters, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">芯片市场</h1>
          <p className="text-gray-400">
            共 {filteredProducts.length} 个商品符合条件
          </p>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              type="text"
              placeholder="搜索商品名称、型号、品牌..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1a1a2e] border-white/10 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="flex gap-2">
            <FilterSidebar filters={filters} onFilterChange={setFilters} />

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-[#1a1a2e] border-white/10 text-white">
                <SelectValue placeholder="排序方式" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a2e] border-white/10 text-white">
                <SelectItem value="newest">最新发布</SelectItem>
                <SelectItem value="price-asc">价格从低到高</SelectItem>
                <SelectItem value="price-desc">价格从高到低</SelectItem>
                <SelectItem value="popular">最受欢迎</SelectItem>
              </SelectContent>
            </Select>

            <div className="hidden sm:flex border border-white/10 rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode('grid')}
                className={`rounded-none ${
                  viewMode === 'grid'
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode('list')}
                className={`rounded-none ${
                  viewMode === 'list'
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <FilterSidebar filters={filters} onFilterChange={setFilters} />

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
