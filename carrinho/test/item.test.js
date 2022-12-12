/* eslint-disable no-undef */
import Item from '../item';

describe('Testes dos itens', () => {
	it('Deve ter 3 campos', () => {
		const item = new Item('teste', 2.5, 10);

		expect(item.nome).toBe('teste');
	});

	it('Deve ter o preço calculado de acordo com a quantidade', () => {
		const item = new Item('teste', 0.3, 10);

		expect(item.pegaValorTotalItem()).toBe(3);
	});
});
