// backend/src/main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // --- DB check: runs on startup ---
  try {
    // Get the TypeORM DataSource instance that Nest created for us
    const ds = app.get(DataSource); // works when using TypeOrmModule.forRoot(...)
    if (!ds) {
      console.error('[DB CHECK] No DataSource instance found via DI');
    } else {
      console.log(
        '[DB CHECK] DataSource instance found. initialized=',
        ds.isInitialized,
      );
      // ds.isInitialized should be true if TypeORM connected
      if (!ds.isInitialized) {
        await ds.initialize();
        console.log('[DB CHECK] DataSource initialized by bootstrap.');
      }
      // List tables in public schema (Postgres)
      const rows = await ds.query(
        `SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY tablename;`,
      );
      const tables = rows.map((r: any) => r.tablename);
      console.log(
        '[DB CHECK] Public tables found:',
        tables.length ? tables.join(', ') : '<none>',
      );
    }
  } catch (err) {
    console.error('[DB CHECK] ERROR while checking DB:', err);
  }
  // --- end DB check ---

  const port = process.env.PORT ? Number(process.env.PORT) : 3001;
  await app.listen(port, '0.0.0.0');
  console.log(`Nest listening on http://0.0.0.0:${port}`);
}
bootstrap();
