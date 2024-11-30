import { defineConfig } from 'tsup'
import fs from 'node:fs'

export default defineConfig((option) => {
  return {
    entry: ['src/index.ts'],
    outDir: 'dist/src',
    target: 'esnext',
    splitting: false,
    sourcemap: false,
    clean: true,
    dts: false,
    treeshake: true,
    shims: false,
    format: ['cjs'],
    minify: true,
    env: {
      NODE_ENV: option.env.NODE_ENV,
      createTime: new Date().toLocaleString('ch-ZH'),
    },
    plugins: [],
    onSuccess: () => {
      const filesToCopy = [
        { src: 'package.json', dest: 'dist/package.json' },
        { src: 'pnpm-lock.yaml', dest: 'dist/pnpm-lock.yaml' },
        { src: 'schema.prisma', dest: 'dist/schema.prisma' },
        // { src: '.env', dest: 'dist/.env' },
        // { src: '.env.dev', dest: 'dist/.env.dev' },
        { src: '.env.prod', dest: 'dist/.env.prod' },
        { src: '.env.test', dest: 'dist/.env.test' },
        { src: 'docker/.dockerignore', dest: 'dist/.dockerignore' },
        { src: 'docker/Dockerfile', dest: 'dist/Dockerfile' },
        { src: 'docker/ecosystem.config.js', dest: 'dist/ecosystem.config.js' },
      ]

      filesToCopy.forEach((file) => {
        fs.copyFileSync(file.src, file.dest)
        console.log(`%c [ Copy ${file.src} to ${file.dest} ]-29`, 'font-size:14px; background:#41b883; color:#ffffff;')
      })
    },
  }
})
