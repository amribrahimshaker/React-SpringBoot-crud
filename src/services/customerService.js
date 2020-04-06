import http from "./httpService";
import { apiUrl } from "../config.json";

// const apiEndpoint = apiUrl + "/customer";
const apiEndpoint = "/customer";

function customerUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getCustomers() {
  return http.get(apiEndpoint + "/list");
}

export function getCustomer(customerId) {
  return http.get(customerUrl(customerId));
}

export function saveCustomer(customer) {
  // if (customer.id) {
  //   const body = { ...customer };
  //   delete body._id;
  //   return http.put(movieUrl(customer._id), body);
  // }
  const body = { ...customer };
  return http.post(apiEndpoint + "/save", body);
}

export function deleteCustomer(customerId) {
  return http.delete(customerUrl(customerId));
}
