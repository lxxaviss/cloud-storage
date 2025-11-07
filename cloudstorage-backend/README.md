# CloudStorage Backend API

A complete backend API for the CloudStorage application built with Node.js, Express, Prisma, and PostgreSQL.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with role-based access control
- 📁 **File Management** - Upload, download, delete files with storage limits
- 💳 **Payment Processing** - Stripe integration for subscription plans
- 👥 **User Management** - Profile management, password changes
- 🛡️ **Admin Panel** - User management, ban/unban, activity logs
- 📊 **Analytics** - Storage usage, file statistics
- 🔒 **Security** - Rate limiting, input validation, file type restrictions

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT
- **File Upload**: Multer with Sharp for image processing
- **Payments**: Stripe
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Stripe account (for payments)

### Installation

1. **Clone and setup**
   \`\`\`bash
   cd backend
   npm install
   \`\`\`

2. **Environment Setup**
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your configuration
   \`\`\`

3. **Database Setup**
   \`\`\`bash
   # Run migrations
   npm run db:migrate
   
   # Generate Prisma client
   npm run db:generate
   \`\`\`

4. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

### Using Docker

\`\`\`bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Files
- `GET /api/files` - Get user's files
- `POST /api/files/upload` - Upload files
- `GET /api/files/download/:fileId` - Download file
- `DELETE /api/files/:fileId` - Delete file
- `GET /api/files/stats` - Get storage statistics

### Payments
- `POST /api/payments/create-payment-intent` - Create payment intent
- `POST /api/payments/confirm-payment` - Confirm payment
- `GET /api/payments/history` - Get payment history
- `GET /api/payments/plans` - Get available plans

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/password` - Change password
- `DELETE /api/users/account` - Delete account

### Admin (Admin only)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/stats` - Get admin statistics
- `POST /api/admin/users/:userId/ban` - Ban/suspend user
- `POST /api/admin/users/:userId/unban` - Unban user
- `DELETE /api/admin/users/:userId` - Delete user
- `GET /api/admin/logs` - Get admin logs

## Configuration

### Environment Variables

\`\`\`env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/cloudstorage"

# JWT
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"

# Stripe
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# Server
PORT=5000
NODE_ENV="development"

# File Upload
UPLOAD_DIR="uploads"
MAX_FILE_SIZE=104857600
MAX_FILES_PER_USER_FREE=100
MAX_FILES_PER_USER_PREMIUM=10000
MAX_FILES_PER_USER_BUSINESS=100000
MAX_STORAGE_FREE=5368709120
MAX_STORAGE_PREMIUM=107374182400
MAX_STORAGE_BUSINESS=1099511627776
\`\`\`

### Storage Limits by Plan

| Plan | Storage | Files | Price |
|------|---------|-------|-------|
| Free | 5 GB | 100 files | $0 |
| Premium | 100 GB | 10,000 files | $9.99/month |
| Business | 1 TB | 100,000 files | $29.99/month |

## Database Schema

The application uses PostgreSQL with Prisma ORM. Key models:

- **User** - User accounts with authentication and plan info
- **File** - File metadata and storage information
- **Payment** - Stripe payment records
- **Session** - User session management
- **AdminLog** - Admin action logging

## Security Features

- **JWT Authentication** - Secure token-based auth
- **Rate Limiting** - Prevents API abuse
- **Input Validation** - Validates all user inputs
- **File Type Filtering** - Restricts dangerous file types
- **CORS Protection** - Configurable cross-origin requests
- **Helmet Security** - Security headers
- **Password Hashing** - bcrypt with salt rounds

## File Upload Features

- **Multiple File Upload** - Upload up to 10 files at once
- **File Type Validation** - Supports images, documents, videos, archives
- **Storage Limits** - Plan-based storage and file count limits
- **Image Processing** - Automatic thumbnail generation
- **Organized Storage** - User-specific directories
- **Download Tracking** - Track file download counts

## Payment Integration

- **Stripe Integration** - Secure payment processing
- **Webhook Support** - Real-time payment status updates
- **Payment History** - Track all user payments
- **Plan Upgrades** - Automatic plan activation after payment
- **Receipt Generation** - Downloadable payment receipts

## Admin Features

- **User Management** - View, ban, suspend, delete users
- **Activity Logging** - Track all admin actions
- **Statistics Dashboard** - System-wide analytics
- **Bulk Operations** - Manage multiple users
- **Search & Filter** - Find users quickly

## Development

### Database Migrations

\`\`\`bash
# Create new migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# View database
npx prisma studio
\`\`\`

### Testing

\`\`\`bash
# Run tests (when implemented)
npm test

# Run with coverage
npm run test:coverage
\`\`\`

### Production Deployment

1. **Environment Setup**
   \`\`\`bash
   NODE_ENV=production
   # Set production database URL
   # Set production Stripe keys
   \`\`\`

2. **Database Migration**
   \`\`\`bash
   npx prisma migrate deploy
   \`\`\`

3. **Start Production Server**
   \`\`\`bash
   npm start
   \`\`\`

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check PostgreSQL is running
   - Verify DATABASE_URL is correct
   - Ensure database exists

2. **File Upload Errors**
   - Check upload directory permissions
   - Verify file size limits
   - Check available disk space

3. **Stripe Webhook Issues**
   - Verify webhook endpoint URL
   - Check webhook secret
   - Ensure HTTPS in production

### Logs

\`\`\`bash
# View application logs
docker-compose logs -f backend

# View database logs
docker-compose logs -f postgres
\`\`\`

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## License

MIT License - see LICENSE file for details
\`\`\`

Теперь у вас есть полноценная серверная часть! 🚀

**Что включено:**

✅ **Backend API** - Express.js сервер с полным REST API
✅ **База данных** - PostgreSQL с Prisma ORM
✅ **Аутентификация** - JWT токены с ролями
✅ **Загрузка файлов** - Multer + Sharp для обработки
✅ **Платежи** - Stripe интеграция
✅ **Админ панель** - Управление пользователями
✅ **Безопасность** - Rate limiting, валидация, CORS
✅ **Docker** - Готовая конфигурация для развертывания

**Следующие шаги:**

1. **Установка зависимостей:**
   \`\`\`bash
   cd backend
   npm install
   \`\`\`

2. **Настройка базы данных:**
   \`\`\`bash
   # Запуск PostgreSQL через Docker
   docker-compose up postgres -d
   
   # Миграции
   npm run db:migrate
   \`\`\`

3. **Настройка .env файла** с вашими ключами Stripe

4. **Запуск сервера:**
   \`\`\`bash
   npm run dev
   \`\`\`

Хотите, чтобы я также обновил frontend React приложение для подключения к этому API?
