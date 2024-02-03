import Order from "../entity/order";
import RepositoryInterface from "../../customer/repository/repository-interface";

export default interface OrderRepositoryInterface extends RepositoryInterface<Order> {}