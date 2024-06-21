import { defineConfig } from 'tsup'
import { copyFileSync, mkdirSync, readdirSync, lstatSync, rmdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'

function copyFolderRecursiveSync(source, target) {
  if (!source || !target) {
    return
  }

  if (!lstatSync(source).isDirectory()) {
    return
  }

  if (!existsSync(target)) {
    mkdirSync(target, { recursive: true })
  }

  readdirSync(source).forEach((file) => {
    const currentSource = join(source, file)
    const currentTarget = join(target, file)

    if (lstatSync(currentSource).isDirectory()) {
      copyFolderRecursiveSync(currentSource, currentTarget)
    } else {
      copyFileSync(currentSource, currentTarget)
    }
  })
}

export const exportTsupConfig = () => {
  if (existsSync('dist')) rmdirSync('dist', { recursive: true })

  return defineConfig({
    entry: ['src/index.ts'],
    splitting: false,
    sourcemap: true,
    clean: true,
    dts: false,
    treeshake: true,
    shims: false,
    format: ['esm'],
    // format: ,
    minify: true, // 混淆压缩
    outExtension({ format }) {
      return {
        js: `.${format}.js`,
      }
    },
    // onSuccess: () => {
    //   copyFolderRecursiveSync('libs/types', 'dist/types')
    // },
  })
}
