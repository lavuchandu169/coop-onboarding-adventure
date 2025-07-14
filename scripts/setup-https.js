#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const certsDir = path.join(__dirname, '..', 'certs');

// Create certs directory if it doesn't exist
if (!fs.existsSync(certsDir)) {
  fs.mkdirSync(certsDir, { recursive: true });
}

const keyPath = path.join(certsDir, 'localhost-key.pem');
const certPath = path.join(certsDir, 'localhost.pem');

// Check if certificates already exist
if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
  console.log('✅ HTTPS certificates already exist!');
  process.exit(0);
}

try {
  console.log('🔧 Setting up HTTPS certificates for development...');
  
  // Check if mkcert is installed
  try {
    execSync('mkcert -version', { stdio: 'ignore' });
  } catch (error) {
    console.log('📦 Installing mkcert...');
    
    // Install mkcert based on the platform
    const platform = process.platform;
    if (platform === 'darwin') {
      execSync('brew install mkcert', { stdio: 'inherit' });
    } else if (platform === 'linux') {
      console.log('Please install mkcert manually:');
      console.log('Ubuntu/Debian: sudo apt install libnss3-tools && curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64" && chmod +x mkcert-v*-linux-amd64 && sudo cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert');
      console.log('Or visit: https://github.com/FiloSottile/mkcert#installation');
      process.exit(1);
    } else if (platform === 'win32') {
      console.log('Please install mkcert manually:');
      console.log('Using Chocolatey: choco install mkcert');
      console.log('Using Scoop: scoop bucket add extras && scoop install mkcert');
      console.log('Or visit: https://github.com/FiloSottile/mkcert#installation');
      process.exit(1);
    }
  }

  // Install the local CA
  console.log('🔐 Installing local Certificate Authority...');
  execSync('mkcert -install', { stdio: 'inherit' });

  // Generate certificates for localhost
  console.log('📜 Generating certificates for localhost...');
  execSync(`mkcert -key-file "${keyPath}" -cert-file "${certPath}" localhost 127.0.0.1 ::1`, { stdio: 'inherit' });

  console.log('✅ HTTPS certificates generated successfully!');
  console.log('🚀 You can now run your development server with trusted HTTPS');
  console.log('');
  console.log('Next steps:');
  console.log('1. Restart your development server');
  console.log('2. Visit https://localhost:8080');
  console.log('3. Your browser should now show a secure connection 🔒');

} catch (error) {
  console.error('❌ Failed to set up HTTPS certificates:', error.message);
  console.log('');
  console.log('Manual setup instructions:');
  console.log('1. Install mkcert: https://github.com/FiloSottile/mkcert#installation');
  console.log('2. Run: mkcert -install');
  console.log(`3. Run: mkcert -key-file "${keyPath}" -cert-file "${certPath}" localhost 127.0.0.1 ::1`);
  process.exit(1);
}