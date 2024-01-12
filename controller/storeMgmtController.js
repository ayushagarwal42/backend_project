const store = require("../model/storeMgmtModel");
const categoryMgmtController = require('./categoryMgmtController');


exports.createStore = async (req, res) => {
    const { categoryId, name, description, link } = req.body;
    // console.log(">>", req.body);
    try {
        // Fetch non-blocked categories
        // const nonBlockedCategories = await categoryMgmtController.getAllCategory();

        // // Check if the provided categoryId corresponds to a non-blocked category
        // const isValidCategory = nonBlockedCategories.some(category => category._id.equals(categoryId));

        // if (!isValidCategory) {
        //     return res.status(400).json({ error: 'Invalid or blocked category selected.' });
        // }


        // Check if there are non-blocked categories
        // if (nonBlockedCategories.length === 0) {
        //     return res.status(400).json({ error: 'No non-blocked category found.' });
        // }

        // const categoryId = nonBlockedCategories[0]._id;

        const refData = {
            categoryId: categoryId,
            name: name,
            description: description,
            link: link,
            icon: req.file.filename,
        };
        console.log(refData);

        // if (!categoryId) {
        //     return res.status(400).json({ error: 'No non-blocked category found.' });
        // }

        const newStore = await store.create(refData);
        res.status(201).json(newStore);
    } catch (error) {
        console.error('Error creating store:', error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
};
exports.getStoreById = async (req, res) => {
    try {
        const getStore = await store.findById(req.params.id);
        if (!getStore) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.json(getStore);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateStore = async (req, res) => {
    try {
        const updatedStore = await store.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStore) {
            return res.status(404).json({ message: 'Store not found' })
        }
        res.json(updatedStore);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteStore = async (req, res) => {
    try {
        const deleteStore = await store.findByIdAndDelete(req.params.id);
        if (!deleteStore) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.json({ message: 'Store deleted Successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}