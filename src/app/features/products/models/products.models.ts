export class Product {
    id?: number;
    title: string='';
    price:number=0;
    description: string='';
    category: string='';
    image: string='';
  }

  export enum ActionMode {
    view=1,
    edit=2,
    create=3
  }

