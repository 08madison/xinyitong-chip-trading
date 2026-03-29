import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from 'lucide-react';

const footerLinks = {
  about: {
    title: '关于我们',
    links: [
      { name: '平台介绍', href: '/about' },
      { name: '发展历程', href: '/about/history' },
      { name: '合作伙伴', href: '/about/partners' },
      { name: '联系我们', href: '/about/contact' },
    ],
  },
  help: {
    title: '帮助中心',
    links: [
      { name: '如何购买', href: '/help/buy' },
      { name: '如何出售', href: '/help/sell' },
      { name: '交易规则', href: '/help/rules' },
      { name: '常见问题', href: '/help/faq' },
    ],
  },
  service: {
    title: '服务支持',
    links: [
      { name: '税务合规服务', href: '/tax-service' },
      { name: '反向开票', href: '/tax-service#reverse-invoice' },
      { name: '质量保障', href: '/service/quality' },
      { name: '检测服务', href: '/service/inspect' },
    ],
  },
};

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">芯</span>
              </div>
              <span className="text-white font-bold text-xl">芯易通</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              专业的二手存储芯片交易平台，连接毛料供应商、翻新加工商与贸易商，让每一颗芯片发挥最大价值。
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>400-888-8888</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>service@xinyitong.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>深圳市福田区华强北路</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MessageCircle className="w-4 h-4 text-blue-400" />
                <span>微信公众号：芯易通平台</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2024 芯易通. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/terms"
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                服务条款
              </Link>
              <Link
                to="/privacy"
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                隐私政策
              </Link>
              <Link
                to="/icp"
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                粤ICP备xxxxxxxx号
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
