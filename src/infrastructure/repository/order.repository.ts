import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/orderItem";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async findAll(): Promise<Order[]> {
    return OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    }).then((orders) => {
      return orders.map((order) => {
        return new Order(
          order.id,
          order.customer_id,
          order.items.map((item) => new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity,
          )),
        );
      });
    });
  }

  async find(id: string): Promise<Order> {
    return await OrderModel.findOne({ where: { id } }).then((order) => {
      return new Order(
        order.id,
        order.customer_id,
        order.items.map((item) => new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity,
        )),
      );
    });
  }

  async update(item: Order): Promise<void> {
    await OrderModel.update({
      id: item.id,
      customer_id: item.customerId,
      total: item.total(),
      items: item.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          product_id: item.productId,
        };
      }),
    }, {
      where: {
        id: item.id,
      },
    });
  }

  async create(item: Order): Promise<void> {
    await OrderModel.create({
      id: item.id,
      customer_id: item.customerId,
      total: item.total(),
      items: item.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          product_id: item.productId,
        };
      }),
    }, {
      include: [{ model: OrderItemModel }],
    });
  }
}