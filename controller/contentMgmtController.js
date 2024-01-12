const {contentModel}=require('../model/contentMgmtModel');

// exports.createContent=async (req,res)=>{
//     try {
//         const selectedOption=req.body.selectedOption;
//         const newContent=req.body.newContent;

//         const content=await contentMgmtController.findOneAndUpdate(
//             {option:selectedOption},
//             {content:newContent},
//             {new:true, upsert:true}
//         );
        
//         res.json({content:content.content});
//     } catch (error) {
//         res.status(500).json({error:'Internal Server Error'});
//     }
// };
exports.createContent = async (req, res) => {
    try {
      const query = {};
      query[req.query.contentHeading] = req.body.contentText
      console.log(query,"+++++++++++++++++++++");

      let contentC = await contentModel.findOneAndUpdate({}, query, {new: true});
      console.log(contentC.termsAndConditions,">>>>>>>>>>>>>>>>>");

      if (!contentC) {
        contentC = await contentModel.create(query)
      }
      res.status(200).json({
        message: "successfully created " + req.query.contentHeading,
        data: contentC
      });
    } catch (error) {
      res.status(403).error(error.message);
    }
}

exports.getContent = async (req, res) => {
    try {  
      const data = await contentModel.findOne({});
      res.json(data);

    //   return res.send(data[req.query.contentHeading])
  
    } catch (error) {
      res.status(403).error(error.message);
    }
}

// exports.getContent = async (req, res) => {
//     try {
//       const selectedOption = req.query.selectedOption;
  
//       const content = await contentMgmtController.findOne({ option: selectedOption });
  
//       if (content) {
//         res.json({ content: content.content });
//       } else {
//         res.json({ content: 'No content available for this option' });
//       }
//     } catch (error) {
//       console.error('Error fetching content:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };