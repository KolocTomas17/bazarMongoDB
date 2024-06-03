export const getAllCars = async () => {
  const req = await fetch("http://localhost:3000/cars", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const data = await req.json();
  return {
    status: req.status,
    msg: data.msg,
    payload: data.payload
  }
};

export const getCarById = async (id) => {
  const req = await fetch(`http://localhost:3000/cars/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const data = await req.json();
  return {
    status: req.status,
    msg: data.msg,
    payload: data.payload
  }
};

export const createCar = async (fomrData) => {
  const req = await fetch(`http://localhost:3000/cars`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(fomrData),
  });
  const data = await req.json();
  return {
    status: req.status,
    msg: data.msg,
    payload: data.payload
  }
};

export const updateCar = async (id, fomrData) => {
  const req = await fetch(`http://localhost:3000/cars/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(fomrData),
  });
  const data = await req.json();
  return {
    status: req.status,
    msg: data.msg,
    payload: data.payload
  }
};

export const deleteCar = async (id) => {
  const req = await fetch(`http://localhost:3000/cars/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
  const data = await req.json();
  return {
    status: req.status,
    msg: data.msg,
    payload: data.payload
  }
};
