import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Standalone output — tối ưu cho Docker.
   * Next.js sẽ tạo output folder tự chứa (self-contained),
   * không cần copy toàn bộ node_modules vào Docker image.
   */
  output: "standalone",
};

export default nextConfig;
