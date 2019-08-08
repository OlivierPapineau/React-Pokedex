export default function getLocalStorage() {
  const values = [];
  const keys = Object.keys(localStorage);

  for (const key of keys) {
    if (typeof key === "string" && key.startsWith("USER_")) {
      continue;
    }
    values.push(localStorage.getItem(key));
  }

  // let i = keys.length;

  // while (i--) {
  //   values.push(localStorage.getItem(keys[i]));
  // }

  return values;
}
