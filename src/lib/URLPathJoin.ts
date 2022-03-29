export default (...args: string[]): string => args.map((p) => p.replace(/(^\/|\/$)/g, '')).join('/')
