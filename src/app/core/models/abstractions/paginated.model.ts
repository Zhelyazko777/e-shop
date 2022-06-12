export interface Paginated<TModel> {
  items: TModel[];
  numberOfPages: number;
}
