import { app, sequelize } from '../express';
import request from 'supertest';

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const response = await request(app)
      .post('/product')
      .send({
        type: 'a',
        name: 'Peoduct 1',
        price: 10,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'Peoduct 1',
      price: 10,
    });
  });

  it('should throw an error when product has invalid data', async () => {
    const response = await request(app)
      .post('/product')
      .send({
        type: 'a',
        name: 'Peoduct 1',
        price: -10,
      });

    expect(response.status).toBe(500);
  });

  it('should list all products', async () => {
    const product1 = {
      name: 'Peoduct 1',
      price: 10,
    }

    const product2 = {
      name: 'Peoduct 2',
      price: 15,
    }

     await request(app)
      .post('/product')
      .send({
        type: 'a',
        ...product1,
      });

      await request(app)
      .post('/product')
      .send({
        type: 'b',
        ...product2,
      });

    const response = await request(app).get('/product').send();

    expect(response.status).toBe(200);
    expect(response.body.products).toHaveLength(2);
    expect(response.body.products[0]).toEqual({
      id: expect.any(String),
      ...product1,
    });

    expect(response.body.products[1]).toEqual({
      id: expect.any(String),
      name: product2.name,
      price: product2.price * 2,
    });
  });

});