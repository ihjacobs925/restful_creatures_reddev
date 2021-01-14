
const express = require('express');
const router = express.Router();
const fs = require('fs');

// Mounted at /prehistoric_creatures
let historics = fs.readFileSync('./prehistoric_creatures.json');
let histData = JSON.parse(historics);

// Index - /prehistoric_creatures
router.get('/', (req, res) => {
    res.render('historics/index', { historics: histData })
});
// New - prehistoric_creatures/new
router.get('/new', (req, res) => {
    res.render('historics/new');
});
// Get 1 - /prehistoric_creatures/1
router.get('/:id', (req, res) => {
    let index = req.params.id;
    res.render('historics/show', { historic: histData[index], historicID: index });
});

router.put('/:id', (req, res) => {
    console.log(`|------ PUT to /prehistoric_creatures/${req.params.id}`);

    // Get the dino from my data store (same logic as Show/Details)
    let historicsIndex = req.params.id;
    let historics = fs.readFileSync('./prehistoric_creatures.json');
    let histData = JSON.parse(historics); // is an array
    let thisHist = histData[historicsIndex];

    // Update my dino
    histData[historicsIndex] = req.body;

    // Write new dino to data store
    // Turn dino array into JSON
    let histJSON = JSON.stringify(histData);
    fs.writeFileSync('./prehistoric_creatures.json', histJSON);

    // Send my response (redirect to the Show/Details)
    res.redirect(`/prehistoric_creatures/${req.params.id}`);
});

//Delete route
router.delete('/:id', (req, res) => {
    console.log('delete pls');
    let historicsIndex = req.params.id;
    let historics = fs.readFileSync('./prehistoric_creatures.json');
    historicsJS = JSON.parse(historics);

    historicsJS.splice(historicsIndex, 1);

    fs.writeFileSync('./prehistoric_creatures.json', JSONstringify(historicsJS));

    res.redirect('/prehistoric_creatures');
});

// Post - prehistoric_creatures
router.post('/', (req, res) => {
    histData.push(req.body);
    let histJson = JSON.stringify(histData);
    fs.writeFileSync('./prehistoric_creatures.json', histJson);
    res.redirect('/prehistoric_creatures');
});

module.exports = router;