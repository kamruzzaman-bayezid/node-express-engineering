import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, readProduct } from "../services/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

export const productsController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const products = readProduct();
  const id = req?.url?.split("/") ? Number(req?.url?.split("/")[2]) : null;

  // Read products
  if (req?.url === "/products" && req?.method === "GET") {
    try {
      return sendResponse(
        res,
        200,
        true,
        "Products retrieved successfully!",
        products,
      );
    } catch (error) {
      return sendResponse(res, 404, false, "Something went wrong!", error);
    }
  }

  // get products by id
  else if (req?.method === "GET" && id !== null) {
    const product = products?.find((product: IProduct) => product?.id === id);
    try {
      return sendResponse(
        res,
        200,
        true,
        "Product retrieve successfully!",
        product,
      );
    } catch (error) {
      return sendResponse(res, 404, false, "Something went wrong!", error);
    }
  }

  // create products
  else if (req.method === "POST" && req.url === "/products") {
    const products = readProduct();

    const body = await parseBody(req);

    const newProduct = {
      id: Date.now(),
      ...body,
    };

    products.push(newProduct);

    createProduct(products);

    try {
      return sendResponse(
        res,
        200,
        true,
        "Data retrieved successfully!!",
        products,
      );
    } catch (error) {
      return sendResponse(res, 404, false, "Something went wrong!", error);
    }
  }

  // update products
  else if (req?.method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const products = readProduct();

    const index = products?.findIndex((p: IProduct) => p.id === id);
    if (index < 0) {
      return sendResponse(res, 404, false, "Product Not Found");
    }

    products[index] = {
      id: products[index].id,
      ...body,
    };

    createProduct(products);

    try {
      return sendResponse(
        res,
        200,
        true,
        "Product updated successfully!!",
        products[index],
      );
    } catch (error) {
      return sendResponse(res, 404, false, "Something went wrong!", error);
    }
  }

  // delete products
  else if (req.method === "DELETE" && id !== null) {
    const products = readProduct();

    const index = products?.findIndex((p: IProduct) => p.id === id);
    if (index < 0) {
      return sendResponse(res, 404, false, "Product Not Found");
    }

    products.splice(index, 1);
    createProduct(products);

    try {
      return sendResponse(res, 200, true, "Product deleted successfully!!");
    } catch (error) {
      return sendResponse(res, 404, false, "Something went wrong!", error);
    }
  }
};
