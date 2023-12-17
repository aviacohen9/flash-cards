const express = require('express')
const mongoose = require('mongoose')
const Card = require('./cardModel')




//GET all cards
module.exports.getAllCards = async (req, res) => {
    console.log(req.user)
    const user_id = req.user._id
    try {
        const cards = await Card.find({ user_id }).sort({createdAt: -1})
        res.status(200).json(cards)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}



//GET a card
module.exports.getCard = async (req, res) => {
    const { card_id } = req.params

    if(!mongoose.Types.ObjectId.isValid(card_id))
            res.status(404).json({error: 'No Such Card.'})                  //res.status(404).json({error: error.message})
    try {
        const card = await Card.findById(card_id)
        console.log(card)
        if(!card){
            res.status(404).json({error: 'No Such Card.'})                //res.status(404).json({error: error.message})
        }
        res.status(200).json(card)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}



//POST a new card
module.exports.addCard = async (req, res) => {

    console.log(req.body)
    const {question, answer, explanation, allSubjects} = req.body
    const user_id = req.user._id
    try {
        const card = await Card.create( {question, answer, explanation, allSubjects, user_id})
        res.status(200).json(card)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}



//UPDATE a card
module.exports.editCard = async (req,res) =>{
    const { card_id } = req.params
  
    try {
        //checking if the id is valid
        if (!mongoose.Types.ObjectId.isValid(card_id)) {
            return res.status(400).json({error: 'No such card.'})
        }
        
        //update & extract the card that was just updated
        const card = await Card.findOneAndUpdate({_id: card_id}, {
            ...req.body
        })

        if(!card) {
           return res.status(400).json({error: 'No such card.'})                     //throw error('No such card.');
        }else res.status(200).json(card)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}



//DELETE a card
module.exports.deleteCard = async (req, res) => {
    
    const { card_id } = req.params
  
    try {
        //checking if the id is valid
        if (!mongoose.Types.ObjectId.isValid(card_id)) {
            return res.status(400).json({error: 'No such card.'})
        }
        
        //delete & extract the card that was just deleted
        const card = await Card.findOneAndDelete({_id: card_id})
        if(!card) {
           return res.status(400).json({error: 'No such card.'})                     //throw error('No such card.');
        }
        else res.status(200).json(card)                                                        //TODO: change to card id?
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}