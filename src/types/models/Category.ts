import { CategoryType } from '../enums';

export interface Category {
  category_id: number;
  name: string;
  type: CategoryType;
  icon?: string;
  color_hex?: string;
  description?: string;
}