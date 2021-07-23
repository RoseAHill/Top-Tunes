import { Rec } from "../models/rec.js"

export {
  index,
}

function index(req, res) {
  Rec.find({})
  .then(recs => {
    res.render('recs/index', {
      title: 'Recommendations',
      recs,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}