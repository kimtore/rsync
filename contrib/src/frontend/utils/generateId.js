export default function () {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8)
}
