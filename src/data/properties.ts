import * as z from 'zod';

const PropertySchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
});

export type Property = z.infer<typeof PropertySchema>;

export const properties = [
  {
    id: 1,
    name: 'Oriental House',
    image: 'https://images.unsplash.com/photo-1473200705267-319bfdc89671?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',    
    price: 25000
  },
  {
    id: 2,
    name: 'Beach House',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 35000
  },
  {
    id: 3,
    name: 'Modern House',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 40000
  },
  {
    id: 4,
    name: 'Apartment',
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1384&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 15000
  },
  {
    id: 5,
    name: 'Smart House',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 50000
  }
] satisfies Property[];