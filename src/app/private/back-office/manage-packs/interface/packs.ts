export const initialPackValues: IPackTypes = {
  packName: '',
  price: '',
  moduleIds: [],
  status: '',
};

type Module = { id: string };

export interface IPackTypes {
  packName: string;
  price: string;
  moduleIds: Module[];
  status: string;
}
