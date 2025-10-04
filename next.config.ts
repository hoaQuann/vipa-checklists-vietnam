import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Thêm cấu hình webpack để giải quyết vấn đề với module 'fs'
  webpack: (config, { isServer }) => {
    // Chỉ áp dụng cho môi trường client
    if (!isServer) {
      // Báo cho webpack biết rằng module 'fs' không tồn tại ở client
      // và nên trả về một module trống thay vì báo lỗi.
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;