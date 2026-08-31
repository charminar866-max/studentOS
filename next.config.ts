import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev uses a fresh dist dir so it never touches the corrupted
  // `.next_build/dev/types` FAT32 entry; production keeps `.next_build`.
  distDir: process.env.NODE_ENV === 'development' ? '.next_dev' : '.next_build',
};

export default nextConfig;
