var express = require('express');
var Event = require('../models/Event');
var Remark = require('../models/Remark');
var router = express.Router();
let url = require('url');
var multer = require('multer');
var upload = multer();
let qs = require('querystring');
var arrTag = []
var unique = []


/* GET users listing. */
router.get('/',(req,res,next)=>{
  console.log(req.query)
  console.log(arrTag)
  arrTag = []
  unique = [];
  console.log(unique)
    Event.find({}, (err, events)=>{
      if(err) return next(err)
      res.render('events',{ events,unique})
    })

  
})
// creating new event
router.post('/', (req,res,next)=>{
  let eventData = req.body
  Event.create(eventData, (err, event)=>{
    if(err) return next(err)
    res.redirect('events')
  })
  })
// to the form page
router.get('/new',(req,res)=>{
  res.render('eventForm')
})
// sorting
router.get('/sort/', (req,res,next)=>{
  console.log(req.query)
  console.log(req.query.location)
  console.log(req.query.category)
  arrTag.push(req.query.location || req.query.date || req.query.category)
  unique = [...new Set(arrTag)].flat();
  console.log(unique)
    Event.find({}, (err, events)=>{
      if(err) return next(err)
      res.render('eventFilter',{ events,unique})
    })
})
// event details
router.get('/details/:id', (req,res,next)=>{
  var id = req.params.id
  console.log(req.params.id)
  Event.findById(id).populate('remarks').exec((err, event)=>{
    if(err) return next(err)
    res.render('eventDetails', {event})
  })
})
// creating a remark  
router.post('/:id/new',(req,res,next)=>{
  var id = req.params.id
  req.body.eventId = id
  Remark.create(req.body, (err,remark)=>{
    if(err) return next(err)
    Event.findByIdAndUpdate(id, {$push:{remarks:remark._id}}, (err, updatedEvent)=>{
      if(err) return next(err)
      res.redirect('/events/details/'+ id)
    })
    
  })
})
//edit event
router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;

  Event.findById(id, (err, event) => {
    if (err) return next(err);

    res.render('eventEditForm', { event });
  });
});

router.post('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  let data = req.body;
  
  
  Event.findByIdAndUpdate(id, data, (err, event) => {
    if (err) return next(err);

    res.redirect('/events/details/'+id);
  });
});
// deleting event
router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;

  Event.findByIdAndDelete(id, (err, deleted) => {
    if (err) return next(err);

    res.redirect('/events');
  });
});
// event likes
router.get('/:id/like/inc', (req, res, next) => {
  let id = req.params.id;

  Event.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, event) => {
    if (err) return next(err);
    res.redirect('/events/details/' + id);
  });
});

router.get('/:id/like/dec', (req, res, next) => {
  let id = req.params.id;

  Event.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, event) => {
    if (err) return next(err);
    res.redirect('/events/details/' + id);
  });
});
// remark likes

router.get('/details/events/remarks/inc/:id', function (req, res, next) {
  let remarksId = req.params.id;

  Remark.findByIdAndUpdate(remarksId, { $inc: { likes: 1 } }, (err, remark) => {
    if (err) return next(err);
    console.log(remark.eventId)
    res.redirect('/events/details/' + remark.eventId);
  });
});

router.get('/details/events/remarks/dec/:id', function (req, res, next) {
  let remarksId = req.params.id;

  Remark.findByIdAndUpdate(
    remarksId,
    { $inc: { likes: -1 } },
    (err, remark) => {
      if (err) return next(err);

      res.redirect('/events/details/' + remark.eventId);
    }
  );
});

module.exports = router;
