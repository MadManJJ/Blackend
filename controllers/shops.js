const Shop = require("../models/Shop");

// @desc Get one shop
// @route GET /api/v1/shops/:id
// @access Public
exports.getShop = async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.id).populate({
      path: "reservations",
      select: "date -shop -_id",
    });
    if (!shop) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({
      success: true,
      msg: "Get shops",
      data: shop,
    });
  } catch (err) {
    console.log(err.stack);
    res.status(400).json({ success: false });
  }
};

// @desc Get all shops
// @route GET /api/v1/shops/
// @access Public
exports.getShops = async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query }; // shallow copy ( if inside is an object it still gonna reference to the same address )
  console.log(reqQuery);

  // Field to exclude
  const removeField = ["select", "sort", "page", "limit"];

  // Loop over remove fields and delete them from query
  removeField.forEach((params) => delete reqQuery[params]); // we select and sort later
  console.log(reqQuery);

  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    // note : /(regex)/g and \b ensures it only replaces entire words (boundary)
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}` // match is the one that we found we then add $ to the front
  );
  // console.log(queryStr);
  query = Shop.find(JSON.parse(queryStr)).populate({
    path: "reservations",
    select: "date -shop -_id",
  });

  // Select
  if (req.query.select) {
    // if the query send 'select'
    const fields = req.query.select.split(",").join(" "); // using white space to partition
    console.log(fields);
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const total = await Shop.countDocuments();
    query = query.skip(startIndex).limit(limit);

    const shop = await query;
    // console.log(hospital);

    // Pagination result
    const pagination = {}; // have next and prev (give the next page and prev page)
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: shop.length,
      pagination,
      data: shop,
    });
  } catch (err) {
    console.log(err.stack);
    res.status(400).json({ success: false, msg: "Cannot get all Shops" });
  }
};

// @desc Create shop
// @route POST /api/v1/shops/
// @access Private
exports.createShop = async (req, res, next) => {
  try {
    const shop = await Shop.create(req.body);
    res.status(200).json({ success: true, msg: "Create shop", data: shop });
  } catch (err) {
    console.log(err.stack);
    res.status(400).json({ success: false });
  }
};

// @desc Update shop
// @route PUT /api/v1/shops/:id
// @access Private
exports.updateShop = async (req, res, next) => {
  try {
    const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!shop) {
      return res.status(404).json({ success: false });
    }

    res.status(200).json({ success: true, msg: "Update shop", data: shop });
  } catch (err) {
    console.log(err.stack);
    res.status(400).json({ success: false });
  }
};

// @desc Delete shop
// @route DELETE /api/v1/shops/:id
// @access Private
exports.deleteShop = async (req, res, next) => {
  res.status(200).json({ msg: "Shop deleted successfully" });
};
