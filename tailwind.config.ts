import type { Config } from 'tailwindcss'

const config: Config = {
  // ĐÂY LÀ PHẦN THAY ĐỔI QUAN TRỌNG
  // Chúng ta cần đảm bảo Tailwind quét tất cả các file trong thư mục 'src'
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config