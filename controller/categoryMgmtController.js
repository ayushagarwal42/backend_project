const categoryMgmt = require('../model/categoryMgmtModel')
const axios = require('axios');

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body
        const refData = {
            name: name,
            icon: req.file.filename,
        }

        let createCategory = await categoryMgmt.create(refData);
        res.status(201).json(createCategory);

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

exports.getCategory = async (req, res) => {
    try {
        const category = await categoryMgmt.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAllCategory = async (req, res) => {
    try {
        const category = await categoryMgmt.find({ status: true });
        res.json(category);
        // return category;
    } catch (error) {
        return res.status(500).json(
            {
                code: 500,
                error: error.message
            }
        );
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await categoryMgmt.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' })
        }
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const deleteCategory = await categoryMgmt.findByIdAndDelete(req.params.id);
        if (!deleteCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted Successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteAllCategory = async (req, res) => {
    try {
        const deleteAllCategory = await categoryMgmt.deleteMany({});
        if (deleteAllCategory.deletedCount > 0) {
            return res.status(200).json({ message: 'All Category deleted Successfully' });
        }
        else {
            return res.status(200).json({ message: 'no Category found to delete' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.changeStatus = [
    async (req, res) => {
        try {
            const find = await categoryMgmt.findById({ _id: req.body._id })
            if (find.status == true) {
                const updateStatus = await categoryMgmt.findByIdAndUpdate({ _id: req.body._id }, { status: false }, {
                    new: true,
                })
                if (updateStatus) {
                    return res.status(200).json({
                        data: updateStatus
                    })
                }

            }
            const update = await categoryMgmt.findByIdAndUpdate({ _id: req.body._id }, { status: true }, {
                new: true,
            })
            if (update) {
                return res.status(200).json({
                    data: update
                })
            }
        }
        catch (error) {
            return res.status(500).json({
                mess: error.message,
            })
        }

    }
]

// exports.getNonBlockedCategories = async () => {
//     try {
//         // Assuming you want to find categories with status set to true
//         const nonBlockedCategories = await categoryMgmt.find({ status: true });

//         return nonBlockedCategories;
//     } catch (error) {
//         throw new Error('Error fetching non-blocked categories: ' + error.message);
//     }
// };

// exports.getNonBlockedCategories = async () => {
//     try {
//         const response = await axios.get('http://localhost:5000/getAllCategory'); // Replace with your actual API URL
//         return response.data.filter(category => category.status ===true);
//     } catch (error) {
//         throw new Error('Error fetching non-blocked categories');
//     }
// };
