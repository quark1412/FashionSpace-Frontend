import instance from "../services/axiosConfig";
import Cookies from "js-cookie";

// Memento Pattern Classes

// Memento: Stores the internal state of the Originator
export class ShoppingCartMemento {
  constructor(state) {
    this.state = JSON.parse(JSON.stringify(state)); // Deep copy to ensure immutability
  }

  getState() {
    return this.state;
  }
}

// Originator: Creates a memento containing a snapshot of its current internal state
// and uses the memento to restore its internal state
export class ShoppingCartOriginator {
  constructor() {
    this.state = [];
  }

  setState(state) {
    this.state = state;
  }

  items() {
    return this.state;
  }

  save() {
    return new ShoppingCartMemento(this.state);
  }

  restore(memento) {
    this.state = memento.getState();
  }
}

// Caretaker: Responsible for the memento's safekeeping
export class ShoppingCartCaretaker {
  constructor(originator) {
    this.originator = originator;
    this.history = [];
  }

  backup() {
    console.log("Caretaker: Saving Originator's state...");
    this.history.push(this.originator.save());
  }

  undo() {
    if (!this.history.length) return null;

    const memento = this.history.pop();
    console.log("Caretaker: Restoring state to:", memento.getState());

    this.originator.restore(memento);
    return this.originator.items();
  }

  hasHistory() {
    return this.history.length > 0;
  }
}

// Existing API functions
export const getShoppingCartByUserId = async () => {
  try {
    const response = await instance.get("/shoppingCart", {
      requiresAuth: true,
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getShoppingCartById = async (id) => {
  try {
    const response = await instance.get(`/shoppingCart/${id}`, {
      requiresAuth: true,
    });
  } catch (error) {
    throw error;
  }
};

export const createShoppingCart = async (productVariantId, quantity) => {
  try {
    const response = await instance.post(
      "/shoppingCart",
      {
        productVariantId: productVariantId,
        quantity: quantity,
      },
      { requiresAuth: true }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateShoppingCartQuantityById = async (id, quantity) => {
  try {
    const response = await instance.put(
      `/shoppingCart/${id}`,
      {
        quantity: quantity,
      },
      {
        requiresAuth: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteShoppingCartById = async (id) => {
  try {
    const response = await instance.delete(`/shoppingCart/${id}`, {
      requiresAuth: true,
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
