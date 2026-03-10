CREATE TABLE IF NOT EXISTS app_kv (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  expires_at INTEGER
);

CREATE INDEX IF NOT EXISTS idx_app_kv_expires_at ON app_kv (expires_at);

CREATE TABLE IF NOT EXISTS app_sets (
  set_key TEXT NOT NULL,
  member TEXT NOT NULL,
  PRIMARY KEY (set_key, member)
);

CREATE INDEX IF NOT EXISTS idx_app_sets_set_key ON app_sets (set_key);

