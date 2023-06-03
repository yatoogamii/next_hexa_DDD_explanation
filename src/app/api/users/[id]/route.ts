export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  console.log("Dynamic route name");
  const id = params.id; // 1, 2, 3, ...
}
