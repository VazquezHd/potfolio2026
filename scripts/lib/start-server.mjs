export function startServer(options, { port = 5173, strict = false, serve = Bun.serve } = {}) {
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT debe ser un número entero entre 1 y 65535.')
  }
  const lastPort = strict ? port : Math.min(port + 9, 65535)
  for (let candidate = port; candidate <= lastPort; candidate++) {
    try {
      return serve({ ...options, port: candidate })
    } catch (error) {
      if (error.code !== 'EADDRINUSE') throw error
      if (candidate === lastPort) {
        throw new Error(
          strict
            ? `El puerto ${port} está ocupado. Cierra el servidor anterior con Ctrl+C o elige otro con PORT=5174 bun run dev.`
            : `Los puertos ${port}–${lastPort} están ocupados. Elige otro con PORT=5200 bun run dev.`,
        )
      }
    }
  }
}
