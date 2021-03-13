
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function deserialize(data) {
  if (typeof data == 'string') {
    data = JSON.parse(data);
  }
  let nn = new NeuralNetwork(data.input_nodes, data.hidden_nodes, data.output_nodes);
  nn.weights_ih = Matrix.deserialize(data.weights_ih);
  nn.weights_ho = Matrix.deserialize(data.weights_ho);
  nn.bias_h = Matrix.deserialize(data.bias_h);
  nn.bias_o = Matrix.deserialize(data.bias_o);
  nn.learning_rate = data.learning_rate;
  return nn;
}
