import { Shirt } from "./shirt";

export interface Session {
  customer: { name: string };
  shirt: Pick<Shirt, 'name' | 'imageUrl'>;
}