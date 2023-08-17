export interface Item {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

export interface oneItem{
    item : Item;
}

export interface InputData {
    name: string;
    price: number;
    quantity: number;
};

export interface UpdatecontextType{
    id: string;
    name: string;
    price: number | null;
    quantity: number | null;
    isUpdate: boolean;
}