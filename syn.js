var synaptic = require('synaptic'); // this line is not needed in the browser
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

function Perceptron(input, hidden, output)
{
    // create the layers
    var inputLayer = new Layer(input);
    var hiddenLayer = new Layer(hidden);
    var outputLayer = new Layer(output);
 
    // connect the layers
    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);
 
    // set the layers
    this.set({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer
    });
}
 
// extend the prototype chain
Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

var myPerceptron = new Architect.Perceptron(2,160,1); //input, hidden, output
var myTrainer = new Trainer(myPerceptron);
 
myTrainer.XOR(); // { error: 0.004998819355993572, iterations: 21871, time: 356 }

function LSTM(input, blocks, output)
{
    // create the layers
    var inputLayer = new Layer(input);
    var inputGate = new Layer(blocks);
    var forgetGate = new Layer(blocks);
    var memoryCell = new Layer(blocks);
    var outputGate = new Layer(blocks);
    var outputLayer = new Layer(output);
 
    // connections from input layer
    var input = inputLayer.project(memoryCell);
    inputLayer.project(inputGate);
    inputLayer.project(forgetGate);
    inputLayer.project(outputGate);
 
    // connections from memory cell
    var output = memoryCell.project(outputLayer);
 
    // self-connection
    var self = memoryCell.project(memoryCell);
 
    // peepholes
    memoryCell.project(inputGate);
    memoryCell.project(forgetGate);
    memoryCell.project(outputGate);
 
    // gates
    inputGate.gate(input, Layer.gateType.INPUT);
    forgetGate.gate(self, Layer.gateType.ONE_TO_ONE);
    outputGate.gate(output, Layer.gateType.OUTPUT);
 
    // input to output direct connection
    inputLayer.project(outputLayer);
 
    // set the layers of the neural network
    this.set({
        input: inputLayer,
        hidden: [inputGate, forgetGate, memoryCell, outputGate],
        output: outputLayer
    });
}
 
// extend the prototype chain
LSTM.prototype = new Network();
LSTM.prototype.constructor = LSTM;

function all() {
        var zero = "Where 1.0 is %100:",
        one = myPerceptron.activate([0,0]);
        two = myPerceptron.activate([1,0]);
        three = myPerceptron.activate([0,1]);
        four = myPerceptron.activate([1,1]);
        return [zero, one, two, three, four];
};
module.exports.all = all;

