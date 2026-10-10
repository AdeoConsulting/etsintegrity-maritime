import path from 'node:path'
import { fileURLToPath } from 'node:url'

const assetsRoot = path.resolve(fileURLToPath(import.meta.url), '../dist/')

export default {
  enable: true,
  production: {
    host: process.env.FTP_HOST,
    port: process.env.FTP_PORT,                    // 22 si SFTP
    username: process.env.FTP_USER,
    password: process.env.FTP_PASS,
    remotePath: '/',
    localPath: assetsRoot,
    cleanFiles: true,            // vide le dossier distant avant upload
    concurrency: 5,
    log: { info: true, progress: true, error: true },
  },
}