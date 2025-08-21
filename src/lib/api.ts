export type Artisan = {
  Nom: string;
  Spécialité: string;
  Note: number;
  Ville: string;
  A_propos: string;
  Email: string;
  Site_Web: string | null;
  Catégorie: string;
  Top: 0 | 1 | boolean;
};

export async function fetchArtisans(): Promise<Artisan[]> {
  const res = await fetch('/api/artisans');
  if (!res.ok) throw new Error('Failed to load artisans');
  return res.json();
}

export async function fetchArtisan(nom: string): Promise<Artisan> {
  const res = await fetch(`/api/artisans/${encodeURIComponent(nom)}`);
  if (!res.ok) throw new Error('Not found');
  return res.json();
}
