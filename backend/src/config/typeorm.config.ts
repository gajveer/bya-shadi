export default () => ({
  type: 'postgres',
  url:
    process.env.DATABASE_URL ||
    'postgres://postgres:postgres@db:5432/bya_shadi',
  synchronize: true,
});
