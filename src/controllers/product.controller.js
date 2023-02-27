const { Product, Size, Category, Color, Brand, ShoeLast } = require("../database/models");
const { getPagination, getPagingData } = require("../helpers/pagination")

const productList = async (req, res) => {
    try {
        const category = req.query.category?.split(",");
        const color = req.query.color?.split(",");
        const brand = req.query.brand?.split(",");
        const size = req.query.size?.split(",");

        let whereColorStatement = {};
        let whereCategoryStatement = {};
        let whereBrandStatement = {};
        let whereSizeStatement = {};

        if (color)
            whereColorStatement.colorName = color;
        if (category)
            whereCategoryStatement.name = category;
        if (brand)
            whereBrandStatement.name = brand;
        if (size)
            whereSizeStatement.sizeNumberAr = size;

        const page = req.query.page ? req.query.page : "0";
        const items = req.query.items ? req.query.items : "5";
        const { limit, offset } = getPagination(page, items);

        const response = await Product.findAndCountAll({
            distinct: true,
            attributes: ["id", "name", "description", "price", "quantityInStock", "createdAt"],
            include: [
                {
                    association: "ProductImgs",
                    attributes: ["imgUrl"],
                },
                {
                    association: "Size",
                    attributes: ["id", "sizeNumberAr"],
                    through: {
                        attributes: []
                    },
                    where: whereSizeStatement
                },
                {
                    association: "Categories",
                    attributes: ["id", "name"],
                    through: {
                        attributes: []
                    },
                    where: whereCategoryStatement
                },
                {
                    association: "Colours",
                    attributes: ["id", "colorName", "colorValue"],
                    through: {
                        attributes: []
                    },
                    where: whereColorStatement
                },
                {
                    association: "Brand",
                    attributes: ["id", "name", "imgBrand"],
                    where: whereBrandStatement
                },
                {
                    association: "Last",
                    attributes: ["id", "nameShoelast"],
                    through: {
                        attributes: []
                    }
                },
            ],
            offset: parseInt(offset),
            limit: parseInt(limit),
        })

        const { count, rows } = response;

        const { totalPages, currentPage, nextPage, prevPage } = getPagingData(count, page, limit);

        res.status(200).json({
            count,
            totalPages,
            currentPage,
            nextPage,
            prevPage,
            products: rows
        })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

const productDetail = async (req, res, id) => {
    try {
        const idP = req.params.id || id;
        const product = await Product.findOne({
            where: { id: idP },
            attributes: ["id", "name", "description", "price", "quantityInStock", "createdAt"],
            include: [
                {
                    association: "ProductImgs",
                    attributes: ["id", "imgUrl"],
                },
                {
                    association: "Size",
                    attributes: ["id", "sizeNumberAr"],
                    through: {
                        attributes: []
                    },
                },
                {
                    association: "Categories",
                    attributes: ["id", "name"],
                    through: {
                        attributes: []
                    },
                },
                {
                    association: "Colours",
                    attributes: ["id", "colorName", "colorValue"],
                    through: {
                        attributes: []
                    },
                },
                {
                    association: "Brand",
                    attributes: ["id", "name", "imgBrand"],
                },
                {
                    association: "Last",
                    attributes: ["id", "nameShoelast"],
                    through: {
                        attributes: []
                    }
                },
            ],
        });
        res.status(200).json({ product });
    } catch (error) {
        res.status(400).json({ message: error.message })
    };
};

const saveProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            quantityInStock,
            price,
            pics,
            sizes,
            categoriesIds,
            colours,
            brandId,
            last
        } = req.body;

        let picsUrls = []

        pics.forEach((url) => {
            picsUrls.push({ status: "active", imgUrl: url })
        });

        const newProduct = await Product.create({
            name,
            description,
            quantityInStock,
            price,
            ProductImgs: picsUrls,
        }, {
            include: [
                { association: "ProductImgs" },
            ]
        });

        const size = await Size.findAll({
            where: {
                id: sizes
            }
        });
        const categories = await Category.findAll({
            where: {
                id: categoriesIds
            }
        });
        const coloursResult = await Color.findAll({
            where: {
                id: colours
            }
        });

        const shoeLastResult = await ShoeLast.findAll({
            where: {
                id: last
            }
        });

        const brand = await Brand.findOne({
            where: {
                id: brandId
            }
        });

        const prodSized = await newProduct.addSize(size)

        const prodCat = await newProduct.addCategories(categories)

        const prodCol = await newProduct.addColours(coloursResult)

        const prodLast = await newProduct.addLast(shoeLastResult)

        await newProduct.update(
            { BrandId: brand.dataValues.id },
            {
                where: {
                    id: newProduct.dataValues.id
                }
            }
        )

        productDetail(req, res, newProduct.dataValues.id)

    } catch (error) {
        res.status(400).json({ message: error.message })
    };
};

const updateProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const productToUpdate = await Product.findByPk(productId, {});

        if (productToUpdate !== null) {
            await productToUpdate.update({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                quantityInStock: req.body.quantityInStock
            });
            return res.status(200).json(productToUpdate)
        }

    } catch (error) {
        res.status(400).json({ errorMessage: "Product could't be saved" })
    }
};

const deleteProduct = async (req, res) => {

    const id = req.params.id;

    try {

        const prodToDelete = await Product.destroy({
            where: { id: id }
        });

        if (prodToDelete === 0) {
            throw new Error(`Product ID ${id} not found in database`)
        }

        return res.status(200).json({ success: `Product ID ${id} just deleted successfully` })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

module.exports = {
    productList,
    productDetail,
    saveProduct,
    updateProduct,
    deleteProduct
}