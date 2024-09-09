export interface Country {
  id: number;
  name: string;
}

export interface Province {
  id: number;
  countryId: number;
  name: string;
}

export interface User {
  email: string;
  password: string;
  countryId: number;
  provinceId: number;
}
