import { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { brands, chipTypes, capacities } from '@/data/mockData';

interface FilterSidebarProps {
  filters: {
    category: string[];
    brand: string[];
    type: string[];
    capacity: string[];
    priceRange: [number, number];
    quality: string[];
  };
  onFilterChange: (filters: any) => void;
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

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    const newCategories = localFilters.category.includes(category)
      ? localFilters.category.filter((c) => c !== category)
      : [...localFilters.category, category];
    setLocalFilters({ ...localFilters, category: newCategories });
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = localFilters.brand.includes(brand)
      ? localFilters.brand.filter((b) => b !== brand)
      : [...localFilters.brand, brand];
    setLocalFilters({ ...localFilters, brand: newBrands });
  };

  const handleTypeChange = (type: string) => {
    const newTypes = localFilters.type.includes(type)
      ? localFilters.type.filter((t) => t !== type)
      : [...localFilters.type, type];
    setLocalFilters({ ...localFilters, type: newTypes });
  };

  const handleCapacityChange = (capacity: string) => {
    const newCapacities = localFilters.capacity.includes(capacity)
      ? localFilters.capacity.filter((c) => c !== capacity)
      : [...localFilters.capacity, capacity];
    setLocalFilters({ ...localFilters, capacity: newCapacities });
  };

  const handlePriceChange = (value: number[]) => {
    setLocalFilters({ ...localFilters, priceRange: [value[0], value[1]] });
  };

  const handleQualityChange = (quality: string) => {
    const newQualities = localFilters.quality.includes(quality)
      ? localFilters.quality.filter((q) => q !== quality)
      : [...localFilters.quality, quality];
    setLocalFilters({ ...localFilters, quality: newQualities });
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    const reset = {
      category: [],
      brand: [],
      type: [],
      capacity: [],
      priceRange: [0, 1000] as [number, number],
      quality: [],
    };
    setLocalFilters(reset);
    onFilterChange(reset);
  };

  const hasActiveFilters =
    localFilters.category.length > 0 ||
    localFilters.brand.length > 0 ||
    localFilters.type.length > 0 ||
    localFilters.capacity.length > 0 ||
    localFilters.quality.length > 0 ||
    localFilters.priceRange[0] > 0 ||
    localFilters.priceRange[1] < 1000;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h4 className="text-white font-medium mb-3">商品类型</h4>
        <div className="space-y-2">
          {[
            { id: 'raw', label: '毛料（原材料）' },
            { id: 'refurbished', label: '翻新芯片' },
          ].map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={localFilters.category.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="text-gray-300 text-sm cursor-pointer"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <h4 className="text-white font-medium mb-3">品牌</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={localFilters.brand.includes(brand.id)}
                onCheckedChange={() => handleBrandChange(brand.id)}
              />
              <Label
                htmlFor={`brand-${brand.id}`}
                className="text-gray-300 text-sm cursor-pointer"
              >
                {brandNames[brand.id] || brand.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <h4 className="text-white font-medium mb-3">芯片类型</h4>
        <div className="space-y-2">
          {chipTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type.id}`}
                checked={localFilters.type.includes(type.id)}
                onCheckedChange={() => handleTypeChange(type.id)}
              />
              <Label
                htmlFor={`type-${type.id}`}
                className="text-gray-300 text-sm cursor-pointer"
              >
                {typeNames[type.id] || type.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Capacity */}
      <div>
        <h4 className="text-white font-medium mb-3">容量</h4>
        <div className="flex flex-wrap gap-2">
          {capacities.map((capacity) => (
            <button
              key={capacity}
              onClick={() => handleCapacityChange(capacity)}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                localFilters.capacity.includes(capacity)
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {capacity}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-white font-medium mb-3">
          价格范围: ¥{localFilters.priceRange[0]} - ¥{localFilters.priceRange[1]}
        </h4>
        <Slider
          defaultValue={[0, 1000]}
          value={localFilters.priceRange}
          max={1000}
          step={10}
          onValueChange={handlePriceChange}
          className="w-full"
        />
      </div>

      {/* Quality */}
      <div>
        <h4 className="text-white font-medium mb-3">质量等级</h4>
        <div className="space-y-2">
          {[
            { id: 'a', label: 'A级 - 优质' },
            { id: 'b', label: 'B级 - 良好' },
            { id: 'c', label: 'C级 - 一般' },
          ].map((quality) => (
            <div key={quality.id} className="flex items-center space-x-2">
              <Checkbox
                id={`quality-${quality.id}`}
                checked={localFilters.quality.includes(quality.id)}
                onCheckedChange={() => handleQualityChange(quality.id)}
              />
              <Label
                htmlFor={`quality-${quality.id}`}
                className="text-gray-300 text-sm cursor-pointer"
              >
                {quality.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-white/10">
        <Button
          onClick={applyFilters}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
        >
          应用筛选
        </Button>
        {hasActiveFilters && (
          <Button
            onClick={resetFilters}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              筛选条件
            </h3>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                重置
              </button>
            )}
          </div>
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filter Button & Sheet */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              筛选
              {hasActiveFilters && (
                <span className="ml-2 w-5 h-5 rounded-full bg-blue-500 text-xs flex items-center justify-center">
                  {localFilters.category.length +
                    localFilters.brand.length +
                    localFilters.type.length +
                    localFilters.capacity.length +
                    localFilters.quality.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-80 bg-[#1a1a2e] border-white/10 text-white overflow-y-auto"
          >
            <SheetHeader>
              <SheetTitle className="text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                筛选条件
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
