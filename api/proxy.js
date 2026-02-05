export default async function handler(request, response) {
  const { endpoint } = request.query;
  const base = process.env.BACKEND_URL || "https://rdsmahato.my.id";
  const backendUrl = `${base}/api${endpoint}`;

  try {
    const apiRes = await fetch(backendUrl);
    const data = await apiRes.json();

    // Cache selama 1 jam (3600 detik)
    response.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600');
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: 'Gagal mengambil data' });
  }
}
