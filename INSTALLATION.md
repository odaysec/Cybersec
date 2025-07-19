# Installation Guide

## System Requirements

### Minimum Requirements
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space for dependencies
- **Operating System**: 
  - Windows 10/11
  - macOS 10.15 (Catalina) or later
  - Linux (Ubuntu 18.04+, CentOS 7+, or equivalent)

### Recommended Requirements
- **Node.js**: Version 20.0.0 or higher
- **npm**: Version 10.0.0 or higher
- **RAM**: 8GB or more
- **Storage**: 1GB free space
- **Browser**: Modern browser with JavaScript enabled
  - Chrome 90+
  - Firefox 88+
  - Safari 14+
  - Edge 90+

## Prerequisites

### 1. Install Node.js and npm

#### Windows
1. Download Node.js from [nodejs.org](https://nodejs.org/)
2. Run the installer and follow the setup wizard
3. Verify installation:
   ```cmd
   node --version
   npm --version
   ```

#### macOS
Using Homebrew (recommended):
```bash
brew install node
```

Or download from [nodejs.org](https://nodejs.org/)

#### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Linux (CentOS/RHEL)
```bash
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs
```

### 2. Verify Installation
```bash
node --version  # Should show v18.0.0 or higher
npm --version   # Should show 8.0.0 or higher
```

## Installation Methods

### Method 1: Clone from GitHub (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/odaysec/Cybersec.git
   cd Cybersec
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - The application should load automatically

### Method 2: Download ZIP

1. **Download the repository**
   - Go to [GitHub repository](https://github.com/odaysec/Cybersec)
   - Click "Code" → "Download ZIP"
   - Extract the ZIP file

2. **Navigate to project directory**
   ```bash
   cd Cybersec-main
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Method 3: Using npm (if published)

```bash
npx create-cybersec-app my-cybersec-tools
cd my-cybersec-tools
npm run dev
```

## Build for Production

### 1. Create Production Build
```bash
npm run build
```

### 2. Preview Production Build
```bash
npm run preview
```

### 3. Deploy Static Files
The built files will be in the `dist/` directory. You can deploy these to any static hosting service:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use GitHub Actions for deployment
- **Apache/Nginx**: Copy files to web server directory

## Development Setup

### 1. Install Development Dependencies
```bash
npm install --save-dev
```

### 2. Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### 3. Environment Configuration
Create a `.env` file in the root directory (optional):
```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=CyberSec Platform
```

## Troubleshooting

### Common Issues

#### 1. Node.js Version Issues
**Error**: `The engine "node" is incompatible with this module`

**Solution**:
```bash
# Check your Node.js version
node --version

# Update Node.js to version 18+ or use nvm
nvm install 20
nvm use 20
```

#### 2. Permission Issues (Linux/macOS)
**Error**: `EACCES: permission denied`

**Solution**:
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

#### 3. Port Already in Use
**Error**: `Port 5173 is already in use`

**Solution**:
```bash
# Kill process using the port
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

#### 4. Dependencies Installation Failed
**Error**: Various npm install errors

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

#### 5. Build Failures
**Error**: Build process fails

**Solution**:
```bash
# Check for TypeScript errors
npm run lint

# Clear build cache
rm -rf dist

# Rebuild
npm run build
```

### Performance Optimization

#### 1. Increase Node.js Memory Limit
```bash
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### 2. Use Faster Package Manager
```bash
# Install pnpm (faster alternative to npm)
npm install -g pnpm

# Use pnpm instead of npm
pnpm install
pnpm run dev
```

## Docker Installation (Optional)

### 1. Create Dockerfile
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview"]
```

### 2. Build and Run
```bash
# Build Docker image
docker build -t cybersec-platform .

# Run container
docker run -p 5173:5173 cybersec-platform
```

## Security Considerations

### 1. Keep Dependencies Updated
```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Audit for vulnerabilities
npm audit
npm audit fix
```

### 2. Environment Variables
- Never commit sensitive data to version control
- Use `.env` files for local development
- Use environment-specific configurations for production

### 3. HTTPS in Production
- Always use HTTPS in production environments
- Configure proper SSL certificates
- Use security headers


### System Information
To help with troubleshooting, please provide:
```bash
# System information
node --version
npm --version
npx envinfo --system --npmPackages react,react-dom,vite --binaries --browsers
```

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.
