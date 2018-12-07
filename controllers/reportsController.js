const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const {
  validate_user, validate_redflag, validate_comment, validate_location,
} = require('../middleware/reportsMiddleware');
const { users, AllRedflag } = require('../models/data');


class recordsController {
  homepage(req, res) {
    res.send({ status: 200, data: 'Welcome to the api_enpoints' });
  }

  getRedflags(req, res) {
    res.send({ status: 200, data: [{ AllRedflag }] });
  }

  createUser(req, res) {
    const result = validate_user(req.body);
    if (result.error) {
      return res.status(400).send({ status: 400, error: result.error.details[0].message });
    }

    const user = {
      id: users.length + 1,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      othernames: req.body.othernames,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      registered: Date(),
      username: req.body.username,
      isAdmin: false,
    };
    users.push(user);
    return res.send({ status: 200, data: [{ id: users.lenth, message: 'Created user account' }] });
  }

  getUsersInfo(req, res) {
    res.send({ status: 200, data: [{ users }] });
  }

  getSpecificUserPost(req, res) {
    const redflag = AllRedflag.filter(c => (c.createdBy === parseInt(req.params.createdBy, 10)));
  		if (redflag.indexOf() == -1) {
  			return res.status(404).send({ status: 404, error: 'You have no post' });
  		}
  		return res.send({ status: 200, data: [{ redflag }] });
  }

  getSpecificRedflag(req, res) {
    const redflag = AllRedflag.find(c => c.id === parseInt(req.params.id, 10));
  		if (!redflag) return res.status(404).send({ staus: 404, error: 'The course with the given id cant be found' });
  		return res.send({ status: 200, data: [redflag] });
  }

  createRedflagRecord(req, res) {
    const user = users.find(c => c.id === parseInt(req.body.createdBy, 10));
    if (!user) return res.status(404).send({ status: 404, error: 'Only users can post' });
    const result = validate_redflag(req.body);
  		if (result.error) {
    	return res.status(400).send({ status: 400, error: result.error.details[0].message });
    }
    	const RedFlag = {
		    id: AllRedflag.length + 1,
		    title: req.body.title,
		    story: req.body.story,
		    createdOn: Date(),
		    createdBy: req.body.createdBy,
		    type: 'red-flag',
		    location: req.body.location,
		    status: 'draft',
		    images: ['Image', 'Image'],
		    video: ['Image', 'Image'],
		    comment: [],
		  };
		  AllRedflag.push(RedFlag);
		  return res.send({ status: 200, data: [{ id: AllRedflag.lenth, message: 'Created red_flag post' }] });
  }

  editComment(req, res) {
    const redflag = AllRedflag.find(c => c.id === parseInt(req.params.id, 10));
  		if (!redflag) return res.status(404).send({ staus: 404, error: 'The course with the given id cant be found' });
  		const result = validate_comment(req.body);
  		if (result.error) {
		    return res.status(400).send(result.error.details[0].message);
		  }

		  redflag.comment = req.body.comment;

		  return res.send({ status: 200, data: [{ id: redflag.id, message: 'Updated red-flags record\'s comment' }] });
  }

  editLocation(req, res) {
    const redflag = AllRedflag.find(c => c.id === parseInt(req.params.id, 10));
  		if (!redflag) return res.status(404).send({ staus: 404, error: 'The course with the given id cant be found' });
  		const result = validate_location(req.body);
  		if (result.error) {
		    return res.status(400).send(result.error.details[0].message);
		  }

		  redflag.location = req.body.location;

		  return res.send({ status: 200, data: [{ id: redflag.id, message: 'Updated red-flags record\'s location' }] });
  }

  deleteRecord(req, res) {
    const redflag = AllRedflag.find(c => c.id === parseInt(req.params.id, 10));
		  if (!redflag) return res.status(404).send({ staus: 404, data: 'The course with the given id cant be found' });
		  const index = AllRedflag.indexOf(redflag);
		  AllRedflag.splice(index, 1);

		  return res.send({ status: 200, data: [{ id: redflag.id, message: 'red_flag record hass been deleted' }] });
  }

  editCommentByUser(req, res) {
    const redflag = AllRedflag.find(c => c.id === parseInt(req.params.id, 10));
		  if (!redflag) return res.status(404).send({ status: 404, error: 'The course with the given id cant be found' });
		  const checkIfUser = AllRedflag.find(c => c.createdBy === parseInt(req.params.userId, 10));
		  if (!checkIfUser) return res.status(404).send({ status: 404, error: 'Users can only edit their posts' });
		  const result = validate_comment(req.body);
	  		if (result.error) {
			    return res.status(400).send(result.error.details[0].message);
			  }

			  redflag.comment = req.body.comment;

			  return res.send({ status: 200, data: [{ id: redflag.id, message: 'Updated red-flags record\'s comment' }] });
  }

  editLocationByUser(req, res) {
    const redflag = AllRedflag.find(c => c.id === parseInt(req.params.id, 10));
		  if (!redflag) return res.status(404).send({ status: 404, error: 'The course with the given id cant be found' });
		  const checkIfUser = AllRedflag.find(c => c.createdBy === parseInt(req.params.userId, 10));
		  if (!checkIfUser) return res.status(404).send({ status: 404, error: 'Users can only edit their posts' });
		  const result = validate_location(req.body);
  			if (result.error) {
			    return res.status(400).send(result.error.details[0].message);
			  }

			  redflag.location = req.body.location;

			  return res.send({ status: 200, data: [{ id: redflag.id, message: 'Updated red-flags record\'s location' }] });
  }

  deleteRecordByUser(req, res) {
    const redflag = AllRedflag.find(c => c.id === parseInt(req.params.id, 10));
		  const checkIfUser = AllRedflag.find(c => c.createdBy === parseInt(req.params.userId, 10));
		  if (!checkIfUser) return res.status(404).send({ status: 404, error: 'Users can only delete their posts' });
		  if (!redflag) return res.status(404).send({ staus: 404, data: 'The course with the given id cant be found' });
		  const index = AllRedflag.indexOf(redflag);
		  AllRedflag.splice(index, 1);

		  return res.send({ status: 200, data: [{ id: redflag.id, message: 'red_flag record hass been deleted' }] });
  }
}

module.exports = recordsController;
