import Product from "../entity/product";
import RepositoryInterface from "../../customer/repository/repository-interface";

export default interface ProductRepositoryInterface extends RepositoryInterface<Product> {}