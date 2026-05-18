const envelope = (success, data, meta, error) => ({
  success,
  data: data ?? null,
  meta: meta ?? null,
  error: error ?? null,
});

const ok = (res, data, meta = null, status = 200) =>
  res.status(status).json(envelope(true, data, meta, null));

const created = (res, data, location = null) => {
  if (location) {
    res.set('Location', location);
  }
  return res.status(201).json(envelope(true, data, null, null));
};

const fail = (res, status, code, message, details = []) =>
  res.status(status).json(
    envelope(false, null, null, {
      code,
      message,
      details,
    })
  );

const noContent = (res) => res.status(204).send();

module.exports = {
  envelope,
  ok,
  created,
  fail,
  noContent,
};
