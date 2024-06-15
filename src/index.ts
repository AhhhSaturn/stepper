import * as sheild from '../lib/sheild/sheild.py';

const stepper1 = new sheild.Stepper('STEPPER1');
const forwardArrow = new sheild.Arrow(2);

stepper1.forward(0.001, 50);
stepper1.backward(0.001, 50);
stepper1.forward(0.001, 50);
stepper1.backward(0.001, 50);
stepper1.forward(0.001, 50);
stepper1.backward(0.001, 50);
