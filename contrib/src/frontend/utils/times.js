export default function (times, func) {
  const results = []
  for (let i = 0; i < times; i++) {
    results.push(func(i))
  }
  return results
}
