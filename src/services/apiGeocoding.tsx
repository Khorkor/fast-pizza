// services/apiGeocoding.ts
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface AddressData {
  locality?: string;
  city?: string;
  postcode?: string;
  countryName?: string;
}

export async function getAddress({
  latitude,
  longitude,
}: Coordinates): Promise<AddressData> {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
  );

  if (!res.ok) throw new Error("Failed getting address");

  return res.json();
}
