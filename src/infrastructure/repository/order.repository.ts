import Order from "../../domain/checkout/entity/order";
import OrderItem from "../../domain/checkout/entity/orderItem";
import OrderRepositoryInterface from "../../domain/checkout/repository/order-repository.interface";
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
    return await OrderModel.findOne({ where: { id }, include: [{ model: OrderItemModel }] }).then((order) => {
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
    await OrderItemModel.destroy({ where: { order_id: item.id } });

    await OrderItemModel.bulkCreate(item.items.map((i) => {
      return {
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        product_id: i.productId,
        order_id: item.id,
      };
    }));

    await OrderModel.update({
      id: item.id,
      customer_id: item.customerId,
      total: item.total(),
      items: item.items.map((item) => {
        return {

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