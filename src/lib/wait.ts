export async function wait(miliseconds = 500) {
  return new Promise<void>(resolve => setTimeout(resolve, miliseconds));
}
