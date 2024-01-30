import { app, sequelize } from '../express';
import request from 'supertest';

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John Doe',
        address: {
          street: 'Main St.',
          number: 123,
          city: 'New York',
          zip: '10001',
        },
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'John Doe',
      address: {
        street: 'Main St.',
        number: 123,
        city: 'New York',
        zip: '10001',
      },
    });
  });

  it('should not create a customer with invalid data', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John Doe',
      });

    expect(response.status).toBe(500);
  });

  it('Should list all customers', async () => {
    const customer1 = {
      name: 'John Doe',
      address: {
        street: 'Main St.',
        number: 123,
        city: 'New York',
        zip: '10001',
      },
    }

    const customer2 = {
      name: 'Mary doll',
      address: {
        street: 'M St.',
        number: 321,
        city: 'Sao Paulo',
        zip: '100345',
      },
    }

     await request(app)
    .post('/customer')
    .send(customer1);

    await request(app)
    .post('/customer')
    .send(customer2);

    const listCustomers = await request(app).get('/customer').send();

    expect(listCustomers.status).toBe(200);
    expect(listCustomers.body.customers).toHaveLength(2);
    expect(listCustomers.body.customers).toEqual(
      expect.arrayContaining([
        expect.objectContaining(customer1),
        expect.objectContaining(customer2),
      ])
    );
  });
});