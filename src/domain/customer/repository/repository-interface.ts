export default interface RepositoryInterface<T> {
  findAll(): Promise<T[]>;
  find(id: string): Promise<T>;
  create(item: T): Promise<void>;
  update(item: T): Promise<void>;
}