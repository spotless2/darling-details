import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import { setupVite, serveStatic, log } from "./vite";
import routes from './routes';
import { sequelize } from './models';
import { setupAuth } from './auth';

const app = express();

// Enable compression
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add cache control headers
app.use((req, res, next) => {
  // Set caching headers for static assets
  if (req.url.match(/\.(css|js|jpg|jpeg|png|gif|ico|woff2)$/)) {
    res.set('Cache-Control', 'public, max-age=31536000'); // 1 year
  } else {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
  next();
});

// Setup authentication
setupAuth(app);

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// API Routes
app.use('/api', routes);

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
});

(async () => {
  try {
    // Sync database
    await sequelize.sync();
    log('Database synced successfully');

    if (app.get("env") === "development") {
      await setupVite(app);
    } else {
      serveStatic(app);
    }

    // ALWAYS serve the app on port 5000
    const PORT = 5000;
    app.listen(PORT, "0.0.0.0", () => {
      log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();