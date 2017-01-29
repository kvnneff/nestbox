SELECT * FROM farms
WHERE to_tsvector(name || ' ' || description) @@ plainto_tsquery($1);
