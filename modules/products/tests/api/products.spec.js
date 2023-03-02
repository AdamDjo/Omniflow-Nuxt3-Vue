import schema from './schema.json';
import body from './payload.json';
import config from '../../config.json';
const headers = {};
var api = Cypress.env('env') == 'dev' ? Cypress.env('API_MOCK') : Cypress.env('API');
// var apiCommon = Cypress.env('env') == 'dev' ? Cypress.env('API_MOCK_COMMON') : Cypress.env('API_COMMON');

/* add products spec   */
describe(
  'api add products ' + config[Cypress.env('env') == 'dev' && config.envDev ? 'envDev' : 'env'].WS_PRODUCTS_ADD,
  () => {
    it('compare schema for products add', () => {
      body['title'] = 'key_' + Date.now();
      cy.request({
        method: 'POST',
        url: api + config[Cypress.env('env') == 'dev' && config.envDev ? 'envDev' : 'env'].WS_PRODUCTS_ADD,
        headers: headers,
        body: JSON.stringify(body),
      }).then(async (res) => {
        expect(res.status).equal(200);
        if (Object.keys(res.body).length > 0) {
          let test = cy.testapi.schemaValidate({ id: 123 }, res.body);
          expect(test.length).equal(0);
        }
      });
    });
  }
);

/* products list spec   */
describe(
  'api products list ' + config[Cypress.env('env') == 'dev' && config.envDev ? 'envDev' : 'env'].WS_PRODUCTS_LIST,
  () => {
    it('compare schema for products list', () => {
      cy.request({
        method: 'GET',
        url: api + config[Cypress.env('env') == 'dev' && config.envDev ? 'envDev' : 'env'].WS_PRODUCTS_LIST,
        headers: headers,
      }).then(async (res) => {
        expect(res.status).equal(200);
        if (Object.keys(res.body).length > 0) {
          let test = cy.testapi.schemaValidate(schema, res.body.products[0]);
          expect(test.length).equal(0, JSON.stringify(test));
        }
      });
    });
  }
);

/* products update spec   */
describe(
  'api update products ' + config[Cypress.env('env') == 'dev' && config.envDev ? 'envDev' : 'env'].WS_PRODUCTS_UPDATE,
  () => {
    it('compare schema for products update', () => {
      body['id'] = 1;
      cy.request({
        method: 'PUT',
        url: api + config[Cypress.env('env') == 'dev' && config.envDev ? 'envDev' : 'env'].WS_PRODUCTS_UPDATE + '/1',
        headers: headers,
        body: JSON.stringify(body),
      }).then(async (res) => {
        expect(res.status).equal(200);
        if (Object.keys(res.body).length > 0) {
          let testSchema = cy.testapi.schemaValidate(schema, res.body);
          expect(testSchema.length).equal(0, JSON.stringify(testSchema));
        }
      });
    });
  }
);

/* delete products   */
describe(
  'api delete products ' +
    config[Cypress.env('env') == 'dev' && config.envDev ? 'envDev' : 'env'].WS_PRODUCTS_DELETE +
    '/1',
  () => {
    it('delete products', () => {
      cy.request({
        method: 'DELETE',
        url: api + config[Cypress.env('env') == 'dev' && config.envDev ? 'envDev' : 'env'].WS_PRODUCTS_DELETE + '/1',
        headers: headers,
      }).then(async (res) => {
        expect(res.status).equal(200);
      });
    });
  }
);
