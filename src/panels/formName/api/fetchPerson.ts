export async function fetchPerson(name: string) {
  return fetch(`https://api.agify.io/?name=${name}`).then((res) => res.json());
}
